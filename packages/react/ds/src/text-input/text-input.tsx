import React from 'react';

// Extend `React.InputHTMLAttributes<HTMLInputElement>` so that
// the component can accept all the standard attributes and events that an `<input>` element can handle.
export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
  hasError?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  halfFluid?: boolean;
  fullFluid?: boolean;
  characterWidth?: number;
};

// Use React.forwardRef to support refs properly
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      hasError,
      prefix,
      suffix,
      halfFluid,
      fullFluid = true,
      characterWidth,
      ...props
    },
    ref,
  ) => {
    // Determine dynamic width class
    let widthClass = 'gi-w-auto'; // Default width

    if (fullFluid && !halfFluid && !characterWidth) {
      widthClass = 'gi-w-full';
    } else if (halfFluid) {
      widthClass = 'gi-w-1/2';
    } else if (characterWidth) {
      widthClass = `gi-w-[${characterWidth}em]`;
    }

    return (
      <div className="gi-flex gi-items-center">
        {prefix && (
          <div className="gi-inline-block gi-flex-[0_0_auto] gi-text-center gi-whitespace-nowrap gi-cursor-default gi-px-2 gi-py-2 gi-border-l-sm gi-border-t-sm gi-border-b-sm gi-border-solid gi-border-gray-950 gi-min-w-10 gi-h-10 gi-leading-5">
            {prefix}
          </div>
        )}
        <input
          className={`${hasError ? 'gi-border-red-600' : 'gi-border-gray-950'} ${widthClass} gi-flex-initial gi-border-sm gi-border-solid gi-box-border gi-h-10 gi-mt-0 gi-p-1 focus:gi-outline focus:gi-outline-[3px] focus:gi-border-lg focus:gi-border-gray-950 focus:gi-outline-yellow-400 focus:gi-outline-offset-0`}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="gi-inline-block gi-flex-[0_0_auto] gi-text-center gi-whitespace-nowrap gi-cursor-default gi-px-2 gi-py-2 gi-border-r-sm gi-border-t-sm gi-border-b-sm gi-border-solid gi-border-gray-950 gi-min-w-10 gi-h-10 gi-leading-5">
            {suffix}
          </div>
        )}
      </div>
    );
  },
);

// Set the displayName for debugging purposes
TextInput.displayName = 'TextInput';
