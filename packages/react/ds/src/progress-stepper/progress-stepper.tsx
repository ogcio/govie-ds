import React from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import { type ProgressStepperProps, type StepItemProps } from './types.js';
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
          data-testid={`vertical-step-slot-${stepNumber - 1}`}
        >
          {verticalSlot}
        </div>
      )}
    </div>
  );
};

// Component needed to pick the props inside ProgressStepper component
export const StepItem: React.FC<StepItemProps> = () => null;

export const ProgressStepper = ({
  children,
  currentStepIndex = 0,
  orientation = 'horizontal',
  completeAll,
  dataTestId,
}: ProgressStepperProps) => {
  const slot = children[currentStepIndex]?.props?.children;
  const showHorizontalSlot = orientation === 'horizontal' && slot;

  return (
    <div
      className={cn('gi-w-full', {
        'gi-flex': orientation === 'vertical',
      })}
    >
      <div
        data-testid="progress-stepper"
        className="gi-progress-stepper"
        data-orientation={orientation}
        role="list"
        aria-live="polite"
      >
        {React.Children.map(children, (child, index) => {
          const { label, defaultOpen } =
            child.props as unknown as StepItemProps;
          const [isCurrentStep, isLastStep, isCompleted] = [
            !completeAll && currentStepIndex === index,
            index === children.length - 1,
            completeAll ||
              (index < currentStepIndex && index !== currentStepIndex),
          ];

          return (
            <div className="gi-w-full">
              <Step
                key={dataTestId || `progress-stepper-step-${index}`}
                stepNumber={index + 1}
                isCurrentStep={isCurrentStep}
                isCompleted={isCompleted}
                orientation={orientation}
                isLastStep={isLastStep}
                verticalSlot={children[index]?.props?.children}
                defaultOpen={defaultOpen}
              >
                {label}
              </Step>
            </div>
          );
        })}
      </div>
      {showHorizontalSlot && (
        <div
          className="gi-h-full"
          data-testid={`horizontal-step-slot-${currentStepIndex}`}
        >
          {slot}
        </div>
      )}
    </div>
  );
};
