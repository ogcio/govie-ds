import { ReactElement } from 'react';
import { SelectMenuOptionProps } from '../select/types.js';

export const AUTOCOMPLETE_ACTIONS = {
  SET_IS_OPEN: 'SET_IS_OPEN',
  SET_INPUT_VALUE: 'SET_INPUT_VALUE',
  SET_OPTIONS: 'SET_OPTIONS',
  SET_VALUE: 'SET_VALUE',
  ON_RESET: 'ON_RESET',
  TOGGLE_CLEAR_BUTTON: 'TOGGLE_CLEAR_BUTTON',
  ON_SELECT_ITEM: 'ON_SELECT_ITEM',
  SET_HIGHLIGHTED_INDEX: 'SET_HIGHLIGHTED_INDEX',
} as const;

export type AutocompleteState = {
  isOpen: boolean;
  value: string;
  inputValue: string;
  isClearButtonEnabled: boolean;
  autocompleteOptions: React.ReactNode;
  highlightedIndex: number;
};

export type AutocompleteAction =
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_IS_OPEN; payload: boolean }
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_INPUT_VALUE; payload: string }
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_OPTIONS; payload: React.ReactNode }
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_VALUE; payload: string }
  | { type: typeof AUTOCOMPLETE_ACTIONS.ON_RESET }
  | {
      type: typeof AUTOCOMPLETE_ACTIONS.TOGGLE_CLEAR_BUTTON;
      payload?: boolean;
    }
  | {
      type: typeof AUTOCOMPLETE_ACTIONS.ON_SELECT_ITEM;
      payload: {
        inputValue: string;
        value: string;
      };
    }
  | {
      type: typeof AUTOCOMPLETE_ACTIONS.SET_HIGHLIGHTED_INDEX;
      payload: number;
    };

export type AutocompleteOptionItemElement = ReactElement<
  SelectMenuOptionProps & {
    selectedValue: string;
  }
>;

export type AutocompleteProps = {
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children:
    | ReactElement<AutocompleteItemProps>
    | ReactElement<AutocompleteItemProps>[];
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
