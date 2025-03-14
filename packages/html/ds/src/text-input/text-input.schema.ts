import { ErrorTextProps } from '../error-text/error-text.schema';
import { HintTextProps } from '../hint-text/hint-text.schema';
import { LabelProps } from '../label/label.schema';

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
