import { tv } from 'tailwind-variants';
import { type HintTextProps } from './types.js';

export const HintSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const HintText: React.FC<HintTextProps> = ({
  text,
  children,
  className,
  size = HintSize.Medium,
  ...props
}) => (
  <div
    className={hintText({ size, className })}
    {...props}
    data-element="hint-text"
  >
    {children ?? text}
  </div>
);

HintText.displayName = 'HintText';

const hintText = tv({
  base: 'gi-font-normal gi-text-color-text-system-neutral-muted gi-stroke-color-text-system-neutral-muted gi-mb-0',
  variants: {
    size: {
      sm: 'gi-text-sm',
      md: 'gi-text-md',
      lg: 'gi-text-lg',
    },
  },
});
