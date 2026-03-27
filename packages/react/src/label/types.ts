import { PropsWithChildren } from 'react';
import { LabelSize } from './label.js';

export type LabelSizeType = (typeof LabelSize)[keyof typeof LabelSize];

export type LabelTextProps = PropsWithChildren<
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    text?: string | React.ReactElement;
    size?: LabelSizeType;
  }
>;
