import type { ValueOf } from '../constants';

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
  size?: ValueOf<typeof Size>;
  className?: string;
  children: any;
  dataTestId?: string;
};
