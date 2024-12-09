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
      control: { type: 'range', min: 0, max: 100 },
      type: { name: 'number', required: true },
      description: 'The progress value as a percentage (0 to 100).',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      type: { name: 'string', required: false },
      description: 'The size of the progress bar.',
    },
    color: {
      control: { type: 'select' },
      options: ['blue', 'gray', 'green'],
      type: { name: 'string', required: false },
      description: 'The color of the progress bar.',
    },
  },
  args: {
    value: 50,
    size: 'md',
    color: 'blue',
  },
};
