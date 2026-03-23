export const Size = {
  XL: 'xl',
  LG: 'lg',
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
  XXS: '2xs',
} as const;

export type Props = {
  id?: string;
  size?: (typeof Size)[keyof typeof Size];
  className?: string;
  children: any;
  dataTestId?: string;
};
