import React from 'react';
import { cn } from '../cn.js';
import { ErrorText, ErrorTextProps } from '../error-text/error-text.js';
import { HintText, HintTextProps } from '../hint-text/hint-text.js';
import { Label, LabelProps } from '../label/label.js';

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: ErrorTextProps;
  hint?: HintTextProps;
  label?: LabelProps;
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
  dataTestid?: string;
  halfFluid?: boolean;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      prefix,
      suffix,
      label,
      hint,
      error,
      id,
      type = 'text',
      halfFluid = false,
      placeholder,
      dataTestid,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        role="group"
        className={cn(className, 'gi-text-input-container', {
          'gi-error-state': !!error?.text,
        })}
        aria-labelledby={`${id}-label`}
        data-testid={dataTestid}
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

        <div className={cn(className, 'gi-text-input-container-inner')}>
          {prefix && <div className="gi-text-input-prefix">{prefix}</div>}
          <input
            placeholder={placeholder}
            id={id}
            type={type}
            data-testid="textbox"
            aria-invalid={!!error?.text}
            aria-placeholder={placeholder}
            className={cn('gi-text-input', {
              'gi-border-red-600': !!error?.text,
              'gi-border-gray-950': !error?.text,
              'gi-input-half-width': halfFluid,
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
