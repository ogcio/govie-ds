'use client';

import {
  ChangeEvent,
  Children,
  cloneElement,
  FC,
  isValidElement,
  PropsWithChildren,
  useState,
} from 'react';
import { InputRadioGroupProps } from './types.js';

export const InputRadioGroup: FC<PropsWithChildren<InputRadioGroupProps>> = ({
  groupId,
  inline,
  onChange,
  children,
}) => {
  const [value, setValue] = useState<null | string>();

  const onOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange?.(event);
  };

  const childrenWithOnChange = Children.map(children, (element) => {
    if (
      isValidElement<{
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        checked: boolean;
        value: string;
        name: string;
      }>(element)
    ) {
      return cloneElement<{
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        checked: boolean;
        value: string;
        name: string;
      }>(element, {
        onChange: onOptionChange,
        checked: value === element.props.value,
        name: groupId,
      });
    }
    return element;
  });
  return (
    <div className="gi-input-group-container">
      <div className="gi-input-group-options-container">
        <div
          role="radiogroup"
          className={
            inline
              ? 'gi-input-group-options-inline'
              : 'gi-input-group-options-stacked'
          }
        >
          {childrenWithOnChange}
        </div>
      </div>
    </div>
  );
};
