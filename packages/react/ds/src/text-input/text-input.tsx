import React from 'react';
import { cn } from '../cn.js';
import { ErrorText, ErrorTextProps } from '../error-text/error-text.js';
import { HintText, HintTextProps } from '../hint-text/hint-text.js';
import { Label, LabelProps } from '../label/label.js';

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  characterWidth?: number;
  error?: ErrorTextProps;
  hint?: HintTextProps;
  label?: LabelProps;
  inputCustomClassName?: string;
  placeholder?: string;
  type?:
    | 'text'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'tel'
    | 'time'
    | 'url'
    | 'week';
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      prefix,
      suffix,
      characterWidth,
      label,
      hint,
      error,
      id,
      type = 'text',
      placeholder,
      inputCustomClassName,
      ...props
    },
    ref,
  ) => {
    const widthStyle = characterWidth
      ? { width: `${characterWidth * 1.2}ch` }
      : {};

    return (
      <div
        role="group"
        className={cn('gi-text-input-container', {
          'gi-error-state': !!error?.text,
        })}
        aria-labelledby={`${id}-label`}
      >
        {label?.text && (
          <Label
            text={label.text}
            size={label.size}
            htmlFor={id}
            id={`${id}-label`}
            className={cn({
              'gi-mb-2': !hint?.text && !error?.text,
              'gi-mb-1': hint?.text || error?.text,
            })}
          />
        )}

        {hint?.text && (
          <HintText id={`${id}-hint`} text={hint.text} size={hint.size} />
        )}

        {error?.text && (
          <ErrorText id={`${id}-error`} text={error.text} size={error.size} />
        )}

        <div className="gi-text-input-container-inner">
          {prefix && <div className="gi-text-input-prefix">{prefix}</div>}
          <input
            placeholder={placeholder}
            id={id}
            type={type}
            style={widthStyle}
            data-testid="textbox"
            aria-invalid={!!error?.text}
            aria-placeholder={placeholder}
            className={cn('gi-text-input', inputCustomClassName, {
              'gi-w-full': !inputCustomClassName,
              'gi-border-red-600': !!error?.text,
              'gi-border-gray-950': !error?.text,
            })}
            ref={ref}
            {...props}
          />
          {suffix && <div className="gi-text-input-suffix">{suffix}</div>}
        </div>
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
