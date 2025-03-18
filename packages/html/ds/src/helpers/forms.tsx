import { ErrorTextProps } from '../error-text/error-text.schema';
import { HintTextProps } from '../hint-text/hint-text.schema';
import { LabelProps } from '../label/label.schema';

export const createLabel = (labelProps: LabelProps) => {
  const label = document.createElement('label');
  label.className =
    `gi-text-${labelProps.size} gi-label ${labelProps.className || ''}`.trim();
  label.textContent = labelProps.content;
  if (labelProps.for) {
    label.htmlFor = labelProps.for;
  }
  return label;
};

export const createHint = (hintProps: HintTextProps) => {
  const label = document.createElement('div');
  label.className =
    `gi-hint-text-${hintProps.size} gi-hint-text ${hintProps.className || ''}`.trim();
  label.textContent = hintProps.content;

  return label;
};

export const createErrorText = (errorProps: ErrorTextProps) => {
  const errorText = document.createElement('div');
  errorText.className =
    `gi-error-text-${errorProps.size} gi-error-text ${errorProps.className || ''}`.trim();
  errorText.textContent = errorProps.content;
  errorText.role = 'alert';

  return errorText;
};

export const createFormField = (formFieldProps: {
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
}) => {
  const formField = document.createElement('fieldset');
  formField.className =
    `${formFieldProps.error ? 'gi-error-state' : ''}`.trim();

  if (formFieldProps.label) {
    const label = createLabel(formFieldProps.label);
    formField.append(label);
  }

  if (formFieldProps.hint) {
    const hint = createHint(formFieldProps.hint);
    formField.append(hint);
  }

  if (formFieldProps.error) {
    const error = createErrorText(formFieldProps.error);
    formField.append(error);
  }

  return formField;
};
