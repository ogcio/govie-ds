import { HintText } from '../../dist/index.js';
import { TextInput, TextInputProps } from '../text-input/text-input.js';
import { RadioProps, RadiosSizeEnum } from './types.js';

const getRadioSize = (size?: RadiosSizeEnum) => {
  let sizeClass = 'gi-radio-medium';
  if (size === RadiosSizeEnum.Large) {
    sizeClass = 'gi-radio-large';
  }
  if (size === RadiosSizeEnum.Small) {
    sizeClass = 'gi-radio-small';
  }
  return sizeClass;
};

export const getRadioWidth = (size?: RadiosSizeEnum) => {
  let widthClass = 'gi-w-[30px]';
  if (size === RadiosSizeEnum.Large) {
    widthClass = 'gi-w-11';
  }
  if (size === RadiosSizeEnum.Small) {
    widthClass = 'gi-w-6';
  }
  return widthClass;
};

const getMarginClass = (size?: RadiosSizeEnum) => {
  let marginClass = 'gi-w-11';
  if (size === RadiosSizeEnum.Large) {
    marginClass = 'gi-w-[58px]';
  }
  if (size === RadiosSizeEnum.Small) {
    marginClass = 'gi-w-[38px]';
  }
  return marginClass;
};

const addConditionalDivider = (
  checked: boolean,
  conditionalInput: TextInputProps | undefined,
) => {
  if (conditionalInput) {
    return checked ? 'gi-block' : 'gi-invisible';
  }
  return 'gi-invisible';
};

export const Radio = ({
  name,
  label,
  value,
  hint,
  radioId,
  size,
  conditionalInput,
  checked,
  onChange,
}: RadioProps) => {
  return (
    <div className="gi-flex gi-flex-col">
      <div className="gi-flex gi-items-center">
        <input
          onChange={onChange}
          checked={checked}
          name={name}
          id={radioId}
          value={value}
          className={`gi-radio-base ${getRadioSize(size)}`}
          type="radio"
        />
        <label
          htmlFor={radioId}
          className="gi-cursor-pointer xs:gi-text-sm md:gi-text-md lg:gi-text-lg gi-pl-3.5"
        >
          {label}
        </label>
      </div>
      {(hint || conditionalInput) && (
        <div className="gi-flex">
          <div
            className={`${addConditionalDivider(checked, conditionalInput)} ${getMarginClass(size)}`}
          >
            <div
              className={`gi-h-full gi-flex gi-justify-center gi-mt-1.5 ${getRadioWidth(size)}`}
            >
              <div className="gi-h-full gi-w-1 gi-bg-gray-300"></div>
            </div>
          </div>
          <div>
            {hint && <HintText text={hint} className="!gi-mb-0" />}
            {conditionalInput && (
              <div className={`${!checked && 'gi-hidden'}`}>
                <TextInput {...conditionalInput} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
