import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './progress-bar.html?raw';
import { ProgressBarProps } from './progress-bar.schema';

const macro = { name: 'govieProgressBar', html };

const ProgressBar = renderComponent<ProgressBarProps>(macro);

const meta = {
  component: ProgressBar,
  title: 'Components/ProgressBar',
  parameters: {
    macro,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    value: {
      control: 'number',
      type: { name: 'number', required: false },
      description: 'The current value of the progress bar.',
    },
    max: {
      control: 'number',
      type: { name: 'number', required: false },
      description: 'The final value of the progress bar.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      type: { name: 'string', required: false },
      description: 'The size of the progress bar.',
    },
    isIndeterminate: {
      control: 'boolean',
      type: { name: 'boolean', required: false },
      description: 'Set infinite progress for the progress bar.',
    },
    label: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'Set custom label for the progress bar.',
    },
  },
  args: {
    value: 50,
    max: 100,
    size: 'sm',
  },
};

export const WithLabelIndeterminate: Story = {
  args: {
    isIndeterminate: true,
    label: 'Loading...',
    size: 'sm',
  },
};

export const Completed = {
  args: {
    value: 100,
  },
};
