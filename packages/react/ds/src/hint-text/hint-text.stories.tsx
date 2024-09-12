import type { Meta, StoryObj } from '@storybook/react';
import { HintText } from './hint-text.js';

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
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLInputElement>' },
        defaultValue: { summary: '-' },
      },
    },
  },
  args: {
    children: 'Hint text',
  },
};
