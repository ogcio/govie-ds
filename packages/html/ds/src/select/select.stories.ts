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
  args: {
    id: 'Unique-ID',
    label: {
      content: 'Main Heading',
    },
    error: {
      content: 'This is the error',
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
