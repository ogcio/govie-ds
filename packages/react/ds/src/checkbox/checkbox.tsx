import { InputHTMLAttributes } from 'react';
import { HintText } from '../hint-text/hint-text.js';
import { getTickSize, getSizeClass } from './helpers.js';

export enum CheckboxSizeEnum {
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}

type CheckboxType = {
  id: string;
  value: string;
  size?: CheckboxSizeEnum;
  label?: string;
  hint?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

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
}: CheckboxType) => {
  const CheckboxId = id ?? value;
  return (
    <>
      <div className="gi-checkbox-container">
        <input
          name={name || label}
          onChange={onChange}
          id={CheckboxId}
          value={value}
          className={`${getSizeClass(size)} ${getTickSize(size)} gi-checkbox-input`}
          checked={checked}
          aria-label={ariaLabel || CheckboxId}
          disabled={disabled}
          type="checkbox"
        />
        <label htmlFor={CheckboxId} className="gi-checkbox-label">
          {label}
        </label>
      </div>
      {hint && (
        <div className="gi-checkbox-hint-container">
          <div className={getSizeClass(size)} />
          <HintText text={hint} />
        </div>
      )}
    </>
  );
};
