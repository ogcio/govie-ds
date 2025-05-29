import { ErrorSize } from './error-text.js';

export type ErrorSizeType = (typeof ErrorSize)[keyof typeof ErrorSize];

export type ErrorTextProps = React.HTMLAttributes<HTMLDivElement> & {
  text: string;
  size?: ErrorSizeType;
  dataTestid?: string;
};
