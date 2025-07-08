import { Slottable } from '@radix-ui/react-slot';
import {
  ReactNode,
  FieldsetHTMLAttributes,
  isValidElement,
  Children,
  createContext,
  useContext,
} from 'react';
import { cn } from '../../cn.js';
import { ErrorText } from '../../error-text/error-text.js';
import { ErrorTextProps } from '../../error-text/types.js';
import { HintText } from '../../hint-text/hint-text.js';
import { HintTextProps } from '../../hint-text/types.js';
import { Label } from '../../label/label.js';
import { LabelTextProps } from '../../label/types.js';
import { FormFieldProps } from './types.js';

type FormFieldBaseProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'style'
> & {
  className?: string;
  children: ReactNode;
};

const FormFieldContext = createContext<boolean | null>(null);

function useFormFieldContext(component: string) {
  const context = useContext(FormFieldContext);
  if (!context) {
    console.error(`[${component}] must be used within a <FormField>.`);
  }
}

function isSpecialComponentType(
  type: unknown,
): type is
  | typeof FormFieldLabel
  | typeof FormFieldHint
  | typeof FormFieldError {
  return (
    type === FormFieldLabel || type === FormFieldHint || type === FormFieldError
  );
}

const FormField = (props: FormFieldProps) => {
  const deprecatedKeys = ['error', 'hint', 'label'] as const;
  const isLegacy = deprecatedKeys.some((key) => key in props);

  if (isLegacy) {
    console.warn(
      '[FormField] Using legacy props. Please migrate to the new composable API.',
    );

    return (
      <FormFieldContext.Provider value={true}>
        <FormFieldBase>
          {props.label && <FormFieldLabel {...props.label} />}
          {props.hint && <FormFieldHint {...props.hint} />}
          {props.error && <FormFieldError {...props.error} />}
          {props.children}
        </FormFieldBase>
      </FormFieldContext.Provider>
    );
  }

  return (
    <FormFieldContext.Provider value={true}>
      <FormFieldBase>{props.children}</FormFieldBase>
    </FormFieldContext.Provider>
  );
};

const FormFieldBase = ({
  children,
  className,
  ...props
}: FormFieldBaseProps) => {
  const allChildren = Children.toArray(children);

  const label = allChildren.find(
    (child) => isValidElement(child) && child.type === FormFieldLabel,
  );
  const hint = allChildren.find(
    (child) => isValidElement(child) && child.type === FormFieldHint,
  );
  const error = allChildren.find(
    (child) => isValidElement(child) && child.type === FormFieldError,
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

const FormFieldLabel = ({
  children,
  text,
  size,
  htmlFor,
  className,
}: LabelTextProps) => {
  useFormFieldContext('FormFieldLabel');
  return (
    <Label
      text={text}
      size={size}
      htmlFor={htmlFor}
      className={cn('gi-font-bold', className)}
    >
      {children}
    </Label>
  );
};
FormFieldLabel.displayName = 'FormFieldLabel';

const FormFieldHint = ({ children, text, size, className }: HintTextProps) => {
  useFormFieldContext('FormFieldHint');
  return (
    <HintText text={text} size={size} className={cn('gi-mb-1', className)}>
      {children}
    </HintText>
  );
};
FormFieldHint.displayName = 'FormFieldHint';

const FormFieldError = ({
  children,
  text,
  size,
  className,
}: ErrorTextProps) => {
  useFormFieldContext('FormFieldError');
  return (
    <ErrorText text={text} size={size} className={cn('gi-mb-1', className)}>
      {children}
    </ErrorText>
  );
};
FormFieldError.displayName = 'FormFieldError';

export { FormField, FormFieldLabel, FormFieldHint, FormFieldError };
