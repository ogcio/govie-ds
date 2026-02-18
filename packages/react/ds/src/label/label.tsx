import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';
import { type LabelTextProps } from './types.js';

export const LabelSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const styles = tv({
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
  ({ text, size = LabelSize.Medium, className, children, ...props }, ref) => {
    return (
      <label className={styles({ size, className })} ref={ref} {...props}>
        {children ?? text}
      </label>
    );
  },
);

Label.displayName = 'Label';
