import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { within, expect } from 'storybook/test';
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
    stepStates: {
      control: 'object',
      description:
        'Array describing the state (completed/current/disabled) for each step.',
    },
  },
  args: {
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should render a horizontal progress stepper correctly',
      async () => {
        const stepperElement = canvas.getByTestId('progress-stepper');
        const stepElements = [
          ...stepperElement.querySelectorAll(
            '.gi-progress-stepper-step-container',
          ),
        ] as HTMLElement[];
        expect(stepElements.length).toBe(6);
        expect(stepElements[0].dataset.completed).toBe('true');
        expect(stepElements[1].dataset.current).toBe('true');
        expect(stepElements[2].dataset.next).toBe('true');
      },
    );
  },
};

export const WithStepStates: Story = {
  args: {
    currentStepIndex: 1,
    indicator: 'number',
    children: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          '`stepStates` allows independent navigation between steps, where each step can be completed without following a strict order. This object can be used to control the state of each step with `completed`, `current`, and `disabled` properties.',
      },
    },
  },
  render: () => {
    const stepStates = [
      { completed: false, disabled: false, current: true },
      { completed: false, disabled: false, current: true },
      { completed: false, disabled: false, current: false },
      { completed: false, disabled: false, current: false },
      { completed: true, disabled: false, current: false },
    ];

    return (
      <ProgressStepper stepStates={stepStates} orientation="vertical">
        <StepItem key="with-step-states-step-1" label="Step 1" />
        <StepItem key="with-step-states-step-2" label="Step 2" />
        <StepItem key="with-step-states-step-3" label="Step 3" />
        <StepItem key="with-step-states-step-4" label="Step 4" />
        <StepItem key="with-step-states-step-5" label="Step 5" />
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should render a vertical progress stepper correctly',
      async () => {
        const stepperElement = canvas.getByTestId('progress-stepper');
        const stepElements = [
          ...stepperElement.querySelectorAll(
            '.gi-progress-stepper-step-container',
          ),
        ] as HTMLElement[];
        expect(stepElements[1].dataset.current).toBe('true');
      },
    );
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

export const TestVerticalSlotsCurrentPrevious: StoryObj = {
  tags: ['skip-playwright'],
  args: {
    currentStepIndex: 1,
    orientation: 'vertical',
    children: [
      <StepItem label="Step 1" key="test-vs-1">
        <div>Step 1 Content</div>
      </StepItem>,
      <StepItem label="Step 2" key="test-vs-2">
        <div>Step 2 Content</div>
      </StepItem>,
      <StepItem label="Step 3" key="test-vs-3">
        <div>Step 3 Content</div>
      </StepItem>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should show slot content for the current and previous step index when vertical orientation',
      async () => {
        const stepperElement1 = canvas.getByTestId('vertical-step-slot-0');
        const stepperElement2 = canvas.getByTestId('vertical-step-slot-1');
        const stepperElement3 = canvas.queryByTestId('vertical-step-slot-2');
        expect(stepperElement1).toBeInTheDocument();
        expect(stepperElement2).toBeInTheDocument();
        expect(stepperElement3).toBeNull();
      },
    );
  },
};

export const TestHorizontalSlotCurrentOnly: Story = {
  tags: ['skip-playwright'],
  args: {
    currentStepIndex: 0,
    children: [
      <StepItem label="Step 1" key="test-hs-1">
        <div>Step 1 Content</div>
      </StepItem>,
      <StepItem label="Step 2" key="test-hs-2">
        <div>Step 2 Content</div>
      </StepItem>,
      <StepItem label="Step 3" key="test-hs-3">
        <div>Step 3 Content</div>
      </StepItem>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should show slot content for the current step index',
      async () => {
        const stepperElement1 = canvas.getByTestId('horizontal-step-slot-0');
        const stepperElement2 = canvas.queryByTestId('horizontal-step-slot-1');
        const stepperElement3 = canvas.queryByTestId('horizontal-step-slot-2');
        expect(stepperElement1).toBeInTheDocument();
        expect(stepperElement2).toBeNull();
        expect(stepperElement3).toBeNull();
      },
    );
  },
};

export const TestVerticalDefaultOpenSlots: Story = {
  tags: ['skip-playwright'],
  args: {
    orientation: 'vertical',
    children: [
      <StepItem label="Step 1" key="test-vdo-1" defaultOpen>
        <div>Step 1 Content</div>
      </StepItem>,
      <StepItem label="Step 2" key="test-vdo-2" defaultOpen>
        <div>Step 2 Content</div>
      </StepItem>,
      <StepItem label="Step 3" key="test-vdo-3" defaultOpen>
        <div>Step 3 Content</div>
      </StepItem>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should default open slot content while vertical orientation when "defaultOpen" is true',
      async () => {
        const stepperElement1 = canvas.getByTestId('vertical-step-slot-0');
        const stepperElement2 = canvas.getByTestId('vertical-step-slot-1');
        const stepperElement3 = canvas.getByTestId('vertical-step-slot-2');
        expect(stepperElement1).toBeInTheDocument();
        expect(stepperElement2).toBeInTheDocument();
        expect(stepperElement3).toBeInTheDocument();
      },
    );
  },
};

export const TestIndicatorNumbersAllNumeric: Story = {
  tags: ['skip-playwright'],
  args: {
    indicator: 'number',
    currentStepIndex: 0,
    children: [
      <StepItem label="Step 1" key="test-n-1">
        <div>Step 1 Content</div>
      </StepItem>,
      <StepItem label="Step 2" key="test-n-2">
        <div>Step 2 Content</div>
      </StepItem>,
      <StepItem label="Step 3" key="test-n-3">
        <div>Step 3 Content</div>
      </StepItem>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should check step numbers when "indicator" is a number',
      async () => {
        const steps = canvas.getAllByRole('listitem');
        for (const stepElement of steps) {
          const content = stepElement
            .querySelector('.gi-progress-stepper-step')
            ?.textContent?.trim();
          expect(!Number.isNaN(Number(content))).toBe(true);
        }
      },
    );
  },
};

export const TestIndicatorChecksWhenCompleted: Story = {
  tags: ['skip-playwright'],
  args: {
    indicator: 'number',
    currentStepIndex: 2,
    children: [
      <StepItem label="Step 1" key="test-nc-1">
        <div>Step 1 Content</div>
      </StepItem>,
      <StepItem label="Step 2" key="test-nc-2">
        <div>Step 2 Content</div>
      </StepItem>,
      <StepItem label="Step 3" key="test-nc-3">
        <div>Step 3 Content</div>
      </StepItem>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should have a check icon for the completed steps when "indicator" is a number',
      async () => {
        const listItems = canvas.getAllByRole('listitem');
        const contents = listItems.map((listItem) =>
          listItem
            .querySelector('.gi-progress-stepper-step')
            ?.textContent?.trim(),
        );
        const [content1, content2, currentStep] = contents;
        expect(content1).toBe('check');
        expect(content2).toBe('check');
        expect(currentStep).toBe('3');
      },
    );
  },
};

export const TestExplicitStepStates: Story = {
  tags: ['skip-playwright'],
  args: {
    stepStates: [{ completed: true }, { current: true }, { disabled: true }],
    children: [
      <StepItem label="Step 1" key="test-es-1">
        <div>Step 1 Content</div>
      </StepItem>,
      <StepItem label="Step 2" key="test-es-2">
        <div>Step 2 Content</div>
      </StepItem>,
      <StepItem label="Step 3" key="test-es-3">
        <div>Step 3 Content</div>
      </StepItem>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should respect explicit stepStates when provided', async () => {
      const stepperElement = canvas.getByTestId('progress-stepper');
      const stepElements = [
        ...stepperElement.querySelectorAll(
          '.gi-progress-stepper-step-container',
        ),
      ] as HTMLElement[];

      expect(stepElements[0].dataset.completed).toBe('true');
      expect(stepElements[0].dataset.current).not.toBe('true');
      expect(stepElements[0].dataset.disabled).not.toBe('true');

      expect(stepElements[1].dataset.current).toBe('true');
      expect(stepElements[1].dataset.completed).not.toBe('true');
      expect(stepElements[1].dataset.disabled).not.toBe('true');

      expect(stepElements[2].dataset.disabled).toBe('true');
      expect(stepElements[2].dataset.current).not.toBe('true');
      expect(stepElements[2].dataset.completed).not.toBe('true');
    });
  },
};

export const TestCompleteAll: Story = {
  tags: ['skip-playwright'],
  args: {
    completeAll: true,
    children: [
      <StepItem label="Step 1" key="test-c-1">
        <div>Step 1 Content</div>
      </StepItem>,
      <StepItem label="Step 2" key="test-c-2">
        <div>Step 2 Content</div>
      </StepItem>,
      <StepItem label="Step 3" key="test-c-3">
        <div>Step 3 Content</div>
      </StepItem>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should mark all steps as completed when completeAll is true',
      async () => {
        const stepperElement = canvas.getByTestId('progress-stepper');
        const stepElements = [
          ...stepperElement.querySelectorAll(
            '.gi-progress-stepper-step-container',
          ),
        ] as HTMLElement[];
        for (const stepElement of stepElements) {
          expect(stepElement.dataset.completed).toBe('true');
          expect(stepElement.dataset.current).not.toBe('true');
          expect(stepElement.dataset.next).not.toBe('true');
        }
        expect(stepElements.length).toBe(3);
      },
    );
  },
};
