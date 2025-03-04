import React from 'react';
import { Icon } from '../icon/icon.js';
import {
  ProgressStepperIndicator,
  type ConnectorProps,
  type ProgressStepperIndicatorType,
  type ProgressStepperProps,
  type StepProps,
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
      className="gi-progress-stepper-step-connector"
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

const Step = ({
  isCurrentStep,
  isCompleted,
  isLastStep,
  stepNumber,
  orientation,
  children,
  indicator = 'hashtag',
}: StepProps) => {
  const isNextStep = !isCompleted && !isCurrentStep;
  const { current, completed, next } = getIndicatorClasses(
    indicator || ProgressStepperIndicator.Hashtag,
  );

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
    </div>
  );
};

type StepItemProps = {
  label: string;
  children?: React.ReactNode;
};

// Component used just to pick the props on ProgressStepper component
export const StepItem: React.FC<StepItemProps> = () => null;

export const ProgressStepper = ({
  children,
  currentStepIndex = 0,
  orientation = 'horizontal',
  completeAll,
}: ProgressStepperProps) => {
  const slot = children[currentStepIndex]?.props?.children;

  return (
    <div className="gi-w-full">
      <div
        data-testid="progress-stepper"
        className="gi-progress-stepper"
        data-orientation={orientation}
        role="list"
        aria-live="polite"
      >
        {React.Children.map(children, (child, index) => {
          const { label } = child.props as any;
          const [isCurrentStep, isLastStep, isCompleted] = [
            !completeAll && currentStepIndex === index,
            index === children.length - 1,
            completeAll ||
              (index < currentStepIndex && index !== currentStepIndex),
          ];

          return (
            <div className="gi-w-full">
              <Step
                key={`progress-stepper-step-${index}`}
                stepNumber={index + 1}
                isCurrentStep={isCurrentStep}
                isCompleted={isCompleted}
                orientation={orientation}
                isLastStep={isLastStep}
              >
                {label}
              </Step>
            </div>
          );
        })}
      </div>
      {slot}
    </div>
  );
};
