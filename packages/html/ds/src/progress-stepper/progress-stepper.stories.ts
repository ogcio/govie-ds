import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './progress-stepper.html?raw';
import { ProgressStepperProps } from './progress-stepper.schema';

const path = import.meta.url.split('/progress-stepper')[0];

const macro = { name: 'govieProgressStepper', html, path };

const ProgressStepper = renderComponent<ProgressStepperProps>(macro);

const meta = {
  component: ProgressStepper,
  title: 'Application/ProgressStepper',
  parameters: {
    macro,
  },
} satisfies Meta<typeof ProgressStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    steps: {
      description: 'Array of step labels.',
    },
    currentStepIndex: {
      control: 'number',
      type: { name: 'number', required: true },
      description: 'Index of the currently active step (zero-based).',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      type: { name: 'string', required: false },
      description: 'Orientation of the progress stepper.',
    },
    completeAll: {
      type: { name: 'boolean', required: false },
      description: 'Complete all steps',
    },
  },
  args: {
    steps: [
      'Step 1',
      'Step 2',
      'Step 3',
      'Step 4',
      'Step 5',
      'Step 6',
      'Step 7',
    ],
    currentStepIndex: 1,
    orientation: 'horizontal',
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
