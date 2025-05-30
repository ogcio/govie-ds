export const LabelSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type LabelSizeType = (typeof LabelSize)[keyof typeof LabelSize];

export type LabelProps = {
  content?: string;
  htmlFor?: string;
  className?: string;
  size?: LabelSizeType;
};
