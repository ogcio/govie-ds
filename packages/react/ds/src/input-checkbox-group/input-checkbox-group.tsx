'use client';
import { Children, cloneElement, isValidElement, useState } from 'react';
import { InputCheckboxSizeEnumType } from '../input-checkbox/types.js';
import { InputRadioSizeType } from '../input-radio/types.js';
import { InputCheckboxGroupProps } from './types.js';

export const InputCheckboxGroup: React.FC<
  React.PropsWithChildren<InputCheckboxGroupProps>
> = ({ size, groupId, inline, onChange, children }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    let newValues = [];

    newValues = selectedValues.includes(value)
      ? selectedValues.filter((selectedValue) => selectedValue !== value)
      : [...selectedValues, value];

    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const childrenWithOnChange = Children.map(children, (element) => {
    if (
      isValidElement<{
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        checked: boolean;
        value: string;
        size?: InputCheckboxSizeEnumType | InputRadioSizeType;
        name: string;
      }>(element)
    ) {
      return cloneElement<{
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        checked: boolean;
        value: string;
        size?: InputCheckboxSizeEnumType | InputRadioSizeType;
        name: string;
      }>(element, {
        onChange: () => handleCheckboxChange(element.props.value),
        checked: selectedValues.includes(element.props.value),
        size,
        name: groupId,
      });
    }
    return element;
  });
  return (
    <div className="gi-input-group-container">
      <div className="gi-input-group-options-container">
        <div
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
