import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon.js';

const meta = {
  title: 'components/Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    icon: 'thumb_up',
    size: 'sm',
  },
};

export const Default: Story = {
  args: {
    icon: 'thumb_up',
  },
};

export const Large: Story = {
  args: {
    icon: 'thumb_up',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: 'thumb_up',
    size: 'xl',
  },
};

export const Outlined: Story = {
  args: {
    icon: 'thumb_up',
    variant: 'outlined',
  },
};

export const AriaHidden: Story = {
  args: {
    icon: 'thumb_up',
    ariaHidden: true,
  },
};

export const AriaLabel: Story = {
  args: {
    icon: 'thumb_up',
    ariaLabel: 'Thumbs up',
  },
};
