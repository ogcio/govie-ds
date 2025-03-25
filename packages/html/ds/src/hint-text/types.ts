export const HintSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type HintSizeType = (typeof HintSize)[keyof typeof HintSize];

export type HintTextProps = {
  content?: string;
  size?: HintSizeType;
  className?: string;
};
