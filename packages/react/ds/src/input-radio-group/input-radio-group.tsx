'use client';

import {
  ChangeEvent,
  Children,
  cloneElement,
  FC,
  isValidElement,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react';
import { InputRadioGroupProps } from './types.js';

export const InputRadioGroup: FC<PropsWithChildren<InputRadioGroupProps>> = ({
  groupId,
  inline,
  onChange,
  value: externalValue,
  children,
}) => {
  const [internalValue, setInternalValue] = useState<null | string>(
    externalValue || null,
  );

  // Sync internal state with external value (for React Hook Form reset)
  useEffect(() => {
    setInternalValue(externalValue || null);
  }, [externalValue]);

  const currentValue =
    externalValue === undefined ? internalValue : externalValue;

  const onOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    // We only update internal state if not controlled
    if (externalValue === undefined) {
      setInternalValue(event.target.value);
    }
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
        checked: currentValue === element.props.value,
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
