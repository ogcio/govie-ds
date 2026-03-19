export const Size = {
  XL: 'xl',
  LG: 'lg',
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
  XXS: '2xs',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export type Props = {
  id?: string;
  size?: Size;
  className?: string;
  children: any;
  dataTestId?: string;
};
