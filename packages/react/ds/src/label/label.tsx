import React from 'react';

export enum LabelSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

// Extend `React.LabelHTMLAttributes<HTMLLabelElement>` for correct label attributes
export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  size?: LabelSize;
};

// Use React.forwardRef to support refs properly
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ size = LabelSize.md, htmlFor, ...props }, ref) => {
    return (
      <label
        className={`gi-text-${size} gi-leading-5 gi-mb-1 gi-block`}
        ref={ref}
        htmlFor={htmlFor}
        {...props}
      >
        {props.children}
      </label>
    );
  },
);

// Set the displayName for debugging purposes
Label.displayName = 'Label';
