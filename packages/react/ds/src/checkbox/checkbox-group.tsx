'use client';
import React, { useState } from 'react';
import { RadioSizeType } from '../radio/types.js';
import { CheckboxSizeEnumType } from './types.js';

export type CheckboxGroupType = {
  size?: CheckboxSizeEnumType;
  groupId: string;
  inline?: boolean;
  onChange?: (items: string[]) => void;
};

export const CheckboxGroup = ({
  size,
  groupId,
  inline,
  onChange,
  children,
}: React.PropsWithChildren<CheckboxGroupType>) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    let newValues = [];

    newValues = selectedValues.includes(value)
      ? selectedValues.filter((selectedValue) => selectedValue !== value)
      : [...selectedValues, value];

    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const childrenWithOnChange = React.Children.map(children, (element) => {
    if (
      React.isValidElement<{
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        checked: boolean;
        value: string;
        size?: CheckboxSizeEnumType | RadioSizeType;
        name: string;
      }>(element)
    ) {
      return React.cloneElement<{
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        checked: boolean;
        value: string;
        size?: CheckboxSizeEnumType | RadioSizeType;
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
          className={`${inline ? 'gi-input-group-options-inline' : 'gi-input-group-options-stacked'}`}
        >
          {childrenWithOnChange}
        </div>
      </div>
    </div>
  );
};
