import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './tabs';

const meta = {
  title: 'Common/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      {
        id: 'general',
        title: 'General',
        href: '#',
      },
      {
        id: 'design',
        title: 'Design',
        href: '#',
      },
      {
        id: 'components',
        title: 'Components',
        href: '#',
      },
    ],
  },
};

export const Current: Story = {
  args: {
    ...Default.args,
    current: 'design',
  },
};
