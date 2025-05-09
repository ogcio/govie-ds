import { RadioGroupProps } from '../radio/types';
import { createFormField, createRadio } from './forms';

export const createInputRadioGroup = (arguments_: RadioGroupProps) => {
  const formField = createFormField(arguments_);

  const container = document.createElement('div');
  container.className = 'gi-input-group-container';
  container.dataset.module = 'gieds-radios';

  const innerContainer = document.createElement('div');
  innerContainer.className = 'gi-input-group-options-container';

  const stackContainer = document.createElement('div');
  stackContainer.dataset.element = 'radio-container';
  stackContainer.className = arguments_.inline
    ? 'gi-input-group-options-inline'
    : 'gi-input-group-options-stacked';

  for (let index = 0; index < arguments_.items.length; index++) {
    const item = arguments_.items[index];

    if (item.slot) {
      stackContainer.append(item.slot);
      continue;
    }

    const radio = createRadio({
      ...item,
      name: arguments_.groupId,
      size: arguments_.size,
      dataElement: `radio${index}`,
    });
    while (radio.firstChild) {
      stackContainer.append(radio.firstChild);
    }
  }

  innerContainer.append(stackContainer);
  container.append(innerContainer);
  formField.append(container);

  return formField;
};
