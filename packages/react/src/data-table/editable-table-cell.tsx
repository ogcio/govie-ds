'use client';
import { debounce } from 'lodash';
import {
  ChangeEvent,
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { InputCheckboxTableCell } from '../input-checkbox/input-checkbox.js';
import { InputTextTableCell } from '../input-text/input-text.js';
import { SelectTableCell } from '../select/select-native.js';
import { EditorTableCellProps } from './types.js';

export const EditableTableCell: FC<EditorTableCellProps<any>> = ({
  value: initialValue,
  rowIndex,
  columnId,
  setData,
  editor,
}): ReactElement => {
  const [value, setValue] = useState(initialValue);
  const [isChecked, setIsChecked] = useState(!!value);

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    setData((old) =>
      old.map((row, index: number) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      }),
    );
  };

  const debouncedUpdateData = useMemo(
    () =>
      debounce((value: unknown) => updateData(rowIndex, columnId, value), 500),
    [rowIndex, columnId],
  );

  useEffect(() => {
    return () => {
      debouncedUpdateData.cancel();
    };
  }, [debouncedUpdateData]);

  const handleOnChangeValue = (
    event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    setValue(newValue);
    debouncedUpdateData(newValue);
    editor?.props?.onChange?.(event as any);
  };

  const handleOnChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    debouncedUpdateData(!isChecked);
    editor?.props?.onChange?.(event as any);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  switch (editor.type) {
    case 'select': {
      return (
        <SelectTableCell
          {...editor.props}
          defaultValue={value}
          onChange={handleOnChangeValue}
          options={editor?.props?.options || []}
        />
      );
    }
    case 'checkbox': {
      return (
        <InputCheckboxTableCell
          checked={isChecked}
          {...editor?.props}
          onChange={handleOnChangeCheckbox}
        />
      );
    }
    default: {
      return (
        <InputTextTableCell
          {...editor.props}
          value={value}
          onChange={handleOnChangeValue}
        />
      );
    }
  }
};
