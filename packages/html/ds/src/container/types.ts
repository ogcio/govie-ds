export const ContainerInsetSizeEnum = {
  None: 'none',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
} as const;

export type ContainerInsetSizeType =
  (typeof ContainerInsetSizeEnum)[keyof typeof ContainerInsetSizeEnum];

export type ContainerProps = {
  id?: string;
  content?: string;
  insetTop?: ContainerInsetSizeType;
  insetBottom?: ContainerInsetSizeType;
  className?: string;
  fullWidth?: boolean;
};
