import { ReactElement } from 'react';
import { SelectMenuOptionProps } from '../select/types.js';

export type AutocompleteOptionItemElement = ReactElement<
  SelectMenuOptionProps & {
    selectedValue: string;
  }
>;

export type AutocompleteProps = {
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactElement<AutocompleteItemProps>[];
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'defaultChecked'
>;

export type AutocompleteItemProps = {
  children: string;
  className?: string;
  value: string;
  disabled?: boolean;
};
