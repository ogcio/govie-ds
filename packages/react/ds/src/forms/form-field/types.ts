import { FieldsetHTMLAttributes } from 'react';
import { ErrorTextProps } from '../../error-text/types.js';
import { HintTextProps } from '../../hint-text/types.js';
import { LabelTextProps } from '../../label/types.js';

export type FormFieldProps = {
  /** @deprecated Use <FormField.Error> instead */
  error?: ErrorTextProps;

  /** @deprecated Use <FormField.Hint> instead */
  hint?: HintTextProps;

  /** @deprecated Use <FormField.Label> instead */
  label?: LabelTextProps;

  className?: string;
} & Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'style'>;
