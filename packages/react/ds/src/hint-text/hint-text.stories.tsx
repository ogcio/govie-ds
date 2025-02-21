import type { Meta, StoryObj } from '@storybook/react';
import { HintSize, HintText } from './hint-text.js';

const meta = {
  title: 'Form/HintText',
  parameters: {
    docs: {
      description: {
        component:
          'Use hint text alongside a form input for help that’s relevant to the majority of users, like how their information will be used, or where to find it.',
      },
    },
  },
  component: HintText,
} satisfies Meta<typeof HintText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(HintSize),
      table: {
        category: 'Appearance',
        type: { summary: 'Size of label' },
        defaultValue: { summary: HintSize.Medium },
      },
    },
    text: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'text of hint' },
        defaultValue: { summary: 'Hint' },
      },
    },
  },
  args: {
    text: 'Hint',
    size: HintSize.Medium,
  },
};
