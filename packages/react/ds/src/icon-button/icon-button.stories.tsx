import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../icon/icon.js';
import { IconButton } from './icon-button.js';

const meta = {
  title: 'IconButton',
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    icon: <Icon id="thumbs-up" size="sm" />,
    ariaLabel: 'Thumbs up',
  },
};

export const Default: Story = {
  args: {
    icon: <Icon id="thumbs-up" />,
    ariaLabel: 'Thumbs up',
  },
};

export const Large: Story = {
  args: {
    icon: <Icon id="thumbs-up" size="lg" />,
    ariaLabel: 'Thumbs up',
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: <Icon id="thumbs-up" size="xl" />,
    ariaLabel: 'Thumbs up',
  },
};

export const Disabled: Story = {
  args: {
    icon: <Icon id="thumbs-up" />,
    ariaLabel: 'Thumbs up',
    disabled: true,
  },
};
