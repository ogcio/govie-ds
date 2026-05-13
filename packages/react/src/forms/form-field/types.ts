import type { FieldsetHTMLAttributes, PropsWithChildren } from 'react';
import type { ErrorTextProps } from '../../error-text/types.js';
import type { HintTextProps } from '../../hint-text/types.js';
import type { LabelSizeType, LabelTextProps } from '../../label/types.js';

export type LegendProps = PropsWithChildren<
  React.HTMLAttributes<HTMLLegendElement> & {
    text?: string | React.ReactElement;
    size?: LabelSizeType;
    secondaryLabel?: React.ReactNode;
    htmlFor?: never;
  }
>;

export type LabelProps = LabelTextProps & {
  secondaryLabel?: React.ReactNode;
};

export type FormFieldLabelProps = LabelProps | LegendProps;

export type FormFieldProps = {
  /** @deprecated Use <FormFieldError> instead */
  error?: ErrorTextProps;

  /** @deprecated Use <FormFieldHint> instead */
  hint?: HintTextProps;

  /** @deprecated Use <FormFieldLabel> instead */
  label?: LabelTextProps;

  className?: string;
} & Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'style'>;
