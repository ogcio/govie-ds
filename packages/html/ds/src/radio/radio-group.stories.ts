import type { Meta, StoryObj } from '@storybook/react';
import { createFormField, createRadio } from '../helpers/forms';
import { beautifyHtmlNode } from '../storybook/storybook';
import { RadioGroupProps } from './types';

const meta: Meta<RadioGroupProps> = {
  title: 'form/Radio/RadioGroup',
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

const standardProps: RadioGroupProps = {
  groupId: 'uniqueId',
  label: {
    content: 'Where do you live?',
  },
  items: [
    {
      label: 'England',
      value: 'england',
    },
    {
      label: 'Scotland',
      value: 'scotland',
    },
    {
      label: 'Ireland',
      value: 'ireland',
    },
  ],
};

const createRadioGroup = (arguments_: RadioGroupProps) => {
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
    const radio = createRadio({
      ...item,
      name: arguments_.groupId,
      size: arguments_.size,
      dataElement: `radio${index}`,
    });
    stackContainer.append(radio);
  }

  innerContainer.append(stackContainer);
  container.append(innerContainer);
  formField.append(container);

  return formField;
};

const createElement = (arguments_: RadioGroupProps) => {
  const component = createRadioGroup(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    ...standardProps,
    groupId: 'UniqueId1',
  },
  render: (arguments_) => createElement(arguments_),
};

export const inline: Story = {
  args: {
    ...standardProps,
    groupId: 'UniqueId2',
    inline: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const withTitleHint: Story = {
  args: {
    ...standardProps,
    label: {
      content: 'Where do you live?',
    },
    hint: {
      content: 'Specify the location where you live',
    },
    error: {
      content: 'Select a location',
    },
    groupId: 'UniqueId3',
  },
  render: (arguments_) => createElement(arguments_),
};

export const withOptionHints: Story = {
  args: {
    label: {
      content: 'Have you changed your name?',
    },
    hint: {
      content:
        'This includes changing your last name or spelling your name differently.',
    },
    items: [
      {
        label: 'Yes',
        value: 'no',
        hint: 'Yes, I have changed my name',
      },
      {
        label: 'No',
        value: 'no',
        hint: "No, I didn't change my name",
      },
    ],
    groupId: 'UniqueId4',
  },
  render: (arguments_) => createElement(arguments_),
};

export const withConditionalInput: Story = {
  args: {
    label: {
      content: 'How would you prefer to be contacted?',
    },
    items: [
      {
        label: 'Email',
        value: 'email',
        conditionalInput: {
          id: 'input-id-email',
          label: {
            content: 'Email address',
            htmlFor: 'input-id-email',
            size: 'md',
          },
          type: 'email',
        },
      },
      {
        label: 'Phone',
        value: 'phone',
        conditionalInput: {
          id: 'input-id-phone',
          label: {
            content: 'Phone number',
            htmlFor: 'input-id-phone',
            size: 'md',
          },
          type: 'tel',
        },
      },
    ],
    groupId: 'UniqueId7',
  },
  render: (arguments_) => createElement(arguments_),
};
