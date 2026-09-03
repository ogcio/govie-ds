import type { ErrorTextProps } from '../error-text/types';
import type { HintTextProps } from '../hint-text/types';
import type { LabelProps } from '../label/types';

export type TextAreaProps = {
  id: string;
  rows?: number;
  cols?: number;
  autoComplete?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  className?: string;
  maxChars?: number;
  halfFluid?: boolean;
  dataTestId?: string;
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
};
