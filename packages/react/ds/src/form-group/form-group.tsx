import React from 'react';

export type FormGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  hasError?: boolean;
  children: React.ReactNode;
};

export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ hasError = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`gi-pt-2 gi-mb-4 ${hasError ? 'gi-px-4 gi-border-solid gi-border-l-xl gi-border-red-600' : ''}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

// Set the displayName for debugging purposes
FormGroup.displayName = 'FormGroup';
