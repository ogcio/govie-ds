import React from 'react';

export const ErrorSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type ErrorSizeType = (typeof ErrorSize)[keyof typeof ErrorSize];

// Extend `React.HTMLAttributes<HTMLParagraphElement>` so that
// the component can accept all the standard attributes and events that a `<p>` element can handle.
export type ErrorTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  text: string;
  size?: ErrorSizeType;
  className?: string;
  dataTestid?: string;
};

export const ErrorText: React.FC<ErrorTextProps> = ({
  text,
  className,
  size = ErrorSize.Medium,
  dataTestid,
  ...props
}) => {
  const sizeClass = (() => {
    switch (size) {
      case 'lg': {
        return 'gi-error-text-lg';
      }
      case 'sm': {
        return 'gi-error-text-sm';
      }
      default: {
        return 'gi-error-text-md';
      }
    }
  })();

  return (
    <div
      role="alert"
      className={`${sizeClass} gi-error-text ${className || ''}`}
      data-testid={dataTestid}
      {...props}
    >
      {text}
    </div>
  );
};
