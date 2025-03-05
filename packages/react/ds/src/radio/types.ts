import type { TextInputProps } from '../text-input/text-input.js';

export const RadioSizeEnum = {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
} as const;

export type RadioSizeType = (typeof RadioSizeEnum)[keyof typeof RadioSizeEnum];

export type RadioProps = {
  value: string;
  name?: string;
  label?: string;
  hint?: string;
  id?: string;
  size?: RadioSizeType;
  conditionalInput?: TextInputProps;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type RadioGroupProps = {
  groupId: string;
  inline?: boolean;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
};
