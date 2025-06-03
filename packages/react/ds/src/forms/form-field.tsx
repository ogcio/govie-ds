import { Slottable } from '@radix-ui/react-slot';
import { FieldsetHTMLAttributes } from 'react';
import { cn } from '../cn.js';
import { ErrorText } from '../error-text/error-text.js';
import { ErrorTextProps } from '../error-text/types.js';
import { HintText } from '../hint-text/hint-text.js';
import { HintTextProps } from '../hint-text/types.js';
import { Label } from '../label/label.js';
import { LabelTextProps } from '../label/types.js';

export type FormFieldProps = {
  error?: ErrorTextProps;
  hint?: HintTextProps;
  label?: LabelTextProps;
  className?: string;
} & Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'style'>;

export const FormField = ({
  label,
  hint,
  error,
  children,
  className,
  ...props
}: FormFieldProps) => {
  return (
    <fieldset className={cn({ 'gi-error-state': error }, className)} {...props}>
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
