import { InputHTMLAttributes } from 'react';

export const CheckboxSizeEnum = {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
} as const;

export type CheckboxSizeEnumType =
  (typeof CheckboxSizeEnum)[keyof typeof CheckboxSizeEnum];

export type CheckboxProps = {
  size?: CheckboxSizeEnumType;
  label?: string;
  hint?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export type CheckboxGroupProps = {
  size?: CheckboxSizeEnumType;
  groupId: string;
  inline?: boolean;
  onChange?: (items: string[]) => void;
};
