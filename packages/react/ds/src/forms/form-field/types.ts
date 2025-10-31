import { FieldsetHTMLAttributes } from 'react';
import { ErrorTextProps } from '../../error-text/types.js';
import { HintTextProps } from '../../hint-text/types.js';
import { LabelTextProps } from '../../label/types.js';

export type FormFiledLabelProps = LabelTextProps & {
  secondaryLabel?: React.ReactNode;
};

export type FormFieldProps = {
  /** @deprecated Use <FormFieldError> instead */
  error?: ErrorTextProps;

  /** @deprecated Use <FormFieldHint> instead */
  hint?: HintTextProps;

  /** @deprecated Use <FormFieldLabel> instead */
  label?: LabelTextProps;

  className?: string;
} & Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'style'>;
