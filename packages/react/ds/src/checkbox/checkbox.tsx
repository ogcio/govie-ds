'use client';
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
  value,
  onChange = () => null,
  size = CheckboxSizeEnum.Medium,
  label,
  name,
  hint,
  checked,
  disabled,
  ariaLabel,
  dataTestid,
  ...props
}: CheckboxProps) => {
  const CheckboxId = id ?? value;
  return (
    <>
      <div className="gi-checkbox-container" data-testid={dataTestid}>
        <input
          name={name || label}
          onChange={onChange}
          id={CheckboxId}
          value={value}
          className={getSizeClass(size)}
          checked={checked}
          aria-label={ariaLabel || CheckboxId}
          aria-labelledby={label ? `${CheckboxId}-label` : undefined}
          aria-describedby={hint ? `${CheckboxId}-hint` : undefined}
          disabled={disabled}
          type="checkbox"
          {...props}
        />
        <label id={`${CheckboxId}-label`} htmlFor={CheckboxId}>
          {label}
        </label>
      </div>
      {hint && (
        <div className="gi-checkbox-hint-container">
          <div className={getCheckboxWidth(size)} />
          <HintText id={`${CheckboxId}-hint`} text={hint} />
        </div>
      )}
    </>
  );
};
