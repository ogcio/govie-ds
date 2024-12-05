import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './progress-stepper.html?raw';
import { ProgressStepperProps } from './progress-stepper.schema';

const path = import.meta.url.split('/progress-stepper')[0];

const macro = { name: 'govieProgressStepper', html, path };

const ProgressStepper = renderComponent<ProgressStepperProps>(macro);

const meta = {
  component: ProgressStepper,
  title: 'Navigation/ProgressStepper',
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
  },
  args: {
    steps: ['Step 1', 'Step 2', 'Step 3'],
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
