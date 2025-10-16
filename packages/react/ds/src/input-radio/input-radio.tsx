'use client';

import { useId, type ReactNode } from 'react';
import { cn } from '../cn.js';
import { HintText } from '../hint-text/hint-text.js';
import { InputText } from '../input-text/input-text.js';
import { Label } from '../label/label.js';
import { Input } from '../primitives/input.js';
import {
  InputRadioProps,
  InputRadioSizeEnum,
  type InputRadioSizeType,
} from './types.js';

const getRadioSize = (size?: InputRadioSizeType) => {
  if (size === InputRadioSizeEnum.Large) {
    return 'gi-input-radio-large';
  }
  if (size === InputRadioSizeEnum.Small) {
    return 'gi-input-radio-small';
  }
  return 'gi-input-radio-medium';
};

export const getRadioWidth = (size?: InputRadioSizeType) => {
  if (size === InputRadioSizeEnum.Large) {
    return 'gi-w-11';
  }
  if (size === InputRadioSizeEnum.Small) {
    return 'gi-w-6';
  }
  return 'gi-w-8';
};

export const InputRadio: React.FC<
  InputRadioProps & { children?: ReactNode }
> = ({
  label,
  children,
  hint,
  id,
  size = 'md',
  conditionalInput,
  checked,
  ...props
}) => {
  const radioId = id ?? useId();
  const labelContent = children ?? label;
  const hasRichContent = !!children;

  return (
    <div className="gi-input-radio-container">
      <Input
        type="radio"
        id={radioId}
        {...(checked === undefined
          ? { defaultChecked: props.defaultChecked }
          : { checked, onChange: props.onChange })}
        className={getRadioSize(size)}
        aria-describedby={hint ? `${radioId}-hint` : undefined}
        aria-required={conditionalInput ? 'true' : 'false'}
        aria-labelledby={labelContent ? `${radioId}-label` : undefined}
        {...props}
      />

      <div
        className={cn({
          'gi-mt-1': size === 'md',
          'gi-mt-2': size === 'lg',
        })}
      >
        {labelContent && (
          <Label
            id={`${radioId}-label`}
            htmlFor={hasRichContent ? undefined : radioId}
            size={size}
            className={cn({
              'gi-rich-label': hasRichContent,
            })}
          >
            {labelContent}
          </Label>
        )}

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
  );
};
