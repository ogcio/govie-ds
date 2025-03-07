import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import {
  ProgressStepperIndicator,
  type ConnectorProps,
  type ProgressStepperIndicatorType,
  type InnerStepProps,
} from './types.js';

const Connector = ({
  isNextStep,
  orientation = 'horizontal',
  isCurrentStep,
  isCompleted,
}: ConnectorProps) => {
  return (
    <div
      data-orientation={orientation}
      data-next={isNextStep}
      data-completed={isCompleted}
      data-current={isCurrentStep}
      className={cn('gi-progress-stepper-step-connector')}
      aria-hidden="true"
    >
      <span />
      {isCurrentStep ? <span /> : null}
    </div>
  );
};

const getIndicatorClasses = (indicator: ProgressStepperIndicatorType) => {
  const indicatorClasses = {
    [ProgressStepperIndicator.Hashtag]: {
      completed: <Icon icon="check" />,
      current: '#',
      next: '#',
    },
  };

  return indicatorClasses[indicator];
};

export const Step = ({
  isCurrentStep,
  isCompleted,
  isLastStep,
  stepNumber,
  orientation,
  children,
  indicator = 'hashtag',
  verticalSlot,
  defaultOpen,
}: InnerStepProps) => {
  const isNextStep = !isCompleted && !isCurrentStep;
  const { current, completed, next } = getIndicatorClasses(
    indicator || ProgressStepperIndicator.Hashtag,
  );
  const showVerticalSlots =
    orientation === 'vertical' && (isCurrentStep || defaultOpen || isCompleted);

  const getProgressIconStep = () => {
    if (isCompleted) {
      return completed;
    } else if (isCurrentStep) {
      return current;
    }
    return next;
  };

  return (
    <div className="gi-relative">
      <div
        className="gi-progress-stepper-step-container"
        data-orientation={orientation}
        data-current={isCurrentStep}
        data-completed={isCompleted}
        data-next={isNextStep}
        data-indicator={indicator}
        role="listitem"
        aria-labelledby={`step-label-${stepNumber}`}
      >
        <div className="gi-progress-stepper-step">{getProgressIconStep()}</div>
        <div
          className="gi-progress-stepper-step-label"
          data-orientation={orientation}
          id={`step-label-${stepNumber}`}
        >
          {children}
        </div>
      </div>
      {isLastStep ? null : (
        <Connector
          isCurrentStep={isCurrentStep}
          isNextStep={isNextStep}
          isCompleted={isCompleted}
          orientation={orientation}
          stepNumber={stepNumber}
        />
      )}
      {showVerticalSlots && (
        <div
          className="gi-ml-10"
          data-testId={`vertical-step-slot-${stepNumber - 1}`}
        >
          {verticalSlot}
        </div>
      )}
    </div>
  );
};
