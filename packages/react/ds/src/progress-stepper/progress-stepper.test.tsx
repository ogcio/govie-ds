import { cleanup, render } from '../test-utils.js';
import { ProgressStepper, ProgressStepperProps } from './progress-stepper.js';

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
    expect(steps[0].dataset['data-completed']).toBe('true');
    expect(steps[1].dataset['data-current']).toBe('true');
    expect(steps[2].dataset['data-next']).toBe('true');
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

    expect(steps[2].dataset['data-current']).toBe('true');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderProgressStepper({
      steps: ['Step 1', 'Step 2', 'Step 3'],
      currentStepIndex: 0,
    });

    await screen.axe();
  });
});
