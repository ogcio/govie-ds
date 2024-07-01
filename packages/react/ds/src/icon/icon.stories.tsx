import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon.js';

const meta = {
  title: 'Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    id: 'thumbs-up',
    size: 'sm',
  },
};

export const Default: Story = {
  args: {
    id: 'thumbs-up',
  },
};

export const Large: Story = {
  args: {
    id: 'thumbs-up',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    id: 'thumbs-up',
    size: 'xl',
  },
};
