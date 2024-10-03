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
        className={`gi-pt-2 gi-mb-4 ${error?.text ? 'gi-px-4 gi-border-solid gi-border-l-lg gi-border-red-600' : ''}`}
      >
        {label?.text && (
          <Label text={label.text} size={label.size} htmlFor={id} />
        )}

        {hint?.text && <HintText text={hint.text} size={hint.size} />}

        {error?.text && <ErrorText text={error.text} size={error.size} />}

        <div className="gi-flex gi-items-center">
          {prefix && (
            <div className="xs:gi-text-md gi-text-sm gi-leading-5 xs:!gi-leading-5 gi-bg-gray-50 gi-inline-block gi-flex-[0_0_auto] gi-text-center gi-whitespace-nowrap gi-cursor-default gi-px-2 gi-py-2 gi-border-l-sm gi-border-t-sm gi-border-b-sm gi-border-solid gi-border-gray-950 gi-min-w-10 gi-h-10">
              {prefix}
            </div>
          )}
          <input
            id={id}
            type={type}
            style={widthStyle}
            className={`${error?.text ? 'gi-border-red-600' : 'gi-border-gray-950'} ${widthClass} gi-flex-initial gi-border-sm gi-border-solid gi-box-border gi-h-10 gi-mt-0 gi-p-1 focus:gi-outline focus:gi-outline-[3px] focus:gi-border-lg focus:gi-border-gray-950 focus:gi-outline-yellow-400 focus:gi-outline-offset-0 gi-z-1 xs:gi-text-md gi-text-sm gi-leading-10 xs:!gi-leading-5`}
            ref={ref}
            {...props}
          />
          {suffix && (
            <div className="xs:gi-text-md gi-text-sm gi-leading-5 xs:!gi-leading-5 gi-bg-gray-50 gi-inline-block gi-flex-[0_0_auto] gi-text-center gi-whitespace-nowrap gi-cursor-default gi-px-2 gi-py-2 gi-border-r-sm gi-border-t-sm gi-border-b-sm gi-border-solid gi-border-gray-950 gi-min-w-10 gi-h-10">
              {suffix}
            </div>
          )}
        </div>
      </div>
    );
  },
);

// Set the displayName for debugging purposes
TextInput.displayName = 'TextInput';
