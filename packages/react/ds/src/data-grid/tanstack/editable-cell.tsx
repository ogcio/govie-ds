'use client';
import { debounce } from 'lodash';
import { ChangeEvent, ReactElement, useEffect, useMemo, useState } from 'react';
import { InputCheckboxTableCell } from '../../input-checkbox/input-checkbox.js';
import { InputCheckboxTableCellProps } from '../../input-checkbox/types.js';
import { InputText } from '../../input-text/input-text.js';
import { InputTextTableCellProps } from '../../input-text/type.js';
import { SelectNativeTableCell } from '../../select/select-native.js';
import { SelectNativeTableCellProps } from '../../select/types.js';

type EditorConfig =
  | {
      type: 'text';
      props: InputTextTableCellProps;
    }
  | {
      type: 'select';
      props: SelectNativeTableCellProps;
    }
  | {
      type: 'checkbox';
      props: InputCheckboxTableCellProps;
    };

type EditorCellProps = {
  value: any;
  rowIndex: number;
  columnId: string;
  setData: any;
  editor: EditorConfig;
};

export const EditableCell = ({
  value: initialValue,
  rowIndex,
  columnId,
  setData,
  editor,
}: EditorCellProps): ReactElement => {
  const [value, setValue] = useState(initialValue);
  const [isChecked, setIsChecked] = useState(!!value);

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    setData((old: any) =>
      old.map((row: any, index: any) => {
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

  const handleOnChangeCheckbox = (event: any) => {
    setIsChecked(!isChecked);
    debouncedUpdateData(!isChecked);
    editor?.props?.onChange?.(event);
  };

  const onInputBlur = (event: any) => {
    if (editor.type === 'text') {
      editor?.props?.onBlur?.(event);
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  switch (editor.type) {
    case 'select': {
      return (
        <SelectNativeTableCell
          {...editor.props}
          defaultValue={value}
          onChange={handleOnChangeValue}
          data-table-cell="true"
          options={editor.props.options}
          error={editor.props.error}
        />
      );
    }
    case 'checkbox': {
      return (
        <div className="gi-w-full gi-flex gi-justify-center">
          <InputCheckboxTableCell
            checked={isChecked}
            {...editor?.props}
            onChange={handleOnChangeCheckbox}
          />
        </div>
      );
    }
    default: {
      return (
        <InputText
          {...editor.props}
          value={value}
          onBlur={onInputBlur}
          onChange={handleOnChangeValue}
          data-table-cell="true"
          data-table-cell-error-state={editor?.props?.error?.toString()}
        />
      );
    }
  }
};
