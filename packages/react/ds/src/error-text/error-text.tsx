import React from 'react';

export enum ErrorSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

// Extend `React.HTMLAttributes<HTMLParagraphElement>` so that
// the component can accept all the standard attributes and events that a `<p>` element can handle.
export type ErrorTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  text: string;
  size?: ErrorSize;
  className?: string;
};

export const ErrorText: React.FC<ErrorTextProps> = ({
  text,
  className,
  size = ErrorSize.md,
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
    <div className={`${sizeClass} gi-error-text ${className || ''}`} {...props}>
      {text}
    </div>
  );
};
