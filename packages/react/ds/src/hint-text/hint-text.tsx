import React from 'react';
import { cn } from '../cn.js';

export const HintSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type HintSizeType = (typeof HintSize)[keyof typeof HintSize];

// Extend `React.InputHTMLAttributes<HTMLInputElement>` so that
// the component can accept all the standard attributes and events that an `<input>` element can handle.
export type HintTextProps = React.HTMLAttributes<HTMLElement> & {
  text: string;
  size?: HintSizeType;
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
    <div className={cn(sizeClass, 'gi-hint-text', className)} {...props}>
      {text}
    </div>
  );
};

// Set the displayName for debugging purposes
HintText.displayName = 'HintText';
