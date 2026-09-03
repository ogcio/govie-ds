import type { ErrorTextProps } from '../error-text/types';
import type { HintTextProps } from '../hint-text/types';
import type { IconIdType } from '../icon/icon.schema';
import type { IconButtonProps } from '../icon-button/types';
import type { LabelProps } from '../label/types';

export type TextInputProps = {
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  className?: string;
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
  prefix?: string;
  suffix?: string;
  dataset?: any;
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
    | 'week';
  halfFluid?: boolean;
  dataTestId?: string;
  iconStart?: IconIdType;
  iconEnd?: IconIdType;
  inputActionButton?: IconButtonProps;
  inputClassName?: string;
};
