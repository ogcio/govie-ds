'use client';

import type {
  ChangeEvent,
  FC,
  PropsWithChildren} from 'react';
import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  useEffect,
} from 'react';
import type { InputRadioGroupProps } from './types.js';

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
    <div className="gi-flex">
      <div className="gi-flex gi-flex-col gi-gap-2.5">
        <div
          role="radiogroup"
          className={
            inline
              ? 'gi-flex gi-flex-row gi-gap-4'
              : 'gi-flex gi-flex-col gi-gap-2.5'
          }
        >
          {childrenWithOnChange}
        </div>
      </div>
    </div>
  );
};
