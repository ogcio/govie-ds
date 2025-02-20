import type { Meta, StoryObj } from '@storybook/react';
import { ErrorSize, ErrorText } from './error-text.js';

const meta = {
  title: 'Form/ErrorText',
  parameters: {
    docs: {
      description: {
        component:
          'Use hint text alongside a form input for help that’s relevant to the majority of users, like how their information will be used, or where to find it.',
      },
    },
  },
  component: ErrorText,
} satisfies Meta<typeof ErrorText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(ErrorSize),
      table: {
        category: 'Appearance',
        type: { summary: 'Size of label' },
        defaultValue: { summary: ErrorSize.MEDIUM },
      },
    },
    text: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'Text of error' },
        defaultValue: { summary: 'Error' },
      },
    },
  },
  args: {
    text: 'Error',
    size: ErrorSize.MEDIUM,
  },
};
