'use client';
import { useId } from 'react';
import { HintText } from '../hint-text/hint-text.js';
import {
  CheckboxSizeEnum,
  CheckboxSizeEnumType,
  type CheckboxProps,
} from './types.js';

const getSizeClass = (size: CheckboxSizeEnumType): string => {
  switch (size) {
    case CheckboxSizeEnum.Large: {
      return 'gi-checkbox-large';
    }
    case CheckboxSizeEnum.Small: {
      return 'gi-checkbox-small';
    }
    default: {
      return 'gi-checkbox-medium';
    }
  }
};

export const getCheckboxWidth = (size?: CheckboxSizeEnumType) => {
  let widthClass = 'gi-w-8';
  if (size === CheckboxSizeEnum.Large) {
    widthClass = 'gi-w-11';
  }
  if (size === CheckboxSizeEnum.Small) {
    widthClass = 'gi-w-6';
  }
  return widthClass;
};

export const Checkbox = ({
  id,
  size = CheckboxSizeEnum.Medium,
  label,
  hint,
  ...props
}: CheckboxProps) => {
  const CheckboxId = id || useId();
  return (
    <>
      <div className="gi-checkbox-container">
        <input
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
        <div className="gi-checkbox-hint-container">
          <div>
            <div className={getCheckboxWidth(size)} />
          </div>
          <HintText id={`${CheckboxId}-hint`} text={hint} />
        </div>
      )}
    </>
  );
};
