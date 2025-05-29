import { ErrorTextProps } from '../error-text/types';
import { HintTextProps } from '../hint-text/types';
import { CheckboxGroupProps, CheckboxProps } from '../input-checkbox/types';
import { TextInputProps } from '../input-text/types';
import { LabelProps } from '../label/types';
import { RadioProps } from '../radio/types';
import { SelectProps } from '../select/types';
import { TextAreaProps } from '../textarea/types';
import { createIconButton } from './buttons';
import { createIcon } from './icons';

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
  className?: string;
}) => {
  const formField = document.createElement('fieldset');
  formField.className = [
    formFieldProps.error ? 'gi-error-state' : '',
    formFieldProps.className || '',
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  const wrapper = document.createElement('div');
  wrapper.className = 'gi-pb-3 gi-flex gi-flex-col gi-gap-1';
  const container = document.createElement('div');

  if (formFieldProps.label) {
    const label = createLabel({
      ...formFieldProps.label,
      className: 'gi-font-bold',
    });
    container.append(label);
  }

  if (formFieldProps.hint) {
    const hint = createHintText(formFieldProps.hint);
    container.append(hint);
  }

  wrapper.append(container);

  if (formFieldProps.error) {
    const error = createErrorText(formFieldProps.error);
    wrapper.append(error);
  }

  formField.append(wrapper);

  return formField;
};

export const createCheckbox = (arguments_: CheckboxProps) => {
  let widthClass = '';
  let sizeClass = '';

  if (arguments_.size == 'lg') {
    widthClass = 'gi-w-11 gi-h-11';
    sizeClass = 'gi-input-checkbox-large';
  } else if (arguments_.size == 'sm') {
    widthClass = 'gi-w-6 gi-h-6';
    sizeClass = 'gi-input-checkbox-small';
  } else {
    widthClass = 'gi-w-8 gi-h-8';
    sizeClass = 'gi-input-checkbox-medium';
  }

  const container = document.createElement('div');
  const inputContainer = document.createElement('div');
  inputContainer.className = 'gi-input-checkbox-container';

  const input = document.createElement('input') as HTMLInputElement;

  input.defaultChecked = !!arguments_.defaultChecked;

  input.type = 'checkbox';
  input.role = 'checkbox';
  input.className = `gi-input-checkbox ${sizeClass} ${widthClass}`;
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
    hintContainer.className = 'gi-input-checkbox-hint-container';

    const spacer = document.createElement('div');
    spacer.className = widthClass;

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
    `${arguments_.className || ''} gi-input-text-container`.trim();

  if (arguments_.prefix) {
    const prefix = document.createElement('div');
    prefix.className = 'gi-input-text-prefix';
    prefix.dataset.disabled = `${arguments_.disabled ?? false}`;
    prefix.textContent = arguments_.prefix;
    container.append(prefix);
  }

  const inner = document.createElement('div');
  inner.className = 'gi-input-text-inner';
  if (arguments_.halfFluid) {
    inner.classList.add('gi-input-half-width');
  }

  if (arguments_.iconStart) {
    const iconStart = document.createElement('div');
    iconStart.className = 'gi-input-text-icon-start';
    iconStart.dataset.prefix = `${!!arguments_.prefix}`;
    iconStart.append(
      createIcon({
        icon: arguments_.iconStart,
        disabled: arguments_.disabled,
      }),
    );
    inner.append(iconStart);
  }

  const input = document.createElement('input');
  input.type = arguments_.type || 'text';
  input.className = 'gi-input-text';

  if (arguments_.inputClassName) {
    input.classList.add(arguments_.inputClassName);
  }

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

  input.dataset.iconStart = `${!!arguments_.iconStart}`;
  input.dataset.iconEnd = `${!!arguments_.iconEnd}`;
  input.dataset.endElement = `${!!arguments_.inputActionButton}`;
  input.dataset.prefix = `${!!arguments_.prefix}`;
  input.dataset.suffix = `${!!arguments_.suffix}`;

  inner.append(input);

  if (arguments_.iconEnd) {
    const iconEnd = document.createElement('div');
    iconEnd.className = 'gi-input-text-icon-end';
    iconEnd.dataset.endElement = `${!!arguments_.inputActionButton}`;
    iconEnd.dataset.suffix = `${!!arguments_.suffix}`;
    iconEnd.append(
      createIcon({
        icon: arguments_.iconEnd,
        disabled: arguments_.disabled,
        size: 'md',
      }),
    );
    inner.append(iconEnd);
  }

  if (arguments_.inputActionButton) {
    const endElement = document.createElement('div');
    endElement.className = 'gi-input-text-end-element';
    endElement.dataset.suffix = `${!!arguments_.suffix}`;
    endElement.append(
      createIconButton({
        icon: arguments_.inputActionButton?.icon,
        variant: 'flat',
        size: 'small',
        appearance: 'dark',
        disabled: arguments_.disabled,
      }),
    );
    inner.append(endElement);
  }

  container.append(inner);

  if (arguments_.suffix) {
    const suffix = document.createElement('div');
    suffix.className = 'gi-input-text-suffix';
    suffix.dataset.disabled = `${arguments_.disabled ?? false}`;
    suffix.textContent = arguments_.suffix;
    container.append(suffix);
  }

  formField.append(container);
  return formField;
};

export const createRadio = (arguments_: RadioProps) => {
  let widthClass = 'gi-w-8';
  let sizeClass = 'gi-input-radio-medium';
  const size: any = arguments_.size?.toString() || 'md';

  if (size == 'lg') {
    widthClass = 'gi-w-11';
    sizeClass = 'gi-input-radio-large';
  } else if (size == 'sm') {
    widthClass = 'gi-w-6';
    sizeClass = 'gi-input-radio-small';
  }

  const container = document.createElement('div');
  const inputContainer = document.createElement('div');
  inputContainer.className = 'gi-input-radio-container';

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
  const labelDiv = document.createElement('div');

  if (arguments_.label) {
    let labelDivClass = '';

    if (size === 'md') {
      labelDivClass = 'gi-mt-1';
    } else if (size === 'lg') {
      labelDivClass = 'gi-mt-2';
    }

    labelDiv.className = labelDivClass;

    const label = createLabel({
      size,
      content: arguments_.label,
    });
    label.htmlFor = input.id;
    labelDiv.append(label);

    inputContainer.append(labelDiv);
  }
  container.append(inputContainer);

  if (arguments_.hint) {
    const hintContainer = document.createElement('div');

    const spacer = document.createElement('div');
    spacer.className = widthClass;

    const hint = createHintText({ content: arguments_.hint, size });

    hintContainer.append(spacer);
    hintContainer.append(hint);

    labelDiv.append(hintContainer);
  }

  if (arguments_.conditionalInput) {
    const extraContainer = document.createElement('div');

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

    const indexContainer = document.createElement('div');
    indexContainer.dataset.conditionalContainer = arguments_.dataElement;
    indexContainer.className = arguments_.checked ? 'gi-block' : 'gi-hidden';
    const textInput = createTextInput({ ...arguments_.conditionalInput });
    indexContainer.append(textInput);

    extraContainer.append(indexContainer);
    container.append(extraContainer);
  }

  return container;
};

export const createCheckboxGroup = (arguments_: CheckboxGroupProps) => {
  const formField = createFormField(arguments_);

  const container = document.createElement('div');
  container.className = 'gi-input-group-container';
  container.dataset.module = 'gieds-checkboxes';

  const innerContainer = document.createElement('div');
  innerContainer.className = 'gi-input-group-options-container';

  const stackContainer = document.createElement('div');
  stackContainer.dataset.element = 'checkbox-container';
  stackContainer.className = arguments_.inline
    ? 'gi-input-group-options-inline'
    : 'gi-input-group-options-stacked';

  for (const item of arguments_.items) {
    const checkbox = createCheckbox({ ...item, size: arguments_.size });
    stackContainer.append(checkbox);
  }

  innerContainer.append(stackContainer);
  container.append(innerContainer);
  formField.append(container);

  return formField;
};

export const createSelect = (arguments_: SelectProps) => {
  const formField = createFormField(arguments_);

  const select = document.createElement('select');
  select.className = 'gi-select';

  select.disabled = !!arguments_.disabled;

  if (arguments_.className) {
    select.classList.add(arguments_.className);
  }

  select.id = arguments_.id;
  if (arguments_.dataTestid) {
    select.dataset.testid = arguments_.dataTestid;
  }

  for (const item of arguments_.items) {
    if ('items' in item) {
      const optgroup = document.createElement('optgroup');
      optgroup.role = 'group';
      if (item.label) {
        optgroup.label = item.label;
      }
      for (const subitem of item.items) {
        const option = document.createElement('option');
        option.className = 'gi-select-option';
        option.disabled = !!subitem.disabled;
        if (subitem.label) {
          option.label = subitem.label;
        }
        if (subitem.value) {
          option.value = `${subitem.value}`;
        }
        if (subitem.hidden) {
          option.hidden = true;
        }
        if (subitem.selected) {
          option.selected = true;
        }
        optgroup.append(option);
      }
      select.append(optgroup);
    } else {
      const option = document.createElement('option');
      option.className = 'gi-select-option';
      option.disabled = !!item.disabled;
      if (item.label) {
        option.label = item.label;
      }
      if (item.value) {
        option.value = `${item.value}`;
      }
      if (item.hidden) {
        option.hidden = true;
      }
      if (item.selected) {
        option.selected = true;
      }
      select.append(option);
    }
  }

  formField.append(select);

  return formField;
};

export const createTextArea = (arguments_: TextAreaProps) => {
  const formField = createFormField(arguments_);

  const container = document.createElement('div');
  container.className = 'gi-textarea-container';

  const textarea = document.createElement('textarea');
  textarea.dataset.module = 'gieds-textarea';

  textarea.className = `${arguments_.className || ''}
     gi-textarea ${arguments_.halfFluid === true ? 'gi-input-half-width' : ''}`.trim();

  if (arguments_.name) {
    textarea.name = arguments_.name;
  }
  if (arguments_.id) {
    textarea.id = arguments_.id;
  }
  if (arguments_.placeholder) {
    textarea.placeholder = arguments_.placeholder;
  }
  if (arguments_.dataTestId) {
    textarea.dataset.testid = arguments_.dataTestId;
  }
  if (arguments_.disabled) {
    textarea.disabled = true;
  }
  if (arguments_.maxLength) {
    textarea.maxLength = arguments_.maxLength;
  }

  textarea.rows = arguments_.rows || 4;

  textarea.cols = arguments_.cols || 100;

  container.append(textarea);

  formField.append(container);

  if (arguments_.maxLength) {
    const remainingChars = document.createElement('div');
    remainingChars.className = 'gi-textarea-remaining-chars';
    remainingChars.dataset['remainingcharscontainer'] = textarea.id;

    const remainingCharsHint = createHintText({
      content: `You have ${arguments_.maxLength} characters remaining`,
    });

    remainingChars.append(remainingCharsHint);
    formField.append(remainingChars);
  }

  return formField;
};
