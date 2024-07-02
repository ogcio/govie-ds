import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../icon/icon.js';
import { IconButton } from './icon-button.js';

const meta = {
  title: 'IconButton',
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Icon id="thumbs-up" />,
    ariaLabel: 'Thumbs up',
  },
};
