'use client';
import { useId } from 'react';
import { HintText } from '../hint-text/hint-text.js';
import { Input } from '../primitives/input.js';
import {
  InputCheckboxSizeEnum,
  type InputCheckboxSizeEnumType,
  type InputCheckboxProps,
} from './types.js';

const getSizeClass = (size: InputCheckboxSizeEnumType): string => {
  switch (size) {
    case InputCheckboxSizeEnum.Large: {
      return 'gi-input-checkbox-large';
    }
    case InputCheckboxSizeEnum.Small: {
      return 'gi-input-checkbox-small';
    }
    default: {
      return 'gi-input-checkbox-medium';
    }
  }
};

export const getCheckboxWidth = (size?: InputCheckboxSizeEnumType) => {
  let widthClass = 'gi-w-8';
  if (size === InputCheckboxSizeEnum.Large) {
    widthClass = 'gi-w-11';
  }
  if (size === InputCheckboxSizeEnum.Small) {
    widthClass = 'gi-w-6';
  }
  return widthClass;
};

export const InputCheckbox: React.FC<InputCheckboxProps> = ({
  id,
  size = InputCheckboxSizeEnum.Medium,
  label,
  hint,
  ...props
}: InputCheckboxProps) => {
  const CheckboxId = id || useId();
  return (
    <>
      <div className="gi-input-checkbox-container">
        <Input
          type="checkbox"
          id={CheckboxId}
          className={getSizeClass(size)}
          aria-labelledby={label ? `${CheckboxId}-label` : undefined}
          {...props}
        />
        <label id={`${CheckboxId}-label`} htmlFor={CheckboxId}>
          {label}
        </label>
      </div>
      {hint && (
        <div className="gi-input-checkbox-hint-container">
          <div>
            <div className={getCheckboxWidth(size)} />
          </div>
          <HintText id={`${CheckboxId}-hint`} text={hint} />
        </div>
      )}
    </>
  );
};

InputCheckbox.displayName = 'InputCheckbox';
