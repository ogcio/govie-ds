import { InputHTMLAttributes } from 'react';
import { ErrorTextProps } from '../error-text/error-text.schema.js';
import { HintTextProps } from '../hint-text/hint-text.schema.js';
import { LabelProps } from '../label/label.schema.js';
import { TextInputProps } from '../text-input/types.js';

export const RadioSizeEnum = {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
} as const;

export type RadioSizeType = (typeof RadioSizeEnum)[keyof typeof RadioSizeEnum];

export type RadioProps = {
  label?: string;
  hint?: string;
  size?: RadioSizeType;
  conditionalInput?: TextInputProps;
  dataElement?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export type RadioGroupProps = {
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
  groupId: string;
  inline?: boolean;
  size?: RadioSizeType;
  items: RadioProps[];
};
