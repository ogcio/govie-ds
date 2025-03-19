import { ErrorTextProps } from '../error-text/error-text.schema';
import { HintTextProps } from '../hint-text/hint-text.schema';
import { LabelProps } from '../label/label.schema';

export type FileUploadProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
  dataTestId?: string;
};
