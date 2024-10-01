import React from 'react';
import { Paragraph } from '../paragraph/paragraph.js';

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
  return (
    <Paragraph
      as="span"
      size={size}
      className={`gi-font-normal gi-leading-5 gi-text-gray-700 gi-mb-[10px] ${className}`}
      {...props}
    >
      {text}
    </Paragraph>
  );
};

// Set the displayName for debugging purposes
HintText.displayName = 'HintText';
