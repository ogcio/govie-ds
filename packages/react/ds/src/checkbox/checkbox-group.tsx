'use client';
import {
  ChangeEvent,
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useState,
} from 'react';
import { RadioSizeType } from '../radio/types.js';
import { CheckboxGroupProps, CheckboxSizeEnumType } from './types.js';

export const CheckboxGroup = ({
  size,
  groupId,
  inline,
  onChange,
  children,
}: PropsWithChildren<CheckboxGroupProps>) => {
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
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        checked: boolean;
        value: string;
        size?: CheckboxSizeEnumType | RadioSizeType;
        name: string;
      }>(element)
    ) {
      return cloneElement<{
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
