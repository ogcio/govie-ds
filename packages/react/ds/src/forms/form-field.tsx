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
      <div className="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
        <div>
          {label?.text && (
            <Label
              text={label.text}
              size={label.size}
              htmlFor={label.htmlFor}
              className={'gi-font-bold'}
            >
              {label.children}
            </Label>
          )}

          {hint?.text && (
            <HintText text={hint.text} size={hint.size} className="gi-mb-1" />
          )}
        </div>
        {error?.text && (
          <ErrorText text={error.text} size={error.size} className="gi-mb-1" />
        )}
      </div>

      <Slottable>{children}</Slottable>
    </fieldset>
  );
};
