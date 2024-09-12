import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Icon } from '../icon/icon.js';
import { IconButton } from './icon-button.js';

const meta = {
  title: 'components/IconButton',
  component: IconButton,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    icon: <Icon icon="thumb_up" size="sm" />,
    ariaLabel: 'Thumbs up',
  },
};

export const Default: Story = {
  args: {
    icon: <Icon icon="thumb_up" />,
    ariaLabel: 'Thumbs up',
  },
};

export const Large: Story = {
  args: {
    icon: <Icon icon="thumb_up" size="lg" />,
    ariaLabel: 'Thumbs up',
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: <Icon id="send" size="xl" />,
    ariaLabel: 'Thumbs up',
  },
};

export const Solid: Story = {
  args: {
    icon: <Icon icon="thumb_up" solid />,
    ariaLabel: 'Thumbs up',
  },
};

export const Disabled: Story = {
  args: {
    icon: <Icon icon="thumb_up" />,
    ariaLabel: 'Thumbs up',
    disabled: true,
  },
};
