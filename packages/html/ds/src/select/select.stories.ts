import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './select.html?raw';
import { SelectProps } from './select.schema';

// Name of the folder the macro resides
const path = import.meta.url.split('/select')[0];

const macro = { name: 'govieSelect', html, path };

const Select = renderComponent<SelectProps>(macro);

const meta = {
  component: Select,
  title: 'form/Select',
  parameters: {
    macro,
  },
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
    id: 'Unique-ID',
    label: {
      content: 'Label',
    },
    options: {
      default: {
        label: 'Default select',
        value: 'value-1',
      },
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
  },
};

export const withHint: Story = {
  args: {
    id: 'Unique-ID',
    label: {
      content: 'Default Select',
    },
    hint: {
      content: 'This can be different to where you went before',
    },
    options: {
      default: {
        label: 'Default select',
        value: 'value-1',
      },
      items: [
        {
          label: 'Option 1',
          value: 'value-2',
        },
        {
          label: 'Option 2',
          value: 'value-3',
        },
        {
          label: 'Option 3',
          value: 'value-4',
        },
      ],
    },
  },
};

export const withError: Story = {
  args: {
    id: 'Unique-ID',
    label: {
      content: 'Default Select',
    },
    error: {
      content: 'Error message',
    },
    options: {
      default: {
        label: 'Default select',
        value: 'value-1',
      },
      items: [
        {
          label: 'Option 1',
          value: 'value-2',
        },
        {
          label: 'Option 2',
          value: 'value-3',
        },
        {
          label: 'Option 3',
          value: 'value-4',
        },
      ],
    },
  },
};
