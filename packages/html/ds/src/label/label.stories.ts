import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './label.html?raw';
import { LabelProps } from './label.schema';

const macro = { name: 'govieLabel', html };

// Component created using renderComponent and LabelProps
const Label = renderComponent<LabelProps>(macro);

const meta = {
  component: Label,
  title: 'Typography/Label',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'A Label component to wrap label text and associate it with a form input element.',
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    content: {
      control: 'text',
      description: 'Text content of the label',
      type: { name: 'string', required: true },
    },
    for: {
      control: 'text',
      description: 'ID of the associated form input',
      type: { name: 'string', required: false },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Label size: small, medium, or large',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
  },
  args: {
    content: 'Label Text',
    size: 'md',
    for: 'input-id',
  },
};
