import { LabelSize } from './label.js';

export type LabelSizeType = (typeof LabelSize)[keyof typeof LabelSize];

export type LabelTextProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  text: string;
  size?: LabelSizeType;
};
