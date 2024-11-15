import type { Meta, StoryObj } from '@storybook/react';
import Toast from './toast.js';

const meta = {
  title: 'Application/Toast',
  parameters: {
    docs: {
      description: {
        component: 'Toast component',
      },
    },
  },
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
