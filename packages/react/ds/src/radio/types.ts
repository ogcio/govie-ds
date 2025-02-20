import type { headingVariants } from '../heading/heading.js';
import type { TextInputProps } from '../text-input/text-input.js';

export const RadiosSizeEnum = {
  LARGE: 'lg',
  MEDIUM: 'md',
  SMALL: 'sm',
} as const;

export type RadiosSizeType =
  (typeof RadiosSizeEnum)[keyof typeof RadiosSizeEnum];

export type RadioProps = {
  value: string;
  name?: string;
  label?: string;
  hint?: string;
  id?: string;
  size?: RadiosSizeType;
  conditionalInput?: TextInputProps;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type RadiosGroupType = {
  groupId: string;
  items: {
    value: string;
    label?: string;
    hint?: string;
    conditionalInput?: TextInputProps;
  }[];
  defaultValue?: string;
  inline?: boolean;
  size?: RadiosSizeType;
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
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
};
