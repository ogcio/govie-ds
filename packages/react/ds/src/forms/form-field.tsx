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
  const renderTextComponent = (type: string, props: any) => {
    const Component = type === 'error' ? ErrorText : HintText;

    if (!props?.text) {
      return null;
    }

    return typeof props.text === 'string' ? (
      <Component text={props.text} size={props.size} className="gi-mb-1" />
    ) : (
      <Component size={props.size} className="gi-mb-1">
        {props.text}
      </Component>
    );
  };

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
          {renderTextComponent('hint', hint)}
        </div>
        {renderTextComponent('error', error)}
      </div>

      <Slottable>{children}</Slottable>
    </fieldset>
  );
};
