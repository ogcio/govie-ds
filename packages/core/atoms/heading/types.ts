export const Size = {
  XL: 'xl',
  LG: 'lg',
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
  XXS: '2xs',
} as const;

export type Size = (typeof Size)[keyof typeof Size];
export type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Props = {
  id?: string;
  size?: Size;
  className?: string;
  children: any;
  dataTestId?: string;
};
