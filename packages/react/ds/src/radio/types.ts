import { HeadingSize, HeadingAs } from '../heading/heading.js';
import { TextInputProps } from '../text-input/text-input.js';

export enum RadiosSizeEnum {
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}

export type RadioProps = {
  name: string;
  label?: string;
  value: string;
  hint?: string;
  radioId: string;
  size?: RadiosSizeEnum;
  conditionalInput?: TextInputProps;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type RadiosGroupType = {
  fieldId: string;
  items: {
    value: string;
    label?: string;
    hint?: string;
    conditionalInput?: TextInputProps;
  }[];
  inline?: boolean;
  size?: RadiosSizeEnum;
  errorMessage?: string;
  dividerOption?: {
    value: string;
    label?: string;
    hint?: string;
    conditionalInput?: TextInputProps;
  };
  title?: {
    value: string;
    asHeading?: {
      size: HeadingSize;
      as: HeadingAs;
    };
    hint?: string;
  };
};
