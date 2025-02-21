import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './list-item.js';

const meta = {
  title: 'Components/ListItem',
  component: ListItem,
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    label: {
      type: { name: 'string' },
      description: 'Set item label',
    },
  },
  args: {
    label: 'Item 0',
  },
};
