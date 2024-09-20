import React from 'react';
import { Text } from '../text/text.js';

export enum HintSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

// Extend `React.InputHTMLAttributes<HTMLInputElement>` so that
// the component can accept all the standard attributes and events that an `<input>` element can handle.
export type HintTextProps = React.HTMLAttributes<HTMLInputElement> & {
  size?: HintSize;
};

// Use React.forwardRef to support refs properly
export const HintText: React.FC<HintTextProps> = ({ size, ...props }, ref) => {
  return (
    <Text
      size={size}
      className="gi-font-normal gi-leading-5 gi-text-gray-700 !gi-mb-[10px]"
      {...props}
    >
      {props.children}
    </Text>
  );
};

// Set the displayName for debugging purposes
HintText.displayName = 'HintText';
