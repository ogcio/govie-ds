import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './progress-bar.js';

const meta = {
  title: 'indicators/ProgressBar',
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
    label: 'Label',
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
