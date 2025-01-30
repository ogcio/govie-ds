import { Icon } from '../icon/icon.js';
import type {
  ConnectorProps,
  ProgressStepperProps,
  StepProps,
} from './types.js';

const Connector = ({
  stepNumber,
  isNextStep,
  orientation = 'horizontal',
}: ConnectorProps) => {
  if (stepNumber > 1) {
    return (
      <div
        data-orientation={orientation}
        data-next={isNextStep}
        className="gi-progress-stepper-step-connector"
        aria-hidden="true"
      >
        <span />
      </div>
    );
  }

  return null;
};

const Step = ({
  children,
  isCurrentStep,
  isCompleted,
  stepNumber,
  orientation,
}: StepProps) => {
  const isNextStep = !isCompleted && !isCurrentStep;
  const isVertical = orientation === 'vertical';
  const isHorizontal = orientation === 'horizontal';

  return (
    <div className="gi-flex gi-relative gi-flex-1 gi-min-h-20 gi-min-w-20">
      <div
        className="gi-progress-stepper-step-container"
        data-orientation={orientation}
        data-current={isCurrentStep}
        data-completed={isCompleted}
        data-next={isNextStep}
        role="listitem"
        aria-labelledby={`step-label-${stepNumber}`}
      >
        <div className="gi-progress-stepper-step gi-relative">
          {isCompleted ? <Icon icon="check" /> : <div>{stepNumber}</div>}
          {isVertical ? (
            <Connector
              isNextStep={isNextStep}
              orientation={orientation}
              stepNumber={stepNumber}
            />
          ) : null}
        </div>
        <div
          className="gi-progress-stepper-step-label"
          id={`step-label-${stepNumber}`}
        >
          {children}
        </div>
      </div>
      {isHorizontal ? (
        <Connector
          isNextStep={isNextStep}
          orientation={orientation}
          stepNumber={stepNumber}
        />
      ) : null}
    </div>
  );
};

export const ProgressStepper = ({
  steps,
  currentStepIndex = 0,
  orientation = 'horizontal',
  completeAll,
}: ProgressStepperProps) => {
  return (
    <div
      data-testid="progress-stepper"
      className="gi-progress-stepper"
      data-orientation={orientation}
      role="list"
      aria-live="polite"
    >
      {steps.map((step, index) => (
        <Step
          key={`progress-stepper-step-${index}`}
          stepNumber={index + 1}
          isCurrentStep={!completeAll && currentStepIndex === index}
          isCompleted={
            completeAll ||
            (index < currentStepIndex && index !== currentStepIndex)
          }
          orientation={orientation}
        >
          {step}
        </Step>
      ))}
    </div>
  );
};
