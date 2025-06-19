import React from 'react';
import { IconId } from '../icon/icon.js';

export const AUTOCOMPLETE_ACTIONS = {
  SET_IS_OPEN: 'SET_IS_OPEN',
  SET_INPUT_VALUE: 'SET_INPUT_VALUE',
  SET_OPTIONS: 'SET_OPTIONS',
  SET_VALUE: 'SET_VALUE',
  ON_CLEAR: 'ON_CLEAR',
  TOGGLE_CLEAR_BUTTON: 'TOGGLE_CLEAR_BUTTON',
  ON_SELECT_ITEM: 'ON_SELECT_ITEM',
} as const;

export type AutocompleteState = {
  isOpen: boolean;
  value: string;
  inputValue: string;
  isClearButtonEnabled: boolean;
  autocompleteOptions: React.ReactNode;
};

export type AutocompleteAction =
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_IS_OPEN; payload: boolean }
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_INPUT_VALUE; payload: string }
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_OPTIONS; payload: React.ReactNode }
  | { type: typeof AUTOCOMPLETE_ACTIONS.SET_VALUE; payload: string }
  | { type: typeof AUTOCOMPLETE_ACTIONS.ON_CLEAR }
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
    };

export type InputActionButtonProps = {
  icon: IconId;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  ariaLabel?: string;
  dataTestId?: string;
  ref?: React.Ref<HTMLButtonElement>;
};

export type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  inputClassName?: string;
  iconStart?: IconId;
  onIconStartClick?: () => void;
  iconStartClassName?: string;
  iconEnd?: IconId;
  iconEndClassName?: string;
  onIconEndClick?: () => void;
  inputActionButton?: InputActionButtonProps;
  iconEndRef?: any;
  inputActionPosition?: 'beforeSuffix' | 'afterSuffix';
  type?:
    | 'text'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'tel'
    | 'time'
    | 'url'
    | 'week'
    | 'search';
  halfFluid?: boolean;
  clearButtonEnabled?: boolean;
};
