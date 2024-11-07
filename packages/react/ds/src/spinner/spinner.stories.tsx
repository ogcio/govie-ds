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
  decorators: [
    (Story) => (
      <div className="gi-stroke-gray-950">
        <Story />
      </div>
    ),
  ],
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <div className="gi-stroke-gray-950">
        <Story />
      </div>
    ),
  ],
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div className="gi-stroke-gray-950">
        <Story />
      </div>
    ),
  ],
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
  decorators: [
    (Story) => (
      <div className="gi-stroke-gray-950">
        <Story />
      </div>
    ),
  ],
};
