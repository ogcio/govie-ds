import { ErrorTextProps } from '../error-text/types';
import { HintTextProps } from '../hint-text/types';
import { LabelProps } from '../label/types';

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
  prefix?: string;
  suffix?: string;
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
};
