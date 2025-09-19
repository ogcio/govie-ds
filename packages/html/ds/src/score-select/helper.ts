import { createButton } from '../helpers/buttons';
import { ScoreSelectProps } from './types';

export const createScoreSelect = ({
  name,
  size = 'large',
  value,
  type,
  label,
  hint,
  leftLabel,
  rightLabel,
  orientation = 'horizontal',
}: ScoreSelectProps): HTMLElement => {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'gi-w-full';

  const labelWrapper = document.createElement('div');
  labelWrapper.className = 'gi-pb-3 gi-flex gi-flex-col';

  let groupLabelId: string | undefined;

  if (label) {
    const labelElement = document.createElement('label');
    labelElement.className = 'gi-text-md gi-label gi-font-bold';
    labelElement.textContent = label;
    groupLabelId = `${name}-label`;
    labelElement.id = groupLabelId;
    labelWrapper.append(labelElement);
  }

  if (hint) {
    const hintElement = document.createElement('div');
    hintElement.className = 'gi-hint-text-md gi-hint-text gi-mb-1';
    hintElement.textContent = hint;
    labelWrapper.append(hintElement);
  }

  if (label || hint) {
    fieldset.append(labelWrapper);
  }

  const wrapper = document.createElement('div');
  wrapper.className = `gi-score-select-button-group ${orientation === 'vertical' ? 'gi-score-select-button-group-vertical' : 'gi-score-select-button-group-horizontal'}`;

  // Define score options based on the 'type' prop
  let scoreOptions: { value: string; label: string }[] = [];

  switch (type) {
    case '1-5': {
      scoreOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
      ];
      break;
    }
    case '1-7': {
      scoreOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
      ];
      break;
    }
    case '0-10': {
      scoreOptions = [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
      ];
      break;
    }
  }

  // Responsive top label row (decorative)
  if (leftLabel && rightLabel && scoreOptions.length > 2) {
    const responsiveLabels = document.createElement('div');
    responsiveLabels.className = 'gi-score-select-labels-responsive';
    responsiveLabels.setAttribute('aria-hidden', 'true');

    const firstLabel = scoreOptions[0]?.label ?? '';
    const lastLabel = scoreOptions.at(-1)?.label ?? '';

    const left = document.createElement('div');
    left.textContent = `${firstLabel} – ${leftLabel}`;
    responsiveLabels.append(left);

    const right = document.createElement('div');
    right.textContent = `${lastLabel} – ${rightLabel}`;
    responsiveLabels.append(right);

    wrapper.append(responsiveLabels);
  }

  const buttonGroup = document.createElement('div');

  buttonGroup.className = `gi-btn-group ${orientation === 'vertical' ? 'gi-flex-col gi-items-start' : ''} `;
  buttonGroup.setAttribute('role', 'radiogroup');
  if (groupLabelId) {
    buttonGroup.setAttribute('aria-labelledby', groupLabelId);
  } else {
    buttonGroup.setAttribute('aria-label', name);
  }

  for (const [
    index,
    { label: buttonLabel, value: _value },
  ] of scoreOptions.entries()) {
    const button = createButton({
      content: buttonLabel,
      appearance: 'dark',
      size,
      variant: _value === value ? 'primary' : 'secondary',
    });

    const isSelected = _value === value;

    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    button.setAttribute('name', name);
    button.setAttribute('id', `score-select-${index}`);
    button.dataset.groupButton = 'true';
    button.dataset.value = _value;

    buttonGroup.append(button);
  }

  wrapper.append(buttonGroup);

  // Bottom static labels (decorative)
  if (leftLabel || rightLabel) {
    const labelRow = document.createElement('div');
    labelRow.className = `gi-score-select-labels ${orientation === 'vertical' ? 'gi-score-select-labels-vertical' : ''}`;

    labelRow.setAttribute('aria-hidden', 'true');

    const left = document.createElement('div');
    left.textContent = leftLabel ?? '';
    labelRow.append(left);

    const right = document.createElement('div');
    right.textContent = rightLabel ?? '';
    labelRow.append(right);

    wrapper.append(labelRow);
  }

  fieldset.append(wrapper);
  return fieldset;
};
