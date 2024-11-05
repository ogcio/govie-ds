import type { headingVariants } from '../heading/heading.js';
import type { TextInputProps } from '../text-input/text-input.js';

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
      size: keyof typeof headingVariants.variants.size;
      as: keyof typeof headingVariants.variants.as;
    };
    hint?: string;
  };
};
