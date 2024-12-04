import type { Meta, StoryObj } from '@storybook/react';
import { ProgressStepper } from './progress-stepper.js';

const meta = {
  title: 'Navigation/ProgressStepper',
  component: ProgressStepper,
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    currentStepIndex: {
      control: 'number',
      type: { name: 'number', required: true },
      description: 'The initial active step (zero-based index).',
    },
  },
  args: {
    currentStepIndex: 1,
    onStepChange: (stepIndex: number) => console.log(stepIndex),
    steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
  },
};
