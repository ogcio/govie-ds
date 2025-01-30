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
  ariaLabel?: string;
};

// Use React.forwardRef to support refs properly
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    { text, size = LabelSize.md, htmlFor, className, ariaLabel, ...props },
    ref,
  ) => {
    return (
      <label
        className={`gi-text-${size} gi-label ${className || ''}`}
        ref={ref}
        htmlFor={htmlFor}
        aria-label={ariaLabel || text}
        id={htmlFor ? `${htmlFor}-label` : undefined}
        {...props}
      >
        {text}
      </label>
    );
  },
);

// Set the displayName for debugging purposes
Label.displayName = 'Label';
