import type { Meta, StoryObj } from '@storybook/react';
import { ProgressStepper } from './progress-stepper.js';

const meta = {
  title: 'Application/ProgressStepper',
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
    completeAll: {
      type: { name: 'boolean', required: false },
      description: 'Complete all steps',
    },
  },
  args: {
    currentStepIndex: 1,
    steps: [
      'Start Your Application',
      'Personal Information',
      'Eligibility Check',
      'Documents Submission',
      'Review Your Application',
      'Complete & Submit',
    ],
  },
};

export const WithVerticalOrientation: Story = {
  argTypes: {
    currentStepIndex: {
      control: 'number',
      type: { name: 'number', required: true },
      description: 'The initial active step (zero-based index).',
    },
  },
  args: {
    currentStepIndex: 1,
    steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
    orientation: 'vertical',
  },
};

export const WithLongText: Story = {
  args: {
    currentStepIndex: 1,
    steps: [
      'This step is for requesting information, this is the first step the user needs to finish.',
      'This step is for requesting documentation, this second step the user needs to finish.',
      'This step is for analysis.',
      'This is a long step text.',
    ],
  },
};
