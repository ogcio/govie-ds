import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './progress-bar.js';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    value: {
      type: { name: 'number' },
      description: 'The current value of the progress bar.',
    },
    max: {
      type: { name: 'number' },
      description: 'The max value of the progress bar.',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      type: { name: 'string' },
      description: 'The size of the progress bar.',
    },
    color: {
      control: { type: 'select' },
      options: ['blue', 'green'],
      type: { name: 'string' },
      description: 'The color of the progress bar.',
    },
    isIndeterminate: {
      type: { name: 'boolean' },
      description: 'Set infinite progress for the progress bar',
    },
    label: {
      type: { name: 'string' },
      description: 'Set custom label for the progress bars',
    },
  },
  args: {
    value: 50,
    size: 'sm',
  },
};

export const WithLabelIndeterminate = {
  args: {
    isIndeterminate: true,
    label: 'Loading...',
  },
};

export const Completed = {
  args: {
    value: 100,
  },
};
