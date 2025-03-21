export const LabelSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type LabelSizeType = (typeof LabelSize)[keyof typeof LabelSize];

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  size?: LabelSizeType;
};
