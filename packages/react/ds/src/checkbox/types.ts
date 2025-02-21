import { InputHTMLAttributes } from 'react';

export const CheckboxSizeEnum = {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
} as const;

export type CheckboxSizeEnumType =
  (typeof CheckboxSizeEnum)[keyof typeof CheckboxSizeEnum];

export type CheckboxType = {
  id: string;
  value: string;
  size?: CheckboxSizeEnumType;
  label?: string;
  hint?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  dataTestid?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
