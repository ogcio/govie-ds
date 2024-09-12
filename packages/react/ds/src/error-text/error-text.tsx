import React from 'react';

export enum ErrorSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

// Extend `React.HTMLAttributes<HTMLParagraphElement>` so that
// the component can accept all the standard attributes and events that a `<p>` element can handle.
export type ErrorTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  size?: ErrorSize;
};

// Use React.forwardRef to support refs properly
export const ErrorText = React.forwardRef<HTMLParagraphElement, ErrorTextProps>(
  ({ size = ErrorSize.md, ...props }, ref) => {
    return (
      <p
        className={`gi-text-${size} gi-font-bold gi-leading-5 gi-text-red-500 gi-mb-4 gi-mt-0 gi-clear-both gi-block`}
        ref={ref}
        {...props}
      >
        {props.children}
      </p>
    );
  },
);

// Set the displayName for debugging purposes
ErrorText.displayName = 'ErrorText';
