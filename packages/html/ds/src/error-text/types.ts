export const ErrorSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type ErrorSizeType = (typeof ErrorSize)[keyof typeof ErrorSize];

export type ErrorTextProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: ErrorSizeType;
  dataTestid?: string;
};
