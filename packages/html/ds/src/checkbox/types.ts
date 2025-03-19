import { InputHTMLAttributes } from 'react';
import { ErrorTextProps } from '../error-text/error-text.schema';
import { HintTextProps } from '../hint-text/hint-text.schema';
import { LabelProps } from '../label/label.schema';

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
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
  size?: CheckboxSizeEnumType;
  groupId: string;
  inline?: boolean;
  items: CheckboxProps[];
};
