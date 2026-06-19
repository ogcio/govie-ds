import type { ChangeEvent, PropsWithChildren, ReactElement } from 'react';
import type { SelectMenuOptionProps } from '@/select/types.js';

export const AUTOCOMPLETE_ACTIONS = {
  SET_IS_OPEN: 'SET_IS_OPEN',
  SET_INPUT_VALUE: 'SET_INPUT_VALUE',
  SET_OPTIONS: 'SET_OPTIONS',
  SET_VALUE: 'SET_VALUE',
  ON_RESET: 'ON_RESET',
  TOGGLE_CLEAR_BUTTON: 'TOGGLE_CLEAR_BUTTON',
  ON_SELECT_ITEM: 'ON_SELECT_ITEM',
  SET_HIGHLIGHTED_INDEX: 'SET_HIGHLIGHTED_INDEX',
  SET_OPTION_TYPE: 'SET_OPTION_TYPE',
  TOGGLE_SELECTED_ITEM: 'TOGGLE_SELECTED_ITEM',
  CLEAR_ALL_SELECTIONS: 'CLEAR_ALL_SELECTIONS',
  SET_SELECTED_VALUES: 'SET_SELECTED_VALUES',
} as const;

export type AutocompleteState = {
  isOpen: boolean;
  value: string;
  inputValue: string;
  isClearButtonEnabled: boolean;
  autocompleteOptions: any[];
  highlightedIndex: number;
  optionType: string;
  selectedValues: Set<string>;
};

export type AutocompleteAction =
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_IS_OPEN; payload: boolean }
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_INPUT_VALUE; payload: string }
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_OPTIONS; payload: any[] }
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_VALUE; payload: string }
  | { type: typeof AUTOCOMPLETE_ACTIONS.ON_RESET }
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_OPTION_TYPE; payload: string }
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
    }
  | { type: typeof AUTOCOMPLETE_ACTIONS.TOGGLE_SELECTED_ITEM; payload: string }
  | { type: typeof AUTOCOMPLETE_ACTIONS.CLEAR_ALL_SELECTIONS }
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_SELECTED_VALUES; payload: string[] };

export type AutocompleteOptionItemElement = ReactElement<
  SelectMenuOptionProps & {
    selectedValue: string;
  }
>;

export type AutocompleteProps = PropsWithChildren<{
  /** Unique identifier for the autocomplete component. */
  id?: string;
  /** Initial selected value when the component is first rendered. */
  defaultValue?: string;
  /** When true, disables the autocomplete input and prevents user interaction. */
  disabled?: boolean;
  /** Callback function triggered when the input value changes */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Enables typing freeform values not limited to the dropdown options and keep the value inside the Input. */
  freeSolo?: boolean;
  /** Displays loading spinner inside the dropdown list. */
  isLoading?: boolean;
  /** Callback triggered when an option is selected from the dropdown. */
  onSelectItem?: (item: string) => void;
  /** Callback triggered when the dropdown is opened. */
  onOpen?: () => void;
  /** Callback triggered when the dropdown is closed. */
  onClose?: () => void;
  /** Controls whether the dropdown is open (controlled mode). */
  isOpen?: boolean;
  /** Enables multi-select mode, allowing multiple options to be selected. */
  multiple?: boolean;
  /** Callback providing the full array of selected values after each change in multi-select mode. */
  onSelectionChange?: (values: string[]) => void;
  /** Initial selected values for multi-select mode. */
  defaultSelectedValues?: string[];
  /** Controlled selected values for multi-select mode. */
  selectedValues?: string[];

  value?: any;
}> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'defaultChecked'>;

export type AutocompleteItemProps = {
  children: string;
  className?: string;
  value: string;
  disabled?: boolean;
};
