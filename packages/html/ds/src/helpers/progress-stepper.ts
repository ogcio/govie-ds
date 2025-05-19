import { ProgressStepperProps } from '../progress-stepper/types';
import { createIcon } from './icons';

export const createProgressStepper = (arguments_: ProgressStepperProps) => {
  const currentStep = arguments_.currentStepIndex || 0;
  const slot = arguments_.children[currentStep]?.content;
  const orientation = arguments_.orientation || 'horizontal';
  const showHorizontalSlot = orientation === 'horizontal' && slot;

  const indicator = arguments_.indicator || 'number';
  const progressStepperContainer = document.createElement('div');
  progressStepperContainer.className = `gi-w-full ${orientation === 'vertical' ? 'gi-flex' : ''}`;

  const progressStepper = document.createElement('div');
  progressStepperContainer.append(progressStepper);
  progressStepper.dataset.testid = 'progress-stepper';
  progressStepper.dataset.orientation = orientation;
  progressStepper.role = 'list';
  progressStepper.ariaLive = 'polite';
  progressStepper.className = 'gi-progress-stepper';

  for (let index = 0; index < arguments_.children.length; index++) {
    const stepItem = arguments_.children[index];
    const { label = '', defaultOpen, ariaLabel = '' } = stepItem;
    const isCurrentStep = !arguments_.completeAll && currentStep === index;
    const isLastStep = index === arguments_.children.length - 1;
    const isCompleted =
      arguments_.completeAll || (index < currentStep && index !== currentStep);
    const isNextStep = !isCompleted && !isCurrentStep;
    const showVerticalSlots =
      orientation === 'vertical' &&
      (isCurrentStep || defaultOpen || isCompleted);
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
    stepContainer.dataset.orientation = orientation;
    stepContainer.dataset.current = isCurrentStep.toString();
    stepContainer.dataset.completed = isCompleted.toString();
    stepContainer.dataset.next = isNextStep.toString();
    stepContainer.dataset.indicator = indicator;
    stepContainer.role = 'listitem';
    if (!label) {
      stepContainer.ariaLabel = ariaLabel;
    }

    const indicatorDiv = document.createElement('div');
    indicatorDiv.dataset.indicator = indicator;
    stepContainer.append(indicatorDiv);
    indicatorDiv.className = 'gi-progress-stepper-step';

    if (isCompleted) {
      const icon = createIcon({ icon: 'check' });
      indicatorDiv.append(icon);
    } else if (indicator === 'hashtag') {
      indicatorDiv.textContent = '#';
    } else {
      indicatorDiv.textContent = stepNumber.toString();
    }

    const stepLabel = document.createElement('div');
    stepContainer.append(stepLabel);
    stepLabel.className = 'gi-progress-stepper-step-label';
    stepLabel.dataset.orientation = orientation;
    stepLabel.id = `step-label-${stepNumber}`;
    stepLabel.textContent = label;

    if (!isLastStep) {
      const connector = document.createElement('div');
      div.append(connector);
      connector.dataset.orientation = orientation || 'horizontal';
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

    if (showVerticalSlots) {
      const slot = arguments_.children[index]?.content;
      const verticalStepSlot = document.createElement('div');

      verticalStepSlot.classList.add('gi-ml-10');

      if (label) {
        verticalStepSlot.classList.add('gi-pt-5');
      } else {
        if (slot) {
          verticalStepSlot.classList.add('-gi-mt-[34px]');
        }
      }

      verticalStepSlot.dataset.testid = `vertical-step-slot-${currentStep}`;
      verticalStepSlot.innerHTML = slot || '';
      div.append(verticalStepSlot);
    }
  }

  if (showHorizontalSlot && slot) {
    const horizontalStepSlot = document.createElement('div');
    horizontalStepSlot.className = 'gi-h-full';
    horizontalStepSlot.dataset.testid = `horizontal-step-slot-${currentStep}`;
    horizontalStepSlot.innerHTML = slot;
    progressStepperContainer.append(horizontalStepSlot);
  }
  return progressStepperContainer;
};
