import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button/button.js';
import { Stack } from '../stack/stack.js';
import { ProgressStepper, StepItem } from './progress-stepper.js';

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
    children: [
      <StepItem label="Start Your Application" />,
      <StepItem label="Personal Information" />,
      <StepItem label="Eligibility Check" />,
      <StepItem label="Documents Submission" />,
      <StepItem label="Review" />,
      <StepItem label="Complete & Submit" />,
    ],
  },
};

export const WithStepContent: Story = {
  args: {
    children: [],
  },
  render: () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleNextButton = () => setCurrentIndex(() => currentIndex + 1);
    const handlePreviousButton = () => setCurrentIndex(() => currentIndex - 1);

    return (
      <ProgressStepper currentStepIndex={currentIndex}>
        <StepItem label="Start Your Application">
          <Stack gap={2} className="gi-pt-2">
            Begin your application by filling in basic details.
            <Button onClick={handleNextButton}>Next</Button>
          </Stack>
        </StepItem>
        <StepItem label="Personal Information">
          <Stack gap={2} className="gi-pt-2">
            Provide your personal information, such as name, age, etc.
            <Stack direction={'row'} gap={3}>
              <Button variant="secondary" onClick={handlePreviousButton}>
                Previous
              </Button>
              <Button onClick={handleNextButton}>Next</Button>
            </Stack>
          </Stack>
        </StepItem>
        <StepItem label="Eligibility Check">
          <Stack gap={2} className="gi-pt-2">
            Ensure that you meet the eligibility criteria for the application.
            <Stack direction={'row'} gap={3}>
              <Button variant="secondary" onClick={handlePreviousButton}>
                Previous
              </Button>
              <Button onClick={handleNextButton}>Next</Button>
            </Stack>
          </Stack>
        </StepItem>
        <StepItem label="Documents Submission">
          <Stack gap={2} className="gi-pt-2">
            Upload all required documents to proceed with the application.
            <Stack direction={'row'} gap={3}>
              <Button variant="secondary" onClick={handlePreviousButton}>
                Previous
              </Button>
              <Button onClick={handleNextButton}>Next</Button>
            </Stack>
          </Stack>
        </StepItem>
        <StepItem label="Review">
          <Stack gap={2} className="gi-pt-2">
            Review all the information you’ve provided before submitting.
            <Stack direction={'row'} gap={3}>
              <Button variant="secondary" onClick={handlePreviousButton}>
                Previous
              </Button>
              <Button onClick={handleNextButton}>Next</Button>
            </Stack>
          </Stack>
        </StepItem>
        <StepItem label="Complete & Submit">
          <Stack gap={2} className="gi-pt-2">
            Once everything is confirmed, submit your application.
            <Stack direction={'row'} gap={3}>
              <Button variant="secondary" onClick={handlePreviousButton}>
                Previous
              </Button>
            </Stack>
          </Stack>
        </StepItem>
      </ProgressStepper>
    );
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
    children: [
      <StepItem label="Step 1" />,
      <StepItem label="Step 2" />,
      <StepItem label="Step 3" />,
      <StepItem label="Step 4" />,
      <StepItem label="Step 5" />,
    ],
    orientation: 'vertical',
  },
};

export const WithLongText: Story = {
  args: {
    currentStepIndex: 1,
    children: [
      <StepItem
        key="step-1"
        label="This step is for requesting information, this is the first step the user needs to finish."
      />,
      <StepItem
        key="step-2"
        label="This step is for requesting documentation, this second step the user needs to finish."
      />,
      <StepItem key="step-3" label="This step is for analysis." />,
      <StepItem key="step-4" label="This is a long step text." />,
    ],
  },
};
