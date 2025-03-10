import { Slottable } from '@radix-ui/react-slot';
import React from 'react';
import { cn } from '../cn.js';
import { ErrorText, ErrorTextProps } from '../error-text/error-text.js';
import { HintText, HintTextProps } from '../hint-text/hint-text.js';
import { Label, LabelProps } from '../label/label.js';

export type FormFieldProps = {
  error?: ErrorTextProps;
  hint?: HintTextProps;
  label?: LabelProps;
  className?: string;
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export const FormField = ({
  label,
  hint,
  error,
  children,
  className,
}: FormFieldProps) => {
  return (
    <fieldset className={cn({ 'gi-error-state': error }, className)}>
      {label?.text && (
        <Label
          text={label.text}
          size={label.size}
          htmlFor={label.htmlFor}
          className={!hint?.text && !error?.text ? 'gi-mb-2' : 'gi-mb-1'}
        >
          {label.children}
        </Label>
      )}

      {hint?.text && (
        <HintText text={hint.text} size={hint.size} className="gi-mb-1" />
      )}
      {error?.text && (
        <ErrorText text={error.text} size={error.size} className="gi-mb-1" />
      )}

      <Slottable>{children}</Slottable>
    </fieldset>
  );
};
