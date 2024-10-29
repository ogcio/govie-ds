import { HintText } from '../hint-text/hint-text.js';
import { getTickSize, getSizeClass } from './helpers.js';

export enum CheckboxSizeEnum {
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}

type CheckboxType = {
  dataElement: string;
  checkboxId: string;
  value: string;
  size?: CheckboxSizeEnum;
  label?: string;
  hint?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

const Checkbox = ({
  dataElement,
  checkboxId,
  value,
  size = CheckboxSizeEnum.Medium,
  label,
  hint,
  onChange,
  className,
}: CheckboxType) => {
  return (
    <div className={`gi-checkbox-container ${className && className}`}>
      <input
        name={label}
        onChange={onChange}
        data-element={dataElement}
        id={checkboxId}
        value={value}
        className={`${getSizeClass(size)} ${getTickSize(size)} gi-checkbox-input`}
        type="checkbox"
      />
      <label htmlFor={checkboxId} className="gi-checkbox-label">
        {label}
        {hint && <HintText text={hint} className="gi-mb-0" />}
      </label>
    </div>
  );
};

export default Checkbox;
