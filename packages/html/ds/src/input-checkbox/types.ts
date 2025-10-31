import { ErrorTextProps } from '../error-text/types';
import { HintTextProps } from '../hint-text/types';
import { LabelProps } from '../label/types';

export const CheckboxSizeEnum = {
  Medium: 'md',
  Small: 'sm',
} as const;

export type CheckboxSizeEnumType =
  (typeof CheckboxSizeEnum)[keyof typeof CheckboxSizeEnum];

export type CheckboxProps = {
  id?: string;
  size?: CheckboxSizeEnumType;
  label?: string;
  ariaLabel?: string;
  hint?: string;
  dataElement?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  name?: string;
  indeterminate?: boolean;
  className?: string;
  dataTableCell?: any;
};

export type CheckboxGroupProps = {
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
  size?: CheckboxSizeEnumType;
  groupId: string;
  inline?: boolean;
  items: CheckboxProps[];
};
