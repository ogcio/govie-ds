'use client';
import { useId } from 'react';
import { HintText } from '../hint-text/hint-text.js';
import { TextInput, type TextInputProps } from '../text-input/text-input.js';
import { type RadioProps, type RadioSizeType, RadioSizeEnum } from './types.js';

const getRadioSize = (size?: RadioSizeType) => {
  let sizeClass = 'gi-radio-medium';
  if (size === RadioSizeEnum.Large) {
    sizeClass = 'gi-radio-large';
  }
  if (size === RadioSizeEnum.Small) {
    sizeClass = 'gi-radio-small';
  }
  return sizeClass;
};

export const getRadioWidth = (size?: RadioSizeType) => {
  let widthClass = 'gi-w-8';
  if (size === RadioSizeEnum.Large) {
    widthClass = 'gi-w-11';
  }
  if (size === RadioSizeEnum.Small) {
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
  label,
  hint,
  id,
  size,
  conditionalInput,
  checked,
  ...props
}: RadioProps) => {
  const radioId = id ?? useId();
  return (
    <>
      <div className="gi-radio-container">
        <input
          type="radio"
          id={radioId}
          checked={checked}
          className={getRadioSize(size)}
          aria-describedby={hint ? `${radioId}-hint` : undefined}
          aria-required={conditionalInput ? 'true' : 'false'}
          {...props}
        />
        <label htmlFor={radioId}>{label}</label>
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
    </>
  );
};
