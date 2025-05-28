import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';
import { type LabelTextProps } from './types.js';

export const LabelSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

const label = tv({
  base: 'gi-label',
  variants: {
    size: {
      sm: 'gi-text-sm',
      md: 'gi-text-md',
      lg: 'gi-text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const Label = forwardRef<HTMLLabelElement, LabelTextProps>(
  ({ text, size = LabelSize.Medium, className, ...props }, ref) => {
    return (
      <label className={label({ size, className })} ref={ref} {...props}>
        {text}
      </label>
    );
  },
);

Label.displayName = 'Label';
