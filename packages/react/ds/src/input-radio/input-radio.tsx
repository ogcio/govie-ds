'use client';

import { useId } from 'react';
import { HintText } from '../hint-text/hint-text.js';
import { InputText } from '../input-text/input-text.js';
import type { InputTextProps } from '../input-text/type.js';

import {
  InputRadioProps,
  InputRadioSizeEnum,
  type InputRadioSizeType,
} from './types.js';

const getRadioSize = (size?: InputRadioSizeType) => {
  let sizeClass = 'gi-radio-medium';
  if (size === InputRadioSizeEnum.Large) {
    sizeClass = 'gi-radio-large';
  }
  if (size === InputRadioSizeEnum.Small) {
    sizeClass = 'gi-radio-small';
  }
  return sizeClass;
};

export const getRadioWidth = (size?: InputRadioSizeType) => {
  let widthClass = 'gi-w-8';
  if (size === InputRadioSizeEnum.Large) {
    widthClass = 'gi-w-11';
  }
  if (size === InputRadioSizeEnum.Small) {
    widthClass = 'gi-w-6';
  }
  return widthClass;
};

const addConditionalDivider = (
  conditionalInput: InputTextProps | undefined,
  checked?: boolean,
) => {
  if (conditionalInput && checked) {
    return checked ? 'gi-block' : 'gi-invisible';
  }
  return 'gi-invisible';
};

export const InputRadio: React.FC<InputRadioProps> = ({
  label,
  hint,
  id,
  size,
  conditionalInput,
  checked,
  ...props
}) => {
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
                <InputText {...conditionalInput} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
