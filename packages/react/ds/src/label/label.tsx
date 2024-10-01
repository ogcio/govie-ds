import React from 'react';

export enum LabelSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

// Extend `React.LabelHTMLAttributes<HTMLLabelElement>` for correct label attributes
export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  text: string;
  size?: LabelSize;
};

// Use React.forwardRef to support refs properly
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ text, size = LabelSize.md, htmlFor, ...props }, ref) => {
    return (
      <label
        className={`gi-text-${size} gi-leading-5 gi-mb-1 gi-block`}
        ref={ref}
        htmlFor={htmlFor}
        {...props}
      >
        {text}
      </label>
    );
  },
);

// Set the displayName for debugging purposes
Label.displayName = 'Label';
