import { FormFieldLegacy } from './form-field-legacy/form-field-legacy.js';
import { FormFieldNext } from './form-field-next/form-field-next.js';
import { FormFieldProps } from './types.js';

const deprecatedKeys = ['error', 'hint', 'label'] as const;

const FormField = (props: FormFieldProps) => {
  const isLegacy = deprecatedKeys.some((key) => key in props);

  if (isLegacy) {
    console.warn(
      '[FormField] Using legacy props. Please migrate to the new composable API.',
    );
    return <FormFieldLegacy {...props} />;
  }

  return <FormFieldNext>{props.children}</FormFieldNext>;
};

FormField.Label = FormFieldNext.Label;
FormField.Hint = FormFieldNext.Hint;
FormField.Error = FormFieldNext.Error;

export { FormField };
