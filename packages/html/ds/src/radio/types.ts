import { InputHTMLAttributes } from 'react';
import { ErrorTextProps } from '../error-text/types.js';
import { HintTextProps } from '../hint-text/types.js';
import { LabelProps } from '../label/types.js';
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
