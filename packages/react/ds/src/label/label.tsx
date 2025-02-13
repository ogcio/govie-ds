import React from 'react';

export const LabelSize = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const;

export type LabelSizeType = (typeof LabelSize)[keyof typeof LabelSize];

// Extend `React.LabelHTMLAttributes<HTMLLabelElement>` for correct label attributes
export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  text: string;
  size?: LabelSizeType;
  ariaLabel?: string;
  dataTestid?: string;
};

// Use React.forwardRef to support refs properly
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      text,
      size = LabelSize.md,
      htmlFor,
      className,
      ariaLabel,
      dataTestid,
      ...props
    },
    ref,
  ) => {
    return (
      <label
        className={`gi-text-${size} gi-label ${className || ''}`}
        ref={ref}
        htmlFor={htmlFor}
        aria-label={ariaLabel || text}
        id={htmlFor ? `${htmlFor}-label` : undefined}
        data-testid={dataTestid}
        {...props}
      >
        {text}
      </label>
    );
  },
);

// Set the displayName for debugging purposes
Label.displayName = 'Label';
