import type { Meta, StoryObj } from '@storybook/react';
import { Label, LabelSize } from './label.js';

const meta = {
  title: 'Typography/Label',
  parameters: {
    docs: {
      description: {
        component: 'Label element to wrap label-text and a form input.',
      },
    },
  },
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLLabelElement>' },
        defaultValue: { summary: '-' },
      },
    },
    size: {
      control: 'radio',
      options: Object.values(LabelSize),
      table: {
        category: 'Appearance',
        type: { summary: 'Size of label' },
        defaultValue: { summary: LabelSize.md },
      },
    },
    htmlFor: {
      control: 'text',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    children: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Label' },
      },
    },
  },
  args: {
    htmlFor: 'input-id',
    size: LabelSize.md,
    children: 'Label',
  },
};
