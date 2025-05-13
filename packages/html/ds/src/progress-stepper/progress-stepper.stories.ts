import type { Meta, StoryObj } from '@storybook/react';
import { createProgressStepper } from '../helpers/progress-stepper';
import { beautifyHtmlNode } from '../storybook/storybook';
import { formSlot1, formSlot2, formSlot3 } from './progress-stepper.content';
import { ProgressStepperProps } from './types';

const meta: Meta<ProgressStepperProps> = {
  title: 'Application/ProgressStepper',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ProgressStepperProps>;

const createElement = (arguments_: ProgressStepperProps) => {
  const component = createProgressStepper(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  argTypes: {
    currentStepIndex: {
      control: 'number',
      type: { name: 'number', required: false },
      description: 'The initial active step (zero-based index).',
      defaultValue: 0,
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      type: { name: 'string', required: false },
      description: 'Orientation of the stepper',
      defaultValue: 'horizontal',
    },
    completeAll: {
      control: 'boolean',
      type: { name: 'boolean', required: false },
      description: 'Complete all steps regardless of progress',
      defaultValue: false,
    },
    dataTestId: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'Custom data-testid for test selectors',
    },
    indicator: {
      control: { type: 'select' },
      options: ['number', 'hashtag'],
      type: { name: 'string', required: false },
      description: 'Indicator style for steps (number or hashtag)',
      defaultValue: 'hashtag',
    },
  },
  args: {
    currentStepIndex: 1,
    children: [
      { label: 'Start Your Application' },
      { label: 'Personal Information' },
      { label: 'Eligibility Check' },
      { label: 'Documents Submission' },
      { label: 'Review' },
      { label: 'Complete & Submit' },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithNumbersIndicator: Story = {
  args: {
    currentStepIndex: 2,
    indicator: 'number',
    children: [
      { label: 'Start Your Application' },
      { label: 'Personal Information' },
      { label: 'Eligibility Check' },
      { label: 'Documents Submission' },
      { label: 'Review' },
      { label: 'Complete & Submit' },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithoutLabels: Story = {
  args: {
    currentStepIndex: 2,
    indicator: 'number',
    children: [
      { label: '' },
      { label: '' },
      { label: '' },
      { label: '' },
      { label: '' },
      { label: '' },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithStepContent: Story = {
  args: {
    currentStepIndex: 1,
    orientation: 'vertical',
    children: [
      {
        label:
          'This step is for requesting information, this is the first step the user needs to finish',
        content: formSlot1,
        defaultOpen: true,
      },
      {
        label: 'Step 2',
        content: formSlot2,
        defaultOpen: true,
      },
      {
        label: 'Step 3',
        content: formSlot3,
        defaultOpen: true,
      },
    ],
  },
  render: (arguments_) => {
    const div = document.createElement('div');
    div.className = 'gi-w-[500px] aaaa';
    div.append(createProgressStepper(arguments_));
    return beautifyHtmlNode(div);
  },
};

export const WithLongText: Story = {
  args: {
    currentStepIndex: 1,
    children: [
      {
        label:
          'This step is for requesting information, this is the first step the user needs to finish.',
      },
      {
        label:
          'This step is for requesting documentation, this second step the user needs to finish.',
      },
      { label: 'This step is for analysis.' },
      { label: 'This is a long step text.' },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithVerticalLongText: Story = {
  args: {
    currentStepIndex: 1,
    orientation: 'vertical',
    children: [
      {
        label:
          'This step is for requesting information, this is a long step the user needs to finish.',
      },
      {
        label:
          'This step is for requesting information, this is a long step the user needs to finish.',
      },
      {
        label:
          'This step is for requesting information, this is a long step the user needs to finish.',
      },
      {
        label:
          'This step is for requesting information, this is a long step the user needs to finish.',
      },
      {
        label:
          'This step is for requesting information, this is a long step the user needs to finish.',
      },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};
