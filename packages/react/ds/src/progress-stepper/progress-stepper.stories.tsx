import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button/button.js';
import {
  FormField,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { Heading } from '../heading/heading.js';
import { InputFile } from '../input-file/input-file.js';
import { InputText } from '../input-text/input-text.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Select, SelectItem } from '../select/select.js';
import { Stack } from '../stack/stack.js';
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
    className: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'Custom CSS classes for the stepper container',
    },
    verticalGap: {
      control: 'number',
      type: { name: 'number', required: false },
      description: 'Vertical spacing between steps. Default value is 14',
    },
    progression: {
      control: { type: 'radio' },
      options: ['linear', 'free'],
      description:
        'Navigation mode: linear (dependent) or free (independent). Default is "linear".',
    },
    stepStates: {
      control: 'object',
      description:
        'Free mode only: Array describing the state (completed/current/disabled) for each step.',
    },
  },
  args: {
    progression: 'linear',
    currentStepIndex: 1,
    children: [
      <StepItem key="default-step-1" label="Start Your Application" />,
      <StepItem key="default-step-2" label="Personal Information" />,
      <StepItem key="default-step-3" label="Eligibility Check" />,
      <StepItem key="default-step-4" label="Documents Submission" />,
      <StepItem key="default-step-5" label="Review" />,
      <StepItem key="default-step-6" label="Complete & Submit" />,
    ],
  },
};

export const Linear: Story = {
  args: {
    currentStepIndex: 1,
    indicator: 'number',
    children: [],
    progression: 'linear',
  },
  render: () => {
    return (
      <ProgressStepper>
        <StepItem key="linear-step-1" label="Step 1" />
        <StepItem key="linear-step-2" label="Step 2" />
        <StepItem key="linear-step-3" label="Step 3" />
      </ProgressStepper>
    );
  },
};

export const Free: Story = {
  args: {
    currentStepIndex: 1,
    indicator: 'number',
    children: [],
    progression: 'free',
  },
  render: () => {
    const stepStates = [
      { completed: false, disabled: false, current: false },
      { completed: false, disabled: false, current: false },
      { completed: false, disabled: false, current: false },
    ];

    return (
      <ProgressStepper stepStates={stepStates}>
        <StepItem key="free-step-1" label="Step 1" />
        <StepItem key="free-step-2" label="Step 2" />
        <StepItem key="free-step-3" label="Step 3" />
      </ProgressStepper>
    );
  },
};

export const WithNumbersIndicator: Story = {
  args: {
    currentStepIndex: 2,
    indicator: 'number',
    children: [
      <StepItem key="with-numbers-step-1" label="Start Your Application" />,
      <StepItem key="with-numbers-step-2" label="Personal Information" />,
      <StepItem key="with-numbers-step-3" label="Eligibility Check" />,
      <StepItem key="with-numbers-step-4" label="Documents Submission" />,
      <StepItem key="with-numbers-step-5" label="Review" />,
      <StepItem key="with-numbers-step-6" label="Complete & Submit" />,
    ],
  },
};

export const WithoutLabels: Story = {
  args: {
    currentStepIndex: 1,
    indicator: 'number',
    children: [],
  },
  render: () => {
    return (
      <ProgressStepper orientation="horizontal">
        <StepItem key="withoutlabels-step-1" ariaLabel="Step 1" />
        <StepItem key="withoutlabels-step-2" ariaLabel="Step 2" />
        <StepItem key="withoutlabels-step-3" ariaLabel="Step 3" />
        <StepItem key="withoutlabels-step-4" ariaLabel="Step 4" />
        <StepItem key="withoutlabels-step-5" ariaLabel="Step 5" />
      </ProgressStepper>
    );
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
      <Stack aria-label="Progress Stepper with Content">
        <ProgressStepper currentStepIndex={currentIndex}>
          <StepItem
            key="withstepcontent-start-your-application"
            label="Start Your Application"
          >
            <Stack gap={2} className="gi-pt-2">
              Begin your application by filling in basic details.
            </Stack>
          </StepItem>
          <StepItem
            key="withstepcontent-personal-information"
            label="Personal Information"
          >
            <Stack gap={2} className="gi-pt-2">
              Provide your personal information, such as name, age, etc.
            </Stack>
          </StepItem>
          <StepItem
            key="withstepcontent-eligibility-check"
            label="Eligibility Check"
          >
            <Stack gap={2} className="gi-pt-2">
              Ensure that you meet the eligibility criteria for the application.
            </Stack>
          </StepItem>
          <StepItem
            key="withstepcontent-documents-submission"
            label="Documents Submission"
          >
            <Stack gap={2} className="gi-pt-2">
              Upload all required documents to proceed with the application.
            </Stack>
          </StepItem>
          <StepItem key="withstepcontent-review" label="Review">
            <Stack gap={2} className="gi-pt-2">
              Review all the information you’ve provided before submitting.
            </Stack>
          </StepItem>
          <StepItem
            key="withstepcontent-complete-submit"
            label="Complete & Submit"
          >
            <Stack gap={2} className="gi-pt-2">
              Once everything is confirmed, submit your application.
            </Stack>
          </StepItem>
        </ProgressStepper>
        <Stack
          direction={'row'}
          gap={3}
          className="gi-pt-3"
          itemsDistribution="start"
          role="navigation"
        >
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
      <StepItem key="withverticalorientation-step-1" label="Step 1" />,
      <StepItem key="withverticalorientation-step-2" label="Step 2" />,
      <StepItem key="withverticalorientation-step-3" label="Step 3" />,
      <StepItem key="withverticalorientation-step-4" label="Step 4" />,
      <StepItem key="withverticalorientation-step-5" label="Step 5" />,
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
      <Stack
        direction="row"
        gap={3}
        className="gi-pt-5"
        itemsDistribution="start"
      >
        {currentIndex > 0 && (
          <Button variant="secondary" onClick={handlePreviousButton}>
            Previous
          </Button>
        )}
        {currentIndex < 5 && <Button onClick={handleNextButton}>Next</Button>}
      </Stack>
    );

    return (
      <Stack aria-label="Progress Stepper with Vertical Content">
        <ProgressStepper currentStepIndex={currentIndex} orientation="vertical">
          <StepItem key="withcontentstepvertical-step-1" label="Step 1">
            <Stack>Here are the content for Step 1</Stack>
          </StepItem>
          <StepItem key="withcontentstepvertical-step-2" label="Step 2">
            <Stack>Here are the content for Step 2</Stack>
          </StepItem>
          <StepItem key="withcontentstepvertical-step-3" label="Step 3">
            <Stack>Here are the content for Step 3</Stack>
          </StepItem>
          <StepItem key="withcontentstepvertical-step-4" label="Step 4">
            <Stack>Here are the content for Step 4</Stack>
          </StepItem>
          <StepItem key="withcontentstepvertical-step-5" label="Step 5">
            <Stack>Here are the content for Step 5</Stack>
          </StepItem>
          <StepItem key="withcontentstepvertical-step-6" label="Step 6">
            <Stack>Here are the content for Step 6</Stack>
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
      <Stack
        direction="row"
        gap={3}
        className="gi-pt-5"
        itemsDistribution="start"
      >
        {currentIndex > 0 && (
          <Button variant="secondary" onClick={handlePreviousButton}>
            Previous
          </Button>
        )}
        {currentIndex < 3 && <Button onClick={handleNextButton}>Next</Button>}
      </Stack>
    );

    return (
      <div
        className="gi-w-[500px]"
        aria-label="Progress Stepper with Form Content"
      >
        <Stack>
          <ProgressStepper
            currentStepIndex={currentIndex}
            orientation="vertical"
          >
            <StepItem
              key="withformcontentstepvertical-step-1"
              label="This step is for requesting information, this is the first step the user needs to finish."
              defaultOpen
            >
              <Stack gap={2}>
                <Heading size="sm">Category Details</Heading>
                <Paragraph>
                  Please select the options that best describes the query you’re
                  raising.
                </Paragraph>
                <FormField className="lg:gi-w-[450px] gi-w-full">
                  <FormFieldLabel htmlFor="category-select">
                    Category
                  </FormFieldLabel>
                  <Select id="category-select">
                    <SelectItem value="0">Select a Category</SelectItem>
                  </Select>
                </FormField>
                <FormField className="lg:gi-w-[450px] gi-w-full">
                  <FormFieldLabel htmlFor="customer-type-select">
                    Customer Type
                  </FormFieldLabel>
                  <Select id="customer-type-select">
                    <SelectItem value="0">Select a Customer Type</SelectItem>
                  </Select>
                </FormField>
                <FormField className="lg:gi-w-[450px] gi-w-full">
                  <FormFieldLabel htmlFor="related-topic-select">
                    Related Topic
                  </FormFieldLabel>
                  <Select id="related-topic-select">
                    <SelectItem value="0">Select a related topic</SelectItem>
                  </Select>
                </FormField>
              </Stack>
            </StepItem>
            <StepItem
              key="withformcontentstepvertical-step-2"
              label="Step 2"
              defaultOpen
            >
              <Stack gap={2}>
                <Heading size="sm">Query Details</Heading>
                <Paragraph>
                  If this query is about someone else, please provide their
                  details below. If it's about yourself, enter your own details.
                </Paragraph>
                <FormField className="lg:gi-w-[450px] gi-w-full">
                  <FormFieldLabel htmlFor="fullname-text-id">
                    Full name
                  </FormFieldLabel>
                  <InputText id="fullname-text-id" />
                </FormField>
                <FormField className="lg:gi-w-[450px] gi-w-full">
                  <FormFieldLabel htmlFor="pps-number-text-id">
                    PPS Number
                  </FormFieldLabel>
                  <InputText id="pps-number-text-id" />
                </FormField>
                <FormField className="lg:gi-w-[450px] gi-w-full">
                  <FormFieldLabel htmlFor="school-roll-number-text-id">
                    School Roll Number
                  </FormFieldLabel>
                  <FormFieldHint>
                    Don't know your school number? Find a school application.
                  </FormFieldHint>
                  <InputText id="school-roll-number-text-id" />
                </FormField>
                <FormField className="lg:gi-w-[450px] gi-w-full">
                  <FormFieldLabel htmlFor="description-text-id">
                    Describe your Query
                  </FormFieldLabel>
                  <FormFieldHint>(Max 1'000 words)</FormFieldHint>
                  <TextArea cols={100} id="description-text-id" rows={4} />
                </FormField>
                <FormField>
                  <FormFieldLabel htmlFor="file-upload-id">
                    Document Upload
                  </FormFieldLabel>
                  <FormFieldHint>
                    .jpg, .rtf, .txt, .doc,. docx and .pdf files are accepted.
                    Looking for an application form? Find a form here.
                  </FormFieldHint>
                  <InputFile accept="*/*" id="file-upload-id" />
                </FormField>
              </Stack>
            </StepItem>
            <StepItem key="withformcontentstepvertical-step-3" defaultOpen>
              <Stack gap={2}>
                <Heading size="sm">Contact Details</Heading>
                <Paragraph>
                  Where should we send updates about this query? Enter your
                  contact details or the details of someone else who should
                  receive the updates.
                </Paragraph>
                <FormField className="lg:gi-w-[450px] gi-w-full">
                  <FormFieldLabel htmlFor="contact-fullname-text-id">
                    Full name
                  </FormFieldLabel>
                  <FormFieldHint>
                    (to be used for communications relating to this query)
                  </FormFieldHint>
                  <InputText id="contact-fullname-text-id" />
                </FormField>
                <FormField className="lg:gi-w-[450px] gi-w-full">
                  <FormFieldLabel htmlFor="phone-number-text-id">
                    Phone Number
                  </FormFieldLabel>
                  <FormFieldHint>
                    (to be used for communications relating to this query)
                  </FormFieldHint>
                  <InputText id="phone-number-text-id" />
                </FormField>
                <FormField className="lg:gi-w-[450px] gi-w-full">
                  <FormFieldLabel htmlFor="email-text-id">
                    Email Address
                  </FormFieldLabel>
                  <FormFieldHint>
                    (to be used for communications relating to this query)
                  </FormFieldHint>
                  <InputText id="email-text-id" />
                </FormField>
              </Stack>
            </StepItem>
          </ProgressStepper>
          <PreviousNextContainerVertical />
        </Stack>
      </div>
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

export const WithVerticalLongText: Story = {
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
      <StepItem
        key="withverticallongtext-step-1"
        label="This step is for requesting information, this is a long step the user needs to finish."
      />,
      <StepItem
        key="withverticallongtext-step-2"
        label="This step is for requesting information, this is a long step the user needs to finish."
      />,
      <StepItem
        key="withverticallongtext-step-3"
        label="This step is for requesting information, this is a long step the user needs to finish."
      />,
      <StepItem
        key="withverticallongtext-step-4"
        label="This step is for requesting information, this is a long step the user needs to finish."
      />,
      <StepItem
        key="withverticallongtext-step-5"
        label="This step is for requesting information, this is a long step the user needs to finish."
      />,
    ],
    orientation: 'vertical',
  },
};

export const WithCustomVerticalGap: Story = {
  args: {
    currentStepIndex: 1,
    children: [
      <StepItem key="withcustomverticalgap-step-1" label="Step 1" />,
      <StepItem key="withcustomverticalgap-step-2" label="Step 2" />,
      <StepItem key="withcustomverticalgap-step-3" label="Step 3" />,
      <StepItem key="withcustomverticalgap-step-4" label="Step 4" />,
      <StepItem key="withcustomverticalgap-step-5" label="Step 5" />,
    ],
    orientation: 'vertical',
    verticalGap: 8,
  },
};
