import { HintText } from '../hint-text/hint-text.js';
import { getTickSize, getSizeClass } from './helpers.js';

export enum CheckboxSizeEnum {
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}

type CheckboxType = {
  checkboxId: string;
  value: string;
  size?: CheckboxSizeEnum;
  label?: string;
  hint?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
};

export const Checkbox = ({
  checkboxId,
  value,
  onChange = () => null,
  size = CheckboxSizeEnum.Medium,
  label,
  hint,
  checked,
  disabled,
  ariaLabel,
}: CheckboxType) => {
  return (
    <div className="gi-checkbox-container">
      <input
        name={label}
        onChange={onChange}
        id={checkboxId}
        value={value}
        className={`${getSizeClass(size)} ${getTickSize(size)} gi-checkbox-input`}
        checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        type="checkbox"
      />
      <label htmlFor={checkboxId} className="gi-checkbox-label">
        {label}
        {hint && <HintText text={hint} />}
      </label>
    </div>
  );
};
