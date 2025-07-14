'use client';
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

function getSpecialComponentType(child: ReactNode): string | null {
  if (!isValidElement(child)) return null;

  return (
    (child.type as any)?.componentType ||
    (child.props as any)?.__mdxType ||
    null
  );
}

function isSpecialComponent(child: ReactNode): boolean {
  return ['FormFieldLabel', 'FormFieldHint', 'FormFieldError'].includes(
    getSpecialComponentType(child) ?? '',
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
        <FormFieldBase className={props.className}>
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
      <FormFieldBase className={props.className}>
        {props.children}
      </FormFieldBase>
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
    (child) => getSpecialComponentType(child) === 'FormFieldLabel',
  );
  const hint = allChildren.find(
    (child) => getSpecialComponentType(child) === 'FormFieldHint',
  );
  const error = allChildren.find(
    (child) => getSpecialComponentType(child) === 'FormFieldError',
  );
  const rest = allChildren.filter((child) => !isSpecialComponent(child));

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
Object.defineProperty(FormFieldLabel, 'componentType', {
  value: 'FormFieldLabel',
  writable: false,
  enumerable: false,
});
FormFieldLabel.displayName = 'FormFieldLabel';

const FormFieldHint = ({ children, text, size, className }: HintTextProps) => {
  useFormFieldContext('FormFieldHint');
  return (
    <HintText text={text} size={size} className={cn('gi-mb-1', className)}>
      {children}
    </HintText>
  );
};
Object.defineProperty(FormFieldHint, 'componentType', {
  value: 'FormFieldHint',
  writable: false,
  enumerable: false,
});
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
Object.defineProperty(FormFieldError, 'componentType', {
  value: 'FormFieldError',
  writable: false,
  enumerable: false,
});
FormFieldError.displayName = 'FormFieldError';

export { FormField, FormFieldLabel, FormFieldHint, FormFieldError };
