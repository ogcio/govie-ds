import { ErrorTextProps } from '../error-text/types';
import { HintTextProps } from '../hint-text/types';
import { LabelProps } from '../label/types';

export type FileUploadProps = {
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
