import { Slottable } from '@radix-ui/react-slot';
import {
  ReactNode,
  FieldsetHTMLAttributes,
  isValidElement,
  Children,
} from 'react';
import { cn } from '../../../cn.js';
import { ErrorText } from '../../../error-text/error-text.js';
import { ErrorTextProps } from '../../../error-text/types.js';
import { HintText } from '../../../hint-text/hint-text.js';
import { HintTextProps } from '../../../hint-text/types.js';
import { Label } from '../../../label/label.js';
import { LabelTextProps } from '../../../label/types.js';

function isSpecialComponentType(
  type: unknown,
): type is
  | typeof FormFieldNext.Label
  | typeof FormFieldNext.Hint
  | typeof FormFieldNext.Error {
  return (
    type === FormFieldNext.Label ||
    type === FormFieldNext.Hint ||
    type === FormFieldNext.Error
  );
}

export type FormFieldNextProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'style'
> & {
  className?: string;
  children: ReactNode;
};

export const FormFieldNext = ({
  children,
  className,
  ...props
}: FormFieldNextProps) => {
  const allChildren = Children.toArray(children);

  const label = allChildren.find(
    (child) => isValidElement(child) && child.type === FormFieldNext.Label,
  );
  const hint = allChildren.find(
    (child) => isValidElement(child) && child.type === FormFieldNext.Hint,
  );
  const error = allChildren.find(
    (child) => isValidElement(child) && child.type === FormFieldNext.Error,
  );

  const rest = allChildren.filter(
    (child) => !isValidElement(child) || !isSpecialComponentType(child.type),
  );

  return (
    <fieldset
      className={cn({ 'gi-error-state': !!error }, className)}
      {...props}
    >
      <div className="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
        <div>
          {label}
          {hint}
        </div>
        {error}
      </div>

      <Slottable>{rest}</Slottable>
    </fieldset>
  );
};

const FormFieldNextLabel = ({
  children,
  text,
  size,
  htmlFor,
  className,
}: LabelTextProps) => (
  <Label
    text={text}
    size={size}
    htmlFor={htmlFor}
    className={cn('gi-font-bold', className)}
  >
    {children}
  </Label>
);
FormFieldNextLabel.displayName = 'FormField.Label';
FormFieldNext.Label = FormFieldNextLabel;

const FormFieldNextHint = ({
  children,
  text,
  size,
  className,
}: HintTextProps) => (
  <HintText text={text} size={size} className={cn('gi-mb-1', className)}>
    {children}
  </HintText>
);
FormFieldNextHint.displayName = 'FormField.Hint';
FormFieldNext.Hint = FormFieldNextHint;

const FormFieldNextError = ({
  children,
  text,
  size,
  className,
}: ErrorTextProps) => (
  <ErrorText text={text} size={size} className={cn('gi-mb-1', className)}>
    {children}
  </ErrorText>
);
FormFieldNextError.displayName = 'FormField.Error';
FormFieldNext.Error = FormFieldNextError;
