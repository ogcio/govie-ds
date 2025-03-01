'use client';

import { HintText } from '../hint-text/hint-text.js';
import { TextInput, type TextInputProps } from '../text-input/text-input.js';
import {
  type RadioProps,
  type RadiosSizeType,
  RadiosSizeEnum,
} from './types.js';

const getRadioSize = (size?: RadiosSizeType) => {
  let sizeClass = 'gi-radio-medium';
  if (size === RadiosSizeEnum.Large) {
    sizeClass = 'gi-radio-large';
  }
  if (size === RadiosSizeEnum.Small) {
    sizeClass = 'gi-radio-small';
  }
  return sizeClass;
};

export const getRadioWidth = (size?: RadiosSizeType) => {
  let widthClass = 'gi-w-8';
  if (size === RadiosSizeEnum.Large) {
    widthClass = 'gi-w-11';
  }
  if (size === RadiosSizeEnum.Small) {
    widthClass = 'gi-w-6';
  }
  return widthClass;
};

const addConditionalDivider = (
  conditionalInput: TextInputProps | undefined,
  checked?: boolean,
) => {
  if (conditionalInput && checked) {
    return checked ? 'gi-block' : 'gi-invisible';
  }
  return 'gi-invisible';
};

export const Radio = ({
  name,
  label,
  value,
  hint,
  id,
  size,
  conditionalInput,
  checked,
  onChange,
}: RadioProps) => {
  const radioId = id ?? value;
  return (
    <div className="gi-radio-container">
      <div className="gi-radio-input-container">
        <input
          readOnly={checked}
          onChange={onChange}
          checked={checked}
          name={name}
          id={radioId}
          value={value}
          className={`gi-radio-base ${getRadioSize(size)}`}
          type="radio"
          aria-label={radioId}
          aria-checked={checked}
          aria-describedby={hint ? `${radioId}-hint` : undefined}
          aria-required={conditionalInput ? 'true' : 'false'}
        />
        <label htmlFor={radioId} className="gi-radio-label" aria-hidden="true">
          {label}
        </label>
      </div>
      {(hint || conditionalInput) && (
        <div className="gi-radio-conditional-divider-container">
          <div
            className={`${addConditionalDivider(conditionalInput, checked)} ${getRadioWidth(size)}`}
          >
            <div
              className={`gi-radio-conditional-divider-border-container ${getRadioWidth(size)}`}
            >
              <div className="gi-radio-conditional-divider-border" />
            </div>
          </div>
          <div>
            {hint && <HintText text={hint} />}
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
