import { InputHTMLAttributes } from 'react';
import { InputTextProps } from '../input-text/type.js';

export const InputRadioSizeEnum = {
  Medium: 'md',
  Small: 'sm',
} as const;

export type InputRadioSizeType =
  (typeof InputRadioSizeEnum)[keyof typeof InputRadioSizeEnum];

export type InputRadioProps = {
  label?: string;
  hint?: string;
  size?: InputRadioSizeType;
  conditionalInput?: InputTextProps;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
