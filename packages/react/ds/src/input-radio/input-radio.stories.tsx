import type { Meta, StoryObj } from '@storybook/react';
import { InputRadio } from './input-radio.js';

const meta = {
  title: 'Form/Radio/InputRadio',
  parameters: {
    docs: {
      description: {
        component: 'Input Radio component',
      },
    },
  },
  component: InputRadio,
} satisfies Meta<typeof InputRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    value: {
      control: 'text',
      type: 'string',
      description: 'The value of the Component',
    },
    name: {
      control: 'text',
      type: 'string',
      description: 'Name attribute of the input element',
    },
    label: {
      control: 'text',
      type: 'string',
      description: 'The label associated with the Radio',
    },
    hint: {
      control: 'text',
      type: 'string',
      description:
        'Additional text to inform the user about the Radio component',
    },
    id: {
      control: 'text',
      type: 'string',
      description: 'The id of the Radio',
    },
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm'],
      description: 'The sizes for the Radio',
    },
    conditionalInput: {
      description:
        'Conditional input associated with the radio (see text input component)',
    },
    checked: {
      control: 'boolean',
      description: 'if true the component is checked',
    },
    onChange: {
      control: 'object',
      type: 'function',
      description: 'Callback fired when the radio component is selected.',
    },
  },
  args: {
    value: 'radio-value',
    label: 'Radio',
  },
};

export const WithHint: Story = {
  args: {
    value: 'radio-with-hint',
    label: 'With hint',
    hint: 'This is a hint',
  },
};

export const WithDefaultChecked: Story = {
  args: {
    value: 'radio-with-default-checked',
    label: 'Default checked',
    checked: true,
  },
};
