import React from 'react';
import { ErrorText, ErrorTextProps } from '../error-text/error-text.js';
import { HintText, HintTextProps } from '../hint-text/hint-text.js';
import { Label, LabelProps } from '../label/label.js';

// Extend `React.InputHTMLAttributes<HTMLInputElement>` so that
// the component can accept all the standard attributes and events that an `<input>` element can handle.
export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  halfFluid?: boolean;
  fullFluid?: boolean;
  characterWidth?: number;
  error?: ErrorTextProps;
  hint?: HintTextProps;
  label?: LabelProps;
  className?: string;
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

// Use React.forwardRef to support refs properly
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      prefix,
      suffix,
      halfFluid,
      fullFluid = true,
      characterWidth,
      label,
      hint,
      error,
      id,
      type = 'text',
      className,
      placeholder,
      ...props
    },
    ref,
  ) => {
    // Determine width style dynamically for `characterWidth`
    const widthStyle = characterWidth ? { width: `${characterWidth}em` } : {};

    // Determine static width class (for cases like fullFluid and halfFluid)
    let widthClass = 'gi-w-auto'; // Default width

    if (fullFluid && !halfFluid && !characterWidth) {
      widthClass = 'gi-w-full';
    } else if (halfFluid) {
      widthClass = 'gi-w-1/2';
    }

    return (
      <div
        role="group"
        className={`gi-text-input-container ${error?.text ? 'gi-error-state' : ''} ${className && className}`}
        aria-labelledby={label?.text ? `${id}-label` : undefined}
      >
        {label?.text && (
          <Label
            text={label.text}
            size={label.size}
            htmlFor={id}
            id={`${id}-label`}
            className={!hint?.text && !error?.text ? 'gi-mb-2' : 'gi-mb-1'}
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
            aria-placeholder={placeholder || undefined}
            className={`${error?.text ? 'gi-border-red-600' : 'gi-border-gray-950'} ${widthClass} gi-text-input`}
            ref={ref}
            {...props}
          />
          {suffix && <div className="gi-text-input-suffix">{suffix}</div>}
        </div>
      </div>
    );
  },
);

// Set the displayName for debugging purposes
TextInput.displayName = 'TextInput';
