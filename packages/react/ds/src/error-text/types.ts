import { PropsWithChildren } from 'react';
import { ErrorSize } from './error-text.js';

export type ErrorSizeType = (typeof ErrorSize)[keyof typeof ErrorSize];

export type ErrorTextProps = PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    text?: string | React.ReactElement;
    size?: ErrorSizeType;
    dataTestid?: string;
  }
>;
