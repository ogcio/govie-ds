import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner.js';

const meta = {
  title: 'indicators/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Specify the size of the icon',
    },
    inline: {
      control: 'boolean',
      description: 'View the icon as inline',
    },
  },
  args: {
    inline: false,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
};
