import { render } from '../common/render';
import html from './progress-stepper.html?raw';

describe('govieProgressStepper', () => {
  const renderProgressStepper = render({
    componentName: 'progress-stepper',
    macroName: 'govieProgressStepper',
    html,
  });

  it('should pass axe tests', async () => {
    const screen = renderProgressStepper({
      steps: ['Step 1', 'Step 2', 'Step 3'],
      currentStepIndex: 1,
      orientation: 'horizontal',
    });

    await screen.axe();
  });
});
