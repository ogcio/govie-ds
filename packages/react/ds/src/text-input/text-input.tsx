import React from 'react';

// Extend `React.InputHTMLAttributes<HTMLInputElement>` so that
// the component can accept all the standard attributes and events that an `<input>` element can handle.
export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
  hasError?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

// Use React.forwardRef to support refs properly
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ hasError = false, prefix, suffix, ...props }, ref) => {
    return (
      <div className="gi-flex gi-items-center gi-border">
        {prefix && (
          <div className="gi-flex gi-text-center gi-whitespace-nowrap gi-cursor-default gi-flex-[0_0_auto] gi-px-2 gi-py-2 gi-border-l-sm gi-border-t-sm gi-border-b-sm gi-border-solid gi-border-gray-950 gi-min-w-10 gi-h-10 gi-leading-5">
            {prefix}
          </div>
        )}
        <input
          className={`${hasError ? 'gi-border-red-600' : 'gi-border-gray-950'} gi-flex-1 gi-border-sm gi-border-solid gi-box-border gi-w-full gi-h-10 gi-mt-0 gi-p-1 focus:gi-outline focus:gi-border-lg focus:gi-border-gray-950 focus:gi-outline-yellow-400 focus:gi-outline-offset-0`}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="gi-flex gi-text-center gi-whitespace-nowrap gi-cursor-default gi-flex-[0_0_auto] gi-px-2 gi-py-2 gi-border-r-sm gi-border-t-sm gi-border-b-sm gi-border-solid gi-border-gray-950 gi-min-w-10 gi-h-10 gi-leading-5">
            {suffix}
          </div>
        )}
      </div>
    );
  },
);

// Set the displayName for debugging purposes
TextInput.displayName = 'TextInput';
