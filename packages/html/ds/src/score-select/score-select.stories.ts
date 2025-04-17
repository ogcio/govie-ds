import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { createButton } from '../helpers/buttons';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ScoreSelectProps } from './types';

const meta: Meta<ScoreSelectProps> = {
  title: 'Components/ScoreSelect',
  parameters: {
    docs: {
      description: {
        component:
          'ScoreSelect behaves like a Likert scale using buttons. Includes optional responsive bottom labels for the range ends.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ScoreSelectProps>;

const createScoreSelect = ({
  name,
  size = 'large',
  defaultValue,
  options = [],
  label,
  hint,
  leftLabel,
  rightLabel,
}: ScoreSelectProps): HTMLElement => {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'gi-w-full';

  const wrapper = document.createElement('div');
  wrapper.className = 'gi-score-select-button-group';

  if (label || hint) {
    const labelWrapper = document.createElement('div');
    labelWrapper.className = 'gi-pb-3 gi-flex gi-flex-col';

    if (label) {
      const labelElement = document.createElement('label');
      labelElement.className = 'gi-text-md gi-label gi-font-bold';
      labelElement.textContent = label;
      labelWrapper.append(labelElement);
    }

    if (hint) {
      const hintElement = document.createElement('div');
      hintElement.className = 'gi-hint-text-md gi-hint-text gi-mb-1';
      hintElement.textContent = hint;
      labelWrapper.append(hintElement);
    }

    fieldset.append(labelWrapper);
  }

  // Responsive label row
  if (leftLabel && rightLabel && options.length > 2) {
    const responsiveLabels = document.createElement('div');
    responsiveLabels.className = 'gi-score-select-labels-responsive';

    const firstLabel = options[0]?.label ?? '';
    const lastLabel = options[options.length - 1]?.label ?? '';

    const left = document.createElement('div');
    left.textContent = `${firstLabel} – ${leftLabel}`;
    responsiveLabels.append(left);

    const right = document.createElement('div');
    right.textContent = `${lastLabel} – ${rightLabel}`;
    responsiveLabels.append(right);

    wrapper.append(responsiveLabels);
  }

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'gi-btn-group';

  for (const [index, { label, value }] of options.entries()) {
    const button = createButton({
      content: label,
      appearance: 'dark',
      size,
      variant: value === defaultValue ? 'primary' : 'secondary',
    });
    button.setAttribute('name', name);
    button.setAttribute('id', `score-select-${index}`);
    buttonGroup.append(button);
  }

  wrapper.append(buttonGroup);

  // Bottom static labels
  if (leftLabel || rightLabel) {
    const labelRow = document.createElement('div');
    labelRow.className = 'gi-score-select-labels';

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

const createElement = (arguments_: ScoreSelectProps): string =>
  beautifyHtmlNode(createScoreSelect(arguments_));

export const OpinionScale5: Story = {
  name: 'Opinion Scale (1–5)',
  args: {
    name: 'opinion-5',
    size: 'large',
    defaultValue: '3',
    label: 'How strongly do you agree with this statement?',
    options: Array.from({ length: 5 }, (_, index) => ({
      label: String(index + 1),
      value: String(index + 1),
    })),
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (let index = 1; index <= 5; index++) {
      await canvas.findByRole('button', { name: `${index}` });
    }
  },
};

export const OpinionScale7: Story = {
  name: 'Opinion Scale (1–7)',
  args: {
    name: 'opinion-7',
    size: 'large',
    defaultValue: '4',
    label: 'How satisfied are you with your experience?',
    options: Array.from({ length: 7 }, (_, index) => ({
      label: String(index + 1),
      value: String(index + 1),
    })),
    leftLabel: 'Very Dissatisfied',
    rightLabel: 'Very Satisfied',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (let index = 1; index <= 7; index++) {
      await canvas.findByRole('button', { name: `${index}` });
    }
    await canvas.findByText(/Very Dissatisfied/);
    await canvas.findByText(/Very Satisfied/);
  },
};

export const NPS: Story = {
  name: 'Net Promoter Score (0–10)',
  args: {
    name: 'nps',
    size: 'large',
    defaultValue: '6',
    label:
      'How likely are you to recommend our service to a friend or colleague?',
    hint: 'Description',
    options: Array.from({ length: 11 }, (_, index) => ({
      label: String(index),
      value: String(index),
    })),
    leftLabel: 'Not Likely',
    rightLabel: 'Extremely Likely',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (let index = 0; index <= 10; index++) {
      await canvas.findByRole('button', { name: `${index}` });
    }
    await canvas.findByText(/Not Likely/);
    await canvas.findByText(/Extremely Likely/);
  },
};
