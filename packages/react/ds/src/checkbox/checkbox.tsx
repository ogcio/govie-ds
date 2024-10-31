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
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = ({
  dataElement,
  checkboxId,
  value,
  onChange = () => null,
  size = CheckboxSizeEnum.Medium,
  label,
  hint,
  checked,
}: CheckboxType) => {
  return (
    <div className="gi-flex gi-items-start">
      <input
        data-element={dataElement}
        id={checkboxId}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`${getSizeClass(size)} ${getTickSize(size)}
        gi-focus-state-outline
        gi-cursor-pointer
        gi-appearance-none
        gi-border-md
        gi-border-solid
         gi-border-black
         checked:before:gi-block
         checked:before:gi--rotate-45
         checked:before:gi-relative
         checked:before:gi-border-l-lg
         checked:before:gi-border-b-lg
         checked:before:gi-border-black`}
        type="checkbox"
      />
      <label
        htmlFor={checkboxId}
        className="gi-cursor-pointer xs:gi-text-sm md:gi-text-md lg:gi-text-lg gi-pl-4"
      >
        {label}
        {hint && <HintText text={hint} className="gi-mb-0" />}
      </label>
    </div>
  );
};

export default Checkbox;
