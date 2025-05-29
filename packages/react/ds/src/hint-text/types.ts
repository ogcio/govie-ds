import { HintSize } from './hint-text.js';

export type HintSizeType = (typeof HintSize)[keyof typeof HintSize];

export type HintTextProps = React.HTMLAttributes<HTMLElement> & {
  text: string;
  size?: HintSizeType;
};
