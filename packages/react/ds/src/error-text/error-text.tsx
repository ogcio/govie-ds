import { tv } from 'tailwind-variants';
import { type ErrorTextProps } from './types.js';
export const ErrorSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

const errorText = tv({
  base: 'gi-error-text',
  variants: {
    size: {
      sm: 'gi-error-text-sm',
      md: 'gi-error-text-md',
      lg: 'gi-error-text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const ErrorText: React.FC<ErrorTextProps> = ({
  text,
  className,
  size = ErrorSize.Medium,
  dataTestid,
  ...props
}) => (
  <div
    role="alert"
    className={errorText({ size, className })}
    data-testid={dataTestid}
    {...props}
  >
    {text}
  </div>
);

ErrorText.displayName = 'ErrorText';
