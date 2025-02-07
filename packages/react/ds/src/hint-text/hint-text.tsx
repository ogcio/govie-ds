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
  ariaLabel?: string;
  dataTestid?: string;
};

// Use React.forwardRef to support refs properly
export const HintText: React.FC<HintTextProps> = ({
  text,
  className,
  size,
  ariaLabel,
  dataTestid,
  ...props
}) => {
  const sizeClass = (() => {
    switch (size) {
      case 'lg': {
        return 'gi-hint-text-lg';
      }
      case 'sm': {
        return 'gi-hint-text-sm';
      }
      default: {
        return 'gi-hint-text-md';
      }
    }
  })();

  return (
    <div
      className={`${sizeClass} gi-hint-text ${className || ''}`}
      aria-label={ariaLabel || text}
      data-testid={dataTestid}
      {...props}
    >
      {text}
    </div>
  );
};

// Set the displayName for debugging purposes
HintText.displayName = 'HintText';
