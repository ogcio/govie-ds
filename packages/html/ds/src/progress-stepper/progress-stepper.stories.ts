import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ProgressStepperProps } from './types';
import { createIcon } from '../helpers/icons';

const meta: Meta<ProgressStepperProps> = {
  title: 'Application/ProgressStepper',
};

export default meta;
type Story = StoryObj<ProgressStepperProps>;

const createProgressBar = (arguments_: ProgressStepperProps) => {
  const currentStep = arguments_.currentStepIndex || 0;
  const slot = arguments_.children[currentStep]?.content;
  const showHorizontalSlot = arguments_.orientation === 'horizontal' && slot;

  const progressStepperContainer = document.createElement('div');
  progressStepperContainer.className = `gi-w-full ${arguments_.orientation === 'vertical' ? 'gi-flex' : ''}`;

  const progressStepper = document.createElement('div');
  progressStepperContainer.append(progressStepper);
  progressStepper.dataset.testid = 'progress-stepper';
  progressStepper.dataset.orientation = arguments_.orientation;
  progressStepper.role = 'list';
  progressStepper.ariaLive = 'polite';
  progressStepper.className = 'gi-progress-stepper';

  for (let index = 0; index < arguments_.children.length; index++) {
    const stepItem = arguments_.children[index];

    const isCurrentStep = !arguments_.completeAll && currentStep === index;
    const isLastStep = index === arguments_.children.length - 1;
    const isCompleted =
      arguments_.completeAll || (index < currentStep && index !== currentStep);
    const isNextStep = !isCompleted && !isCurrentStep;
    const stepWrapper = document.createElement('div');
    progressStepper.append(stepWrapper);

    stepWrapper.className = 'gi-w-full';
    const stepNumber = index + 1;

    const div = document.createElement('div');
    stepWrapper.append(div);
    div.className = 'gi-relative';

    const stepContainer = document.createElement('div');
    div.append(stepContainer);
    stepContainer.className = 'gi-progress-stepper-step-container';
    stepContainer.dataset.orientation = arguments_.orientation;
    stepContainer.dataset.current = isCurrentStep.toString();
    stepContainer.dataset.completed = isCompleted.toString();
    stepContainer.dataset.next = isNextStep.toString();
    stepContainer.role = 'listitem';

    const indicator = document.createElement('div');
    stepContainer.append(indicator);
    indicator.className = 'gi-progress-stepper-step';

    if (isCompleted) {
      const icon = createIcon({ icon: 'check' });
      indicator.append(icon);
    } else {
      indicator.textContent = stepNumber.toString();
    }

    const stepLabel = document.createElement('div');
    stepContainer.append(stepLabel);
    stepLabel.className = 'gi-progress-stepper-step-label';
    stepLabel.dataset.orientation = arguments_.orientation;
    stepLabel.id = `step-label-${stepNumber}`;
    stepLabel.textContent = stepItem.label;

    if (!isLastStep) {
      const connector = document.createElement('div');
      div.append(connector);
      connector.dataset.orientation = arguments_.orientation;
      connector.dataset.current = isCurrentStep.toString();
      connector.dataset.completed = isCompleted.toString();
      connector.dataset.next = isNextStep.toString();
      connector.ariaHidden = 'true';
      connector.className = 'gi-progress-stepper-step-connector';

      const span = document.createElement('span');
      connector.append(span);
      if (isCurrentStep) {
        const span = document.createElement('span');
        connector.append(span);
      }
    }
  }

  if (showHorizontalSlot) {
    const horizontalStepSlot = document.createElement('div');
    horizontalStepSlot.className = 'gi-h-full';
    horizontalStepSlot.dataset.testid = `horizontal-step-slot-${currentStep}`;
    horizontalStepSlot.textContent = slot;
    progressStepperContainer.append(horizontalStepSlot);
  }
  return progressStepperContainer;
};

const createElement = (arguments_: ProgressStepperProps) => {
  const component = createProgressBar(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
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

export const Vertical: Story = {
  args: {
    currentStepIndex: 1,
    orientation: 'vertical',
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
