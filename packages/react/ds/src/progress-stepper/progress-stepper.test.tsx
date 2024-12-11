import { cleanup, render } from '../test-utils.js';
import { ProgressStepper } from './progress-stepper.js';
import type { ProgressStepperProps } from './types.js';

describe('govieProgressStepper', () => {
  afterEach(cleanup);

  const renderProgressStepper = (props: ProgressStepperProps) =>
    render(<ProgressStepper {...props} />);

  it('should render a horizontal progress stepper correctly', () => {
    const screen = renderProgressStepper({
      steps: ['Step 1', 'Step 2', 'Step 3'],
      currentStepIndex: 1,
    });
    const stepperElement = screen.getByTestId('progress-stepper');
    const steps = [
      ...stepperElement.querySelectorAll('.gi-progress-stepper-step-container'),
    ] as HTMLElement[];
    expect(steps.length).toBe(3);

    expect(steps[0].dataset.completed).toBe('true');
    expect(steps[1].dataset.current).toBe('true');
    expect(steps[2].dataset.next).toBe('true');
  });

  it('should render a vertical progress stepper correctly', () => {
    const screen = renderProgressStepper({
      steps: ['Step 1', 'Step 2', 'Step 3'],
      currentStepIndex: 2,
      orientation: 'vertical',
    });
    const stepperElement = screen.getByTestId('progress-stepper');
    const steps = [
      ...stepperElement.querySelectorAll('.gi-progress-stepper-step-container'),
    ] as HTMLElement[];

    expect(steps[2].dataset.current).toBe('true');
  });

  it('should mark all steps as completed when completeAll is true', () => {
    const screen = renderProgressStepper({
      steps: ['Step 1', 'Step 2', 'Step 3'],
      completeAll: true,
    });

    const stepperElement = screen.getByTestId('progress-stepper');
    const steps = [
      ...stepperElement.querySelectorAll('.gi-progress-stepper-step-container'),
    ] as HTMLElement[];

    for (const step of steps) {
      expect(step.dataset.completed).toBe('true');
      expect(step.dataset.current).not.toBe('true');
      expect(step.dataset.next).not.toBe('true');
    }

    expect(steps.length).toBe(3);
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderProgressStepper({
      steps: ['Step 1', 'Step 2', 'Step 3'],
      currentStepIndex: 0,
    });

    await screen.axe();
  });
});
