import React from 'react';
import { Text } from '../text/text.js';

export enum ErrorSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

// Extend `React.HTMLAttributes<HTMLParagraphElement>` so that
// the component can accept all the standard attributes and events that a `<p>` element can handle.
export type ErrorTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  size?: ErrorSize;
};

export const ErrorText: React.FC<ErrorTextProps> = ({
  size = ErrorSize.md,
  ...props
}) => {
  return (
    <Text
      as="p"
      size={size}
      className="gi-font-bold gi-leading-5 gi-text-red-600 gi-clear-both gi-block !gi-mb-[14px] !gi-mt-0"
      {...props}
    >
      {props.children}
    </Text>
  );
};
