import React from 'react';
import { cn } from '../cn.js';

export const LabelSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type LabelSizeType = (typeof LabelSize)[keyof typeof LabelSize];

// Extend `React.LabelHTMLAttributes<HTMLLabelElement>` for correct label attributes
export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  text: string;
  size?: LabelSizeType;
};

// Use React.forwardRef to support refs properly
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ text, size = LabelSize.Medium, className, ...props }, ref) => {
    return (
      <label
        className={cn(`gi-text-${size}`, 'gi-label', className)}
        ref={ref}
        {...props}
      >
        {text}
      </label>
    );
  },
);

// Set the displayName for debugging purposes
Label.displayName = 'Label';
