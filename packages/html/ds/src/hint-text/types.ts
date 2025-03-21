export const HintSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type HintSizeType = (typeof HintSize)[keyof typeof HintSize];

export type HintTextProps = React.HTMLAttributes<HTMLElement> & {
  size?: HintSizeType;
};
