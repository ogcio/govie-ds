import { Icon } from '../icon/icon.js';

type Orientation = 'vertical' | 'horizontal';

export type ProgressStepperProps = {
  steps: string[];
  currentStepIndex: number;
  orientation?: Orientation;
};

export type StepProps = {
  children: string;
  isCurrentStep: boolean;
  isCompleted: boolean;
  stepNumber: number;
  orientation?: Orientation;
};

const Step = ({
  children,
  isCurrentStep,
  isCompleted,
  stepNumber,
  orientation,
}: StepProps) => {
  const isNextStep = !isCompleted && !isCurrentStep;
  return (
    <div className="gi-flex gi-relative gi-flex-1 gi-min-h-20 gi-min-w-20">
      <div
        className="gi-progress-stepper-step-container"
        data-orientation={orientation}
        data-current={isCurrentStep}
        data-completed={isCompleted}
        data-next={isNextStep}
      >
        <div className="gi-progress-stepper-step">
          {isCompleted ? <Icon icon="check" /> : <div>{stepNumber}</div>}
        </div>
        {children}
      </div>
      {stepNumber > 1 ? (
        <div
          data-orientation={orientation}
          data-next={isNextStep}
          className="gi-progress-stepper-step-connector"
        >
          <span />
        </div>
      ) : null}
    </div>
  );
};

export const ProgressStepper = ({
  steps,
  currentStepIndex,
  orientation = 'horizontal',
}: ProgressStepperProps) => {
  return (
    <div
      data-testid="progress-stepper"
      className={'gi-progress-stepper'}
      data-orientation={orientation}
    >
      {steps.map((step, index) => (
        <Step
          key={`progress-stepper-step-${index}`}
          stepNumber={index + 1}
          isCurrentStep={currentStepIndex === index}
          isCompleted={index < currentStepIndex && index !== currentStepIndex}
          orientation={orientation}
        >
          {step}
        </Step>
      ))}
    </div>
  );
};
