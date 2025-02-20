import { HintText } from '../hint-text/hint-text.js';
import { getTickSize, getSizeClass } from './helpers.js';
import { CheckboxSizeEnum, type CheckboxType } from './types.js';

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
}: CheckboxType) => {
  const CheckboxId = id ?? value;
  return (
    <>
      <div className="gi-checkbox-container" data-testid={dataTestid}>
        <input
          name={name || label}
          onChange={onChange}
          id={CheckboxId}
          value={value}
          className={`${getSizeClass(size)} ${getTickSize(size)} gi-checkbox-input`}
          checked={checked}
          aria-label={ariaLabel || CheckboxId}
          aria-labelledby={label ? `${CheckboxId}-label` : undefined}
          aria-describedby={hint ? `${CheckboxId}-hint` : undefined}
          disabled={disabled}
          type="checkbox"
          {...props}
        />
        <label
          id={`${CheckboxId}-label`}
          htmlFor={CheckboxId}
          className="gi-checkbox-label"
        >
          {label}
        </label>
      </div>
      {hint && (
        <div className="gi-checkbox-hint-container">
          <div className={getSizeClass(size)} />
          <HintText id={`${CheckboxId}-hint`} text={hint} />
        </div>
      )}
    </>
  );
};
