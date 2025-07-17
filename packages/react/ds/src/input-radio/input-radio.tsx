'use client';

import { useId } from 'react';
import { cn } from '../cn.js';
import { HintText } from '../hint-text/hint-text.js';
import { InputText } from '../input-text/input-text.js';
import type { InputTextProps } from '../input-text/type.js';
import { Label } from '../label/label.js';
import { Input } from '../primitives/input.js';
import {
  InputRadioProps,
  InputRadioSizeEnum,
  type InputRadioSizeType,
} from './types.js';

const getRadioSize = (size?: InputRadioSizeType) => {
  let sizeClass = 'gi-input-radio-medium';
  if (size === InputRadioSizeEnum.Large) {
    sizeClass = 'gi-input-radio-large';
  }
  if (size === InputRadioSizeEnum.Small) {
    sizeClass = 'gi-input-radio-small';
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

export const InputRadio: React.FC<InputRadioProps> = ({
  label,
  hint,
  id,
  size = 'md',
  conditionalInput,
  checked,
  ...props
}) => {
  const radioId = id ?? useId();
  return (
    <>
      <div className="gi-input-radio-container">
        <Input
          type="radio"
          id={radioId}
          checked={checked}
          className={getRadioSize(size)}
          aria-describedby={hint ? `${radioId}-hint` : undefined}
          aria-required={conditionalInput ? 'true' : 'false'}
          {...props}
        />
        <div
          className={cn({
            'gi-mt-1': size === 'md',
            'gi-mt-2': size === 'lg',
          })}
        >
          <Label htmlFor={radioId} text={label || ''} size={size}></Label>
          {(hint || conditionalInput) && (
            <div className="gi-radio-conditional-divider-container">
              <div>
                {hint && <HintText text={hint} size={size} />}
                {conditionalInput && (
                  <div
                    className={cn('gi-mt-3', {
                      'gi-hidden': !checked,
                    })}
                  >
                    <InputText {...conditionalInput} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
