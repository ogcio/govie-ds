'use client';
import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  useEffect,
} from 'react';
import { InputCheckboxSizeEnumType } from '../input-checkbox/types.js';
import { InputRadioSizeType } from '../input-radio/types.js';
import { InputCheckboxGroupProps } from './types.js';

export const InputCheckboxGroup: React.FC<
  React.PropsWithChildren<InputCheckboxGroupProps>
> = ({ size, groupId, inline, onChange, children, values: externalValues }) => {
  const [internalValues, setInternalValues] = useState<string[]>(
    externalValues || [],
  );

  // Sync internal state with external value (for React Hook Form reset)
  useEffect(() => {
    setInternalValues(externalValues || []);
  }, [externalValues]);

  const currentValues =
    externalValues === undefined ? internalValues : externalValues;

  const handleCheckboxChange = (value: string) => {
    let newValues = [];

    newValues = currentValues.includes(value)
      ? currentValues.filter((selectedValue) => selectedValue !== value)
      : [...currentValues, value];

    // Only update internal state if not controlled
    if (externalValues === undefined) {
      setInternalValues(newValues);
    }

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
        checked: currentValues.includes(element.props.value),
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
