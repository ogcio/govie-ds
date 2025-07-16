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
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
