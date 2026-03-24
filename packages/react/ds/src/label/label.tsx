import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';
import { type LabelTextProps } from './types.js';

export const LabelSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const Label = forwardRef<HTMLLabelElement, LabelTextProps>(
  ({ text, size = LabelSize.Medium, className, children, ...props }, ref) => {
    const { base } = styles({ size });
    return (
      <label
        className={base({ className })}
        ref={ref}
        {...props}
        data-element="label"
      >
        {children ?? text}
      </label>
    );
  },
);

Label.displayName = 'Label';

export const styles = tv({
  slots: {
    base: 'gi-block gi-text-color-text-system-neutral-default',
  },
  variants: {
    size: {
      sm: { base: 'gi-text-sm' },
      md: { base: 'gi-text-md' },
      lg: { base: 'gi-text-lg' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
