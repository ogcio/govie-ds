import { ErrorTextProps } from '../error-text/types';
import { HintTextProps } from '../hint-text/types';
import { LabelProps } from '../label/types';

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
