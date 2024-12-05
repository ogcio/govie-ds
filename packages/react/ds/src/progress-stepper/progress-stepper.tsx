import { MouseEventHandler, useState } from 'react';
import { Icon } from '../icon/icon.js';
import { cn } from '../cn.js';

export type ProgressStepperProps = {
  steps: string[];
  currentStepIndex: number;
  orientation?: 'vertical' | 'horizontal';
};

export type StepProps = {
  children: string;
  isCurrentStep: boolean;
  isCompleted: boolean;
  stepNumber: number;
  isVertical: boolean;
};

const Step = ({
  children,
  isCurrentStep,
  isCompleted,
  stepNumber,
  isVertical,
}: StepProps) => {
  return (
    <div className="gi-flex gi-relative gi-flex-1 gi-min-h-20">
      <div
        className={cn('gi-progress-stepper-step-container', {
          'gi-flex-col': !isVertical,
        })}
        data-current={isCurrentStep}
        data-completed={isCompleted}
        data-next={!isCompleted && !isCurrentStep}
      >
        <div className="gi-progress-stepper-step">
          {isCompleted ? <Icon icon="check" /> : <div>{stepNumber}</div>}
        </div>
        {children}
      </div>
      {stepNumber > 1 ? (
        <div
          className={cn({
            'gi-progress-stepper-step-connector': !isVertical,
            'gi-progress-stepper-step-connector-vertical': isVertical,
          })}
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
  const isVertical = orientation === 'vertical';
  return (
    <div
      data-testid="progress-stepper"
      className={cn('gi-progress-stepper', {
        'gi-flex-col': isVertical,
      })}
    >
      {steps.map((step, index) => (
        <Step
          key={`progress-stepper-step-${index}`}
          stepNumber={index + 1}
          isCurrentStep={currentStepIndex === index}
          isCompleted={index < currentStepIndex && index !== currentStepIndex}
          isVertical={isVertical}
        >
          {step}
        </Step>
      ))}
    </div>
  );
};
