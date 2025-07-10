import React from 'react';
import { IconId } from '../icon/icon.js';

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

export type InputTextTableCellProps = InputTextProps & {
  error?: boolean;
  disabled?: boolean;
};
