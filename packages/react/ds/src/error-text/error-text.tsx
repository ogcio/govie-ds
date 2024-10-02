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
        return 'gi-text-lg  gi-mb-3.5';
      }
      case 'sm': {
        return 'gi-text-sm  gi-mb-2.5';
      }
      default: {
        return 'gi-text-md  gi-mb-3';
      }
    }
  })();

  return (
    <div
      className={`${sizeClass} gi-font-bold gi-text-red-600 ${className}`}
      {...props}
    >
      {text}
    </div>
  );
};
