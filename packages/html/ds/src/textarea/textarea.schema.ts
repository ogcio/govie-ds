import { ErrorTextProps } from '../error-text/error-text.schema';
import { HintTextProps } from '../hint-text/hint-text.schema';
import { LabelProps } from '../label/label.schema';

export type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    ref?: React.Ref<HTMLTextAreaElement>;
    maxChars?: number;
    halfFluid?: boolean;
    dataTestId?: string;
    label?: LabelProps;
    hint?: HintTextProps;
    error?: ErrorTextProps;
  };
