import { InputHTMLAttributes } from 'react';

export const InputCheckboxSizeEnum = {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
} as const;

export type InputCheckboxSizeEnumType =
  (typeof InputCheckboxSizeEnum)[keyof typeof InputCheckboxSizeEnum];

export type InputCheckboxProps = {
  size?: InputCheckboxSizeEnumType;
  label?: string;
  hint?: string;
  indeterminate?: boolean;
  containerProps?: any;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export type InputCheckboxTableCellProps = Partial<InputCheckboxProps> & {
  error?: boolean;
};
