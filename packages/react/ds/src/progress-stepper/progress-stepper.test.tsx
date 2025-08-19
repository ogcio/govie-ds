import { cleanup, renderComponent } from '../test-utilities.js';
import { ProgressStepper, StepItem } from './progress-stepper.js';
import type { ProgressStepperProps } from './types.js';

describe('govieProgressStepper', () => {
  afterEach(cleanup);

  const renderProgressStepper = (props: ProgressStepperProps) =>
    renderComponent(<ProgressStepper {...props} />);

  it('should render a horizontal progress stepper correctly', () => {
    const screen = renderProgressStepper({
      children: [
        <StepItem label="Step 1" key="step-1">
          <div>Step 1 Content</div>
        </StepItem>,
        <StepItem label="Step 2" key="step-2">
          <div>Step 2 Content</div>
        </StepItem>,
        <StepItem label="Step 3" key="step-3">
          <div>Step 3 Content</div>
        </StepItem>,
      ],
      currentStepIndex: 1,
    });

    const stepperElement = screen.getByTestId('progress-stepper');
    const stepElements = [
      ...stepperElement.querySelectorAll('.gi-progress-stepper-step-container'),
    ] as HTMLElement[];

    expect(stepElements.length).toBe(3);
    expect(stepElements[0].dataset.completed).toBe('true');
    expect(stepElements[1].dataset.current).toBe('true');
    expect(stepElements[2].dataset.next).toBe('true');
  });

  it('should render a vertical progress stepper correctly', () => {
    const screen = renderProgressStepper({
      children: [
        <StepItem label="Step 1" key="step-1">
          <div>Step 1 Content</div>
        </StepItem>,
        <StepItem label="Step 2" key="step-2">
          <div>Step 2 Content</div>
        </StepItem>,
        <StepItem label="Step 3" key="step-3">
          <div>Step 3 Content</div>
        </StepItem>,
      ],
      currentStepIndex: 2,
      orientation: 'vertical',
    });

    const stepperElement = screen.getByTestId('progress-stepper');
    const stepElements = [
      ...stepperElement.querySelectorAll('.gi-progress-stepper-step-container'),
    ] as HTMLElement[];

    expect(stepElements[2].dataset.current).toBe('true');
  });

  it('should mark all steps as completed when completeAll is true', () => {
    const screen = renderProgressStepper({
      children: [
        <StepItem label="Step 1" key="step-1">
          <div>Step 1 Content</div>
        </StepItem>,
        <StepItem label="Step 2" key="step-2">
          <div>Step 2 Content</div>
        </StepItem>,
        <StepItem label="Step 3" key="step-3">
          <div>Step 3 Content</div>
        </StepItem>,
      ],
      completeAll: true,
    });

    const stepperElement = screen.getByTestId('progress-stepper');
    const stepElements = [
      ...stepperElement.querySelectorAll('.gi-progress-stepper-step-container'),
    ] as HTMLElement[];

    for (const step of stepElements) {
      expect(step.dataset.completed).toBe('true');
      expect(step.dataset.current).not.toBe('true');
      expect(step.dataset.next).not.toBe('true');
    }

    expect(stepElements.length).toBe(3);
  });

  it('should show slot content for the current and previous step index when vertical orientation', async () => {
    const screen = renderProgressStepper({
      currentStepIndex: 1,
      children: [
        <StepItem label="Step 1">
          <div>Step 1 Content</div>
        </StepItem>,
        <StepItem label="Step 2">
          <div>Step 2 Content</div>
        </StepItem>,
        <StepItem label="Step 3">
          <div>Step 3 Content</div>
        </StepItem>,
      ],
      orientation: 'vertical',
    });

    const stepperElement1 = screen.getByTestId('vertical-step-slot-0');
    const stepperElement2 = screen.getByTestId('vertical-step-slot-1');
    const stepperElement3 = screen.queryByTestId('vertical-step-slot-2');

    expect(stepperElement1).toBeInTheDocument();
    expect(stepperElement2).toBeInTheDocument();
    expect(stepperElement3).toBeNull();
  });

  it('should show slot content for the current step index', async () => {
    const screen = renderProgressStepper({
      currentStepIndex: 0,
      children: [
        <StepItem label="Step 1">
          <div>Step 1 Content</div>
        </StepItem>,
        <StepItem label="Step 2">
          <div>Step 2 Content</div>
        </StepItem>,
        <StepItem label="Step 3">
          <div>Step 3 Content</div>
        </StepItem>,
      ],
    });

    const stepperElement1 = screen.getByTestId('horizontal-step-slot-0');
    const stepperElement2 = screen.queryByTestId('horizontal-step-slot-1');
    const stepperElement3 = screen.queryByTestId('horizontal-step-slot-2');

    expect(stepperElement1).toBeInTheDocument();
    expect(stepperElement2).toBeNull();
    expect(stepperElement3).toBeNull();
  });

  it('should default open slot content while vertical orientation when "defaultOpen" is true', () => {
    const screen = renderProgressStepper({
      children: [
        <StepItem label="Step 1" defaultOpen>
          <div>Step 1 Content</div>
        </StepItem>,
        <StepItem label="Step 2" defaultOpen>
          <div>Step 2 Content</div>
        </StepItem>,
        <StepItem label="Step 3" defaultOpen>
          <div>Step 3 Content</div>
        </StepItem>,
      ],
      orientation: 'vertical',
    });

    const stepperElement1 = screen.getByTestId('vertical-step-slot-0');
    const stepperElement2 = screen.getByTestId('vertical-step-slot-1');
    const stepperElement3 = screen.getByTestId('vertical-step-slot-2');

    expect(stepperElement1).toBeInTheDocument();
    expect(stepperElement2).toBeInTheDocument();
    expect(stepperElement3).toBeInTheDocument();
  });

  it('should check step numbers when "indicator" is a number', () => {
    const screen = renderProgressStepper({
      indicator: 'number',
      children: [
        <StepItem label="Step 1">
          <div>Step 1 Content</div>
        </StepItem>,
        <StepItem label="Step 2">
          <div>Step 2 Content</div>
        </StepItem>,
        <StepItem label="Step 3">
          <div>Step 3 Content</div>
        </StepItem>,
      ],
    });

    const steps = screen.getAllByRole('listitem');

    for (const step of steps) {
      const content = step
        .querySelector('.gi-progress-stepper-step')
        ?.textContent?.trim();
      expect(!Number.isNaN(Number(content))).toBe(true);
    }
  });

  it('should have a check icon for the completed steps when "indicator" is a number', () => {
    const screen = renderProgressStepper({
      indicator: 'number',
      currentStepIndex: 2,
      children: [
        <StepItem label="Step 1">
          <div>Step 1 Content</div>
        </StepItem>,
        <StepItem label="Step 2">
          <div>Step 2 Content</div>
        </StepItem>,
        <StepItem label="Step 3">
          <div>Step 3 Content</div>
        </StepItem>,
      ],
    });

    const [content1, content2, currentStep] = screen
      .getAllByRole('listitem')
      .map((step) =>
        step.querySelector('.gi-progress-stepper-step')?.textContent?.trim(),
      );

    expect(content1).toBe('check');
    expect(content2).toBe('check');
    expect(currentStep).toBe('3');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderProgressStepper({
      children: [
        <StepItem label="Step 1" key="step-1">
          <div>Step 1 Content</div>
        </StepItem>,
        <StepItem label="Step 2" key="step-2">
          <div>Step 2 Content</div>
        </StepItem>,
        <StepItem label="Step 3" key="step-3">
          <div>Step 3 Content</div>
        </StepItem>,
      ],
      currentStepIndex: 0,
    });

    await screen.axe();
  });

  it('should respect explicit stepStates when provided', () => {
    const screen = renderComponent(
      <ProgressStepper
        stepStates={[
          { completed: true },
          { current: true },
          { disabled: true },
        ]}
      >
        <StepItem label="Step 1">
          <div>Step 1 Content</div>
        </StepItem>
        <StepItem label="Step 2">
          <div>Step 2 Content</div>
        </StepItem>
        <StepItem label="Step 3">
          <div>Step 3 Content</div>
        </StepItem>
      </ProgressStepper>,
    );

    const stepperElement = screen.getByTestId('progress-stepper');
    const stepElements = [
      ...stepperElement.querySelectorAll('.gi-progress-stepper-step-container'),
    ] as HTMLElement[];

    // Step 1 - completed
    expect(stepElements[0].dataset.completed).toBe('true');
    expect(stepElements[0].dataset.current).not.toBe('true');
    expect(stepElements[0].dataset.disabled).not.toBe('true');

    // Step 2 - current
    expect(stepElements[1].dataset.current).toBe('true');
    expect(stepElements[1].dataset.completed).not.toBe('true');
    expect(stepElements[1].dataset.disabled).not.toBe('true');

    // Step 3 - disabled
    expect(stepElements[2].dataset.disabled).toBe('true');
    expect(stepElements[2].dataset.current).not.toBe('true');
    expect(stepElements[2].dataset.completed).not.toBe('true');
  });
});
