import React from 'react';

// Define the types of text inputs supported
type BasicTextInputType =
  | 'text'
  | 'password'
  | 'email'
  | 'url'
  | 'tel'
  | 'search'
  | 'number';

const defaults = {
  inputType: 'text',
};

// Extend `React.InputHTMLAttributes<HTMLInputElement>` so that
// the component can accept all the standard attributes and events that an `<input>` element can handle.
export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: BasicTextInputType;
  ref?: React.Ref<HTMLInputElement>;
};

// Use React.forwardRef to support refs properly
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ type = defaults.inputType, ...props }, ref) => {
    return (
      <input
        className="
					gi-border-gray-950
					gi-w-full
					gi-h-10
					gi-mt-0
					gi-p-1
					focus:gi-outline-3
					focus:gi-outline-yellow-400
					focus:gi-outline-offset-0
					focus:gi-shadow-inner
				"
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);

// Set the displayName for debugging purposes
TextInput.displayName = 'TextInput';
