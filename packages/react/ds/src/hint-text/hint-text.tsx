import { tv } from 'tailwind-variants';
import { type HintTextProps } from './types.js';
export const HintSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

const hintText = tv({
  base: 'gi-hint-text',
  variants: {
    size: {
      sm: 'gi-hint-text-sm',
      md: 'gi-hint-text-md',
      lg: 'gi-hint-text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const HintText: React.FC<HintTextProps> = ({
  text,
  children,
  className,
  size = HintSize.Medium,
  ...props
}) => (
  <div className={hintText({ size, className })} {...props}>
    {children ?? text}
  </div>
);

HintText.displayName = 'HintText';
