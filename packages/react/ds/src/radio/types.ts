import { InputHTMLAttributes } from 'react';
import type { TextInputProps } from '../text-input/text-input.js';

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
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export type RadioGroupProps = {
  groupId: string;
  inline?: boolean;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
};
