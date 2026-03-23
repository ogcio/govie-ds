import { tv } from 'tailwind-variants';
import { type ErrorTextProps } from './types.js';

export const ErrorSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const ErrorText: React.FC<ErrorTextProps> = ({
  text,
  className,
  size = ErrorSize.Medium,
  dataTestid,
  children,
  ...props
}) => (
  <div
    role="alert"
    className={errorText({ size, className })}
    data-testid={dataTestid}
    {...props}
    data-element="error-text"
  >
    {children ?? text}
  </div>
);

ErrorText.displayName = 'ErrorText';

const errorText = tv({
  base: 'gi-font-normal gi-text-color-text-intent-error-default',
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
