import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './select.js';

const meta = {
  title: 'Form/Select',
  parameters: {
    docs: {
      description: {
        component: 'Use this select component where it is appropiate',
      },
    },
  },
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    id: {
      description: 'A unqiue valued used to identify the component',
      control: 'text',
      table: {
        category: 'ID',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    options: {
      description: 'A list of labels and values for each option',
      control: 'object',
      table: {
        category: 'Options',
        type: { summary: 'Options' },
      },
    },
    error: {
      description: 'Error message for the select',
      control: 'object',
      table: {
        category: 'Error',
        type: { summary: 'ErrorText' },
      },
    },
    hint: {
      description: 'Hint message for the select',
      control: 'object',
      table: {
        category: 'Hint',
        type: { summary: 'HintText' },
      },
    },
    label: {
      description: 'Label associated for the select',
      control: 'object',
      table: {
        category: 'Label',
        type: { summary: 'Label' },
      },
    },
  },
  args: {
    id: 'unique-id',
    label: {
      content: 'Label',
    },
    hint: {
      content: '',
    },
    error: {
      content: '',
    },
    options: [
      {
        label: 'Option 1',
        value: 'value-1',
      },
      {
        label: 'Option 2',
        value: 'value-2',
      },
      {
        label: 'Option 3',
        value: 'value-3',
      },
    ],
  },
};

export const withHint: Story = {
  args: {
    id: 'unique-id',
    label: {
      content: 'Default Select',
    },
    hint: {
      content: 'This can be different to where you went before',
    },
    options: [
      {
        label: 'Option 1',
        value: 'value-1',
      },
      {
        label: 'Option 2',
        value: 'value-2',
      },
      {
        label: 'Option 3',
        value: 'value-3',
      },
    ],
  },
};

export const withError: Story = {
  args: {
    id: 'unique-id',
    label: {
      content: 'Default Select',
    },
    error: {
      content: 'Error message',
    },
    options: [
      {
        label: 'Option 1',
        value: 'value-1',
      },
      {
        label: 'Option 2',
        value: 'value-2',
      },
      {
        label: 'Option 3',
        value: 'value-3',
      },
    ],
  },
};

export const withoutLabel: Story = {
  args: {
    id: 'unique-id',
    options: [
      {
        label: 'Option 1',
        value: 'value-1',
      },
      {
        label: 'Option 2',
        value: 'value-2',
      },
      {
        label: 'Option 3',
        value: 'value-3',
      },
    ],
  },
};

export const withGroups: Story = {
  args: {
    id: 'unique-id',
    label: {
      content: 'Default Select',
    },
    options: [
      {
        groupName: 'Group 1',
        items: [
          {
            label: 'Option 1',
            value: 'value-1',
          },
          {
            label: 'Option 2',
            value: 'value-2',
          },
          {
            label: 'Option 3',
            value: 'value-3',
          },
        ],
      },
      {
        groupName: 'Group 2',
        items: [
          {
            label: 'Option 4',
            value: 'value-4',
          },
          {
            label: 'Option 5',
            value: 'value-5',
          },
          {
            label: 'Option 6',
            value: 'value-6',
          },
        ],
      },
    ],
  },
};
