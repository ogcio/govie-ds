import React from 'react';

// Extend `React.InputHTMLAttributes<HTMLInputElement>` so that
// the component can accept all the standard attributes and events that an `<input>` element can handle.
export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
};

// Use React.forwardRef to support refs properly
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ ...props }, ref) => {
    return (
      <input
        className="gi-border-sm gi-border-solid gi-border-gray-950 gi-box-border gi-w-full gi-h-10 gi-mt-0 gi-p-1 focus:gi-outline focus:gi-border-lg focus:gi-outline-yellow-400 focus:gi-outline-offset-0"
        ref={ref}
        {...props}
      />
    );
  },
);

// Set the displayName for debugging purposes
TextInput.displayName = 'TextInput';
