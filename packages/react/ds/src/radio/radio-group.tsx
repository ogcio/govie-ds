'use client';
import React, { useState } from 'react';
import type { RadioGroupProps } from '../input-radio/types.js';

export const RadioGroup: React.FC<React.PropsWithChildren<RadioGroupProps>> = ({
  groupId,
  inline,
  onChange,
  children,
}) => {
  const [value, setValue] = useState<null | string>();

  const onOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange?.(event);
  };

  const childrenWithOnChange = React.Children.map(children, (element) => {
    if (
      React.isValidElement<{
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        checked: boolean;
        value: string;
        name: string;
      }>(element)
    ) {
      return React.cloneElement<{
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
