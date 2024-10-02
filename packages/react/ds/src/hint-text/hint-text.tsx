import React from 'react';

export enum HintSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

// Extend `React.InputHTMLAttributes<HTMLInputElement>` so that
// the component can accept all the standard attributes and events that an `<input>` element can handle.
export type HintTextProps = React.HTMLAttributes<HTMLInputElement> & {
  text: string;
  size?: HintSize;
  className?: string;
};

// Use React.forwardRef to support refs properly
export const HintText: React.FC<HintTextProps> = ({
  text,
  className,
  size,
  ...props
}) => {
  const sizeClass = (() => {
    switch (size) {
      case 'lg': {
        return 'gi-text-lg  gi-mb-2.5';
      }
      case 'sm': {
        return 'gi-text-sm  gi-mb-1.5';
      }
      default: {
        return 'gi-text-md  gi-mb-2';
      }
    }
  })();

  return (
    <div
      className={`${sizeClass} gi-font-normal gi-text-gray-700 ${className}`}
      {...props}
    >
      {text}
    </div>
  );
};

// Set the displayName for debugging purposes
HintText.displayName = 'HintText';
