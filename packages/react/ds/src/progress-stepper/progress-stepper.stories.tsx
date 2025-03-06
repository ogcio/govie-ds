import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button/button.js';
import { FileUpload } from '../file-upload/file-upload.js';
import { FormField } from '../forms/form-field.js';
import { Heading } from '../heading/heading.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Select, SelectItem } from '../select/select.js';
import { Stack } from '../stack/stack.js';
import { TextInput } from '../text-input/text-input.js';
import { TextArea } from '../textarea/textarea.js';
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
      <Stack>
        <ProgressStepper currentStepIndex={currentIndex}>
          <StepItem label="Start Your Application">
            <Stack gap={2} className="gi-pt-2">
              Begin your application by filling in basic details.
            </Stack>
          </StepItem>
          <StepItem label="Personal Information">
            <Stack gap={2} className="gi-pt-2">
              Provide your personal information, such as name, age, etc.
            </Stack>
          </StepItem>
          <StepItem label="Eligibility Check">
            <Stack gap={2} className="gi-pt-2">
              Ensure that you meet the eligibility criteria for the application.
            </Stack>
          </StepItem>
          <StepItem label="Documents Submission">
            <Stack gap={2} className="gi-pt-2">
              Upload all required documents to proceed with the application.
            </Stack>
          </StepItem>
          <StepItem label="Review">
            <Stack gap={2} className="gi-pt-2">
              Review all the information you’ve provided before submitting.
            </Stack>
          </StepItem>
          <StepItem label="Complete & Submit">
            <Stack gap={2} className="gi-pt-2">
              Once everything is confirmed, submit your application.
            </Stack>
          </StepItem>
        </ProgressStepper>
        <Stack direction={'row'} gap={3} className="gi-pt-3">
          {currentIndex > 0 && (
            <Button variant="secondary" onClick={handlePreviousButton}>
              Previous
            </Button>
          )}
          {currentIndex < 5 && <Button onClick={handleNextButton}>Next</Button>}
        </Stack>
      </Stack>
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

export const WithContentStepVertical: Story = {
  args: {
    children: [],
  },
  render: () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleNextButton = () => setCurrentIndex(() => currentIndex + 1);
    const handlePreviousButton = () => setCurrentIndex(() => currentIndex - 1);
    const PreviousNextContainerVertical = () => (
      <Stack direction="row" gap={3} className="gi-pt-5">
        {currentIndex > 0 && (
          <Button variant="secondary" onClick={handlePreviousButton}>
            Previous
          </Button>
        )}
        {currentIndex < 5 && <Button onClick={handleNextButton}>Next</Button>}
      </Stack>
    );

    return (
      <Stack>
        <ProgressStepper currentStepIndex={currentIndex} orientation="vertical">
          <StepItem label="Start Your Application">
            <Stack gap={2} className="gi-mt-5">
              Begin your application by filling in basic details.
            </Stack>
          </StepItem>
          <StepItem label="Personal Information">
            <Stack gap={2} className="gi-mt-5">
              Provide your personal information, such as name, age, etc.
            </Stack>
          </StepItem>
          <StepItem label="Eligibility Check">
            <Stack gap={2} className="gi-mt-5">
              Ensure that you meet the eligibility criteria for the application.
            </Stack>
          </StepItem>
          <StepItem label="Documents Submission">
            <Stack gap={2} className="gi-mt-5">
              Upload all required documents to proceed with the application.
            </Stack>
          </StepItem>
          <StepItem label="Review">
            <Stack gap={2}>
              Review all the information you’ve provided before submitting.
            </Stack>
          </StepItem>
          <StepItem label="Complete & Submit">
            <Stack gap={2} className="gi-mt-5">
              Once everything is confirmed, submit your application.
            </Stack>
          </StepItem>
        </ProgressStepper>
        <PreviousNextContainerVertical />
      </Stack>
    );
  },
};

export const WithFormContentStepVertical: Story = {
  args: {
    children: [],
  },
  render: () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleNextButton = () => setCurrentIndex(() => currentIndex + 1);
    const handlePreviousButton = () => setCurrentIndex(() => currentIndex - 1);
    const PreviousNextContainerVertical = () => (
      <Stack direction="row" gap={3} className="gi-pt-5">
        {currentIndex > 0 && (
          <Button variant="secondary" onClick={handlePreviousButton}>
            Previous
          </Button>
        )}
        {currentIndex < 3 && <Button onClick={handleNextButton}>Next</Button>}
      </Stack>
    );

    return (
      <Stack>
        <ProgressStepper currentStepIndex={currentIndex} orientation="vertical">
          <StepItem label="Step 1" defaultOpen>
            <Stack gap={2}>
              <Heading size="sm">Category Details</Heading>
              <Paragraph>
                Please select the options that best describes the query you’re
                raising.
              </Paragraph>
              <FormField
                className="gi-w-[450px]"
                label={{
                  text: 'Category',
                }}
              >
                <Select aria-label="Select Category">
                  <SelectItem value="0">Select a Category</SelectItem>
                </Select>
              </FormField>
              <FormField
                className="gi-w-[450px]"
                label={{
                  text: 'Customer Type',
                }}
              >
                <Select aria-label="Select Customer Type">
                  <SelectItem value="0">Select a Customer Type</SelectItem>
                </Select>
              </FormField>
              <FormField
                className="gi-w-[450px]"
                label={{
                  text: 'Related Topic',
                }}
              >
                <Select aria-label="Select Related Topic">
                  <SelectItem value="0">Select a related topic</SelectItem>
                </Select>
              </FormField>
            </Stack>
          </StepItem>
          <StepItem label="Step 2" defaultOpen>
            <Stack gap={2}>
              <Heading size="sm">Query Details</Heading>
              <Paragraph>
                If this query is about someone else, please provide their
                details below. If it's about yourself, enter your own details.
              </Paragraph>
              <FormField
                className="gi-w-[450px]"
                label={{
                  htmlFor: 'fullname-text-id',
                  text: 'Full name',
                }}
              >
                <TextInput id="fullname-text-id" />
              </FormField>
              <FormField
                className="gi-w-[450px]"
                label={{
                  htmlFor: 'pps-number-text-id',
                  text: 'PPS Number',
                }}
              >
                <TextInput id="pps-number-text-id" />
              </FormField>
              <FormField
                className="gi-w-[450px]"
                hint={{
                  text: `Don't know your school number? Find a school application.`,
                }}
                label={{
                  htmlFor: 'school-roll-number-text-id',
                  text: 'School Roll Number',
                }}
              >
                <TextInput id="school-roll-number-text-id" />
              </FormField>
              <FormField
                className="gi-w-[450px]"
                hint={{
                  text: `(Max 1'000 words)`,
                }}
                label={{
                  htmlFor: 'description-text-id',
                  text: 'Describe your Query',
                }}
              >
                <TextArea cols={100} id="description-text-id" rows={4} />
              </FormField>
              <FormField
                hint={{
                  text: '.jpg, .rtf, .txt, .doc,. docx and .pdf files are accepted. Looking for an application form? Find a form here.',
                }}
                label={{
                  htmlFor: 'file-upload-id',
                  text: 'Document Upload',
                }}
              >
                <FileUpload accept="*/*" id="file-upload-id" />
              </FormField>
            </Stack>
          </StepItem>
          <StepItem label="Step 3" defaultOpen>
            <Stack gap={2}>
              <Heading size="sm">Contact Details</Heading>
              <Paragraph>
                Where should we send updates about this query? Enter your
                contact details or the details of someone else who should
                receive the updates.
              </Paragraph>
              <FormField
                className="gi-w-[450px]"
                hint={{
                  text: '(to be used for communications relating to this query)',
                }}
                label={{
                  htmlFor: 'contact-fullname-text-id',
                  text: 'Full name',
                }}
              >
                <TextInput id="contact-fullname-text-id" />
              </FormField>
              <FormField
                className="gi-w-[450px]"
                hint={{
                  text: '(to be used for communications relating to this query)',
                }}
                label={{
                  htmlFor: 'phone-number-text-id',
                  text: 'Phone Number Number',
                }}
              >
                <TextInput id="phone-number-text-id" />
              </FormField>
              <FormField
                className="gi-w-[450px]"
                hint={{
                  text: '(to be used for communications relating to this query)',
                }}
                label={{
                  htmlFor: 'email-text-id',
                  text: 'Email Address',
                }}
              >
                <TextInput id="email-number-text-id" />
              </FormField>
            </Stack>
          </StepItem>
        </ProgressStepper>
        <PreviousNextContainerVertical />
      </Stack>
    );
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
