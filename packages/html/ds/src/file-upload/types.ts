import { ErrorTextProps } from '../error-text/types';
import { HintTextProps } from '../hint-text/types';
import { LabelProps } from '../label/types';

export type FileUploadProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
  dataTestId?: string;
};
