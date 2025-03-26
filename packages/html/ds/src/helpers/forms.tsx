import { CheckboxProps } from '../checkbox/types';
import { ErrorTextProps } from '../error-text/types';
import { HintTextProps } from '../hint-text/types';
import { LabelProps } from '../label/types';
import { RadioProps } from '../radio/types';
import { TextInputProps } from '../text-input/types';

export const createLabel = (labelProps: LabelProps) => {
  const label = document.createElement('label');
  const size = labelProps.size;
  label.className =
    `gi-text-${size || 'md'} gi-label ${labelProps.className || ''}`.trim();
  if (labelProps.content) {
    label.textContent = labelProps.content;
  }
  if (labelProps.htmlFor) {
    label.htmlFor = labelProps.htmlFor;
  }
  return label;
};

export const createHintText = (hintProps: HintTextProps) => {
  const hint = document.createElement('div');
  const size = hintProps.size;
  hint.className =
    `gi-hint-text-${size || 'md'} gi-hint-text ${hintProps.className || ''}`.trim();
  if (hintProps.content) {
    hint.textContent = hintProps.content;
  }

  return hint;
};

export const createErrorText = (errorProps: ErrorTextProps) => {
  const errorText = document.createElement('div');
  const size = errorProps.size;
  errorText.className =
    `gi-error-text-${size || 'md'} gi-error-text ${errorProps.className || ''}`.trim();
  if (errorProps.content) {
    errorText.textContent = errorProps.content;
  }
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
  let widthClass = '';
  let sizeClass = '';

  if (arguments_.size == 'lg') {
    widthClass = 'gi-w-11 gi-h-11';
    sizeClass = 'gi-checkbox-large';
  } else if (arguments_.size == 'sm') {
    widthClass = 'gi-w-6 gi-h-6';
    sizeClass = 'gi-checkbox-small';
  } else {
    widthClass = 'gi-w-8 gi-h-8';
    sizeClass = 'gi-checkbox-medium';
  }

  const container = document.createElement('div');
  const inputContainer = document.createElement('div');
  inputContainer.className = 'gi-checkbox-container';

  const input = document.createElement('input') as HTMLInputElement;
  input.type = 'checkbox';
  input.role = 'checkbox';
  input.className = `gi-checkbox-input ${sizeClass} ${widthClass}`;
  input.id = arguments_.id || (arguments_.value as string);
  if (arguments_.value) {
    input.value = arguments_.value as string;
  }
  if (arguments_.name) {
    input.name = arguments_.name;
  }
  if (arguments_.checked) {
    input.defaultChecked = arguments_.checked;
    input.checked = arguments_.checked;
  }
  if (arguments_.disabled) {
    input.disabled = arguments_.disabled;
  }
  if (arguments_.dataElement) {
    input.dataset.element = arguments_.dataElement;
  }
  inputContainer.append(input);

  if (arguments_.label) {
    const label = document.createElement('label') as HTMLLabelElement;
    label.htmlFor = input.id;
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

export const createTextInput = (arguments_: TextInputProps) => {
  const formField = createFormField(arguments_);

  const container = document.createElement('div');
  container.className =
    `${arguments_.className || ''} gi-text-input-container`.trim();

  if (arguments_.prefix) {
    const prefix = document.createElement('div');
    prefix.className = 'gi-text-input-prefix';
    prefix.textContent = arguments_.prefix;
    container.append(prefix);
  }

  const input = document.createElement('input') as HTMLInputElement;
  input.type = arguments_.type || 'text';
  input.className =
    `gi-text-input ${arguments_.halfFluid === true ? 'gi-input-half-width' : ''}`.trim();

  if (arguments_.name) {
    input.name = arguments_.name;
  }
  if (arguments_.id) {
    input.id = arguments_.id;
  }
  if (arguments_.placeholder) {
    input.placeholder = arguments_.placeholder;
  }
  if (arguments_.dataTestId) {
    input.dataset.testid = arguments_.dataTestId;
  }
  if (arguments_.disabled) {
    input.disabled = true;
  }

  container.append(input);

  if (arguments_.suffix) {
    const suffix = document.createElement('div');
    suffix.className = 'gi-text-input-suffix';
    suffix.textContent = arguments_.suffix;
    container.append(suffix);
  }

  formField.append(container);
  return formField;
};

export const createRadio = (arguments_: RadioProps) => {
  let widthClass = '';
  let sizeClass = '';

  if (arguments_.size == 'lg') {
    widthClass = 'gi-w-11 gi-h-11';
    sizeClass = 'gi-radio-large';
  } else if (arguments_.size == 'sm') {
    widthClass = 'gi-w-6 gi-h-6';
    sizeClass = 'gi-radio-small';
  } else {
    widthClass = 'gi-w-8 gi-h-8';
    sizeClass = 'gi-radio-medium';
  }

  const container = document.createElement('div');
  const inputContainer = document.createElement('div');
  inputContainer.className = 'gi-radio-container';

  const input = document.createElement('input') as HTMLInputElement;
  input.type = 'radio';
  input.dataset.primary = 'true';
  input.ariaChecked = `${arguments_.checked || false}`;
  input.className = `${widthClass} ${sizeClass}`;

  input.id = arguments_.id || (arguments_.value as string);

  if (arguments_.value) {
    input.value = arguments_.value as string;
  }
  if (arguments_.name) {
    input.name = arguments_.name;
  }
  if (arguments_.checked) {
    input.defaultChecked = arguments_.checked;
    input.checked = arguments_.checked;
  }
  if (arguments_.disabled) {
    input.disabled = arguments_.disabled;
  }
  if (arguments_.dataElement) {
    input.dataset.element = arguments_.dataElement;
  }
  inputContainer.append(input);

  if (arguments_.label) {
    const label = document.createElement('label') as HTMLLabelElement;
    label.htmlFor = input.id;
    label.textContent = arguments_.label;
    inputContainer.append(label);
  }
  container.append(inputContainer);

  if (arguments_.hint) {
    const hintContainer = document.createElement('div');
    hintContainer.className = 'gi-checkbox-hint-container';

    const spacer = document.createElement('div');
    spacer.className = widthClass;

    const hint = createHintText({ content: arguments_.hint });

    hintContainer.append(spacer);
    hintContainer.append(hint);

    container.append(hintContainer);
  }

  if (arguments_.conditionalInput) {
    const extraContainer = document.createElement('div');
    extraContainer.className = 'gi-radio-conditional-divider-container';

    const spacerContainer = document.createElement('div');
    spacerContainer.dataset.conditionalDivider = arguments_.dataElement;
    spacerContainer.className = `${widthClass} ${arguments_.conditionalInput && arguments_.checked ? 'gi-block' : 'gi-invisible'}`;
    const spacer = document.createElement('div');
    spacer.className = `${widthClass} gi-radio-conditional-divider-border-container`;
    const divider = document.createElement('div');
    divider.className = 'gi-radio-conditional-divider-border';
    spacer.append(divider);
    spacerContainer.append(spacer);
    extraContainer.append(spacerContainer);

    const inputContainer = document.createElement('div');
    inputContainer.dataset.conditionalContainer = arguments_.dataElement;
    inputContainer.className = arguments_.checked ? 'gi-block' : 'gi-hidden';
    const textInput = createTextInput({ ...arguments_.conditionalInput });
    inputContainer.append(textInput);

    extraContainer.append(inputContainer);
    container.append(extraContainer);
  }
  return container;
};
