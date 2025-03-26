import type { Meta, StoryObj } from '@storybook/react';
import { createCheckbox, createFormField } from '../helpers/forms';
import { beautifyHtmlNode } from '../storybook/storybook';
import type { CheckboxGroupProps } from './types';

const meta: Meta<CheckboxGroupProps> = {
  title: 'form/Checkbox/CheckboxGroup',
};

export default meta;
type Story = StoryObj<CheckboxGroupProps>;

const createCheckboxGroup = (arguments_: CheckboxGroupProps) => {
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

const createElement = (arguments_: CheckboxGroupProps) => {
  const component = createCheckboxGroup(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    groupId: 'UniqueID',
    items: [
      {
        label: 'Employment Tribunal',
        value: 'employment-tribunal',
      },
      {
        label: 'Ministry of Defence',
        value: 'ministry-of-defence',
      },
      {
        label: 'Department for Transport',
        value: 'department-for-transport',
      },
      {
        label: 'Others',
        value: 'others',
        disabled: true,
      },
    ],
    label: {
      content: 'Organisation',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const withLabelHintAndError: Story = {
  args: {
    groupId: 'govie-field-ID-2',
    items: [
      {
        label: 'Irish',
        value: 'irish',
      },
      {
        label: 'British',
        value: 'british',
      },
      {
        label: 'Citizen of another country',
        value: 'citizen-of-another-country',
      },
    ],
    label: {
      content: 'What is your nationality?',
    },
    hint: {
      content:
        'If you have dual nationality, select all options that are relevant to you.',
    },
    error: {
      content:
        'Select if you are Irish, British or a citizen of a different country',
    },
  },
  render: (arguments_) => createElement(arguments_),
};
