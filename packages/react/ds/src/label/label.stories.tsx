import type { Meta, StoryObj } from '@storybook/react';
import { Label, LabelSize } from './label.js';

const meta = {
  title: 'Typography/Label',
  parameters: {
    docs: {
      description: {
        component:
          'A Label component to wrap label text and associate it with a form input element.',
      },
    },
  },
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    text: {
      control: 'text',
      description: 'Text content of the label',
      table: {
        category: 'Content',
        type: { summary: 'text for label' },
        defaultValue: { summary: 'Label' },
      },
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form input',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    size: {
      control: 'radio',
      options: Object.values(LabelSize),
      description: 'Label size: small, medium, or large',
      table: {
        category: 'Appearance',
        type: { summary: 'Size of label' },
        defaultValue: { summary: LabelSize.MEDIUM },
      },
    },
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLLabelElement>' },
        defaultValue: { summary: '-' },
      },
    },
  },
  args: {
    htmlFor: 'input-id',
    size: LabelSize.MEDIUM,
    text: 'Label',
  },
};
