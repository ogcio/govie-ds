import { PropsWithChildren } from 'react';
import { HintSize } from './hint-text.js';

export type HintSizeType = (typeof HintSize)[keyof typeof HintSize];

export type HintTextProps = PropsWithChildren<
  React.HTMLAttributes<HTMLElement> & {
    text?: string | React.ReactElement;
    size?: HintSizeType;
  }
>;
