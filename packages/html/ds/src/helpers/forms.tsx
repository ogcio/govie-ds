import { CheckboxProps } from '../checkbox/types';
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

export const createHintText = (hintProps: HintTextProps) => {
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
    const hint = createHintText(formFieldProps.hint);
    formField.append(hint);
  }

  if (formFieldProps.error) {
    const error = createErrorText(formFieldProps.error);
    formField.append(error);
  }

  return formField;
};

export const createCheckbox = (arguments_: CheckboxProps) => {
  let sizeClass = '';
  let tickClass = '';

  if (arguments_.size == 'lg') {
    sizeClass = 'gi-w-11 gi-h-11';
    tickClass =
      'checked:before:gi-w-7 checked:before:gi-h-3.5 checked:before:gi-left-1.5 checked:before:gi-top-2';
  } else if (arguments_.size == 'sm') {
    sizeClass = 'gi-w-6 gi-h-6';
    tickClass =
      'checked:before:gi-w-4 checked:before:gi-h-2 checked:before:gi-left-0.5 checked:before:gi-top-1';
  } else {
    sizeClass = 'gi-w-8 gi-h-8';
    tickClass =
      'checked:before:gi-w-5 checked:before:gi-h-2.5 checked:before:gi-left-1 checked:before:gi-top-1.5';
  }

  const container = document.createElement('div');
  const inputContainer = document.createElement('div');
  inputContainer.className = 'gi-checkbox-container';

  const input = document.createElement('input') as HTMLInputElement;
  input.type = 'checkbox';
  input.role = 'checkbox';
  input.className = `gi-checkbox-input ${sizeClass} ${tickClass}`;
  if (arguments_.id) {
    input.id = arguments_.id;
  }
  if (arguments_.value) {
    input.value = arguments_.value as string;
  }
  if (arguments_.name) {
    input.name = arguments_.name;
  }
  if (arguments_.checked) {
    input.defaultChecked = arguments_.checked;
  }
  if (arguments_.disabled) {
    input.disabled = arguments_.disabled;
  }

  inputContainer.append(input);

  if (arguments_.label) {
    const label = document.createElement('label') as HTMLLabelElement;
    if (arguments_.id) {
      label.htmlFor = arguments_.id;
    }
    label.className = 'gi-checkbox-label';
    label.textContent = arguments_.label;
    inputContainer.append(label);
  }

  container.append(inputContainer);

  if (arguments_.hint) {
    const hintContainer = document.createElement('div');
    hintContainer.className = 'gi-checkbox-hint-container';

    const spacer = document.createElement('div');
    spacer.className = sizeClass;

    const hint = createHintText({ content: arguments_.hint });

    hintContainer.append(spacer);
    hintContainer.append(hint);

    container.append(hintContainer);
  }
  return container;
};
