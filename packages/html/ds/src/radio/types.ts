import { ErrorTextProps } from '../error-text/types.js';
import { HintTextProps } from '../hint-text/types.js';
import { TextInputProps } from '../input-text/types.js';
import { LabelProps } from '../label/types.js';

export const RadioSizeEnum = {
  Medium: 'md',
  Small: 'sm',
} as const;

export type RadioSizeType = (typeof RadioSizeEnum)[keyof typeof RadioSizeEnum];

export type RadioProps = {
  id?: string;
  size?: RadioSizeType;
  label?: string;
  hint?: string;
  dataElement?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  name?: string;
  conditionalInput?: TextInputProps;
  slot?: HTMLElement;
};

export type RadioGroupProps = {
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
  groupId: string;
  inline?: boolean;
  size?: RadioSizeType;
  items: RadioProps[];
};
