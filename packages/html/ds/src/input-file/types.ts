import type { ErrorTextProps } from '../error-text/types';
import type { HintTextProps } from '../hint-text/types';
import type { LabelProps } from '../label/types';

export type InputFileProps = {
  id?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  accept?: string;

  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
  className?: string;
  dataTestId?: string;
};
