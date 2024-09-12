import React from 'react';

// Extend `React.InputHTMLAttributes<HTMLInputElement>` so that
// the component can accept all the standard attributes and events that an `<input>` element can handle.
export type HintTextProps = React.HTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
};

// Use React.forwardRef to support refs properly
export const HintText = React.forwardRef<HTMLInputElement, HintTextProps>(
  ({ ...props }, ref) => {
    return (
      <p
        className="gi-text-md gi-font-normal gi-leading-5 gi-text-gray-600 gi-mb-4"
        ref={ref}
        {...props}
      >
        {props.children}
      </p>
    );
  },
);

// Set the displayName for debugging purposes
HintText.displayName = 'HintText';
