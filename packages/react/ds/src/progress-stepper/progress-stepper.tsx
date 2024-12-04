import { MouseEventHandler, useState } from 'react';
import { Icon } from '../icon/icon.js';
import { cn } from '../cn.js';

export type ProgressStepperProps = {
  steps: string[];
  currentStepIndex: number;
  onStepChange: (index: number) => void;
};

const Step = ({ children, isCurrentStep, isCompleted, stepNumber }) => {
  return (
    <div className="gi-flex gi-relative gi-flex-1">
      <div className="gi-gap-4 gi-flex gi-flex-col gi-flex-1 gi-items-center">
        <div
          className="gi-progress-stepper-step gi-relative"
          data-current={isCurrentStep}
          data-completed={isCompleted}
          data-next={!isCompleted && !isCurrentStep}
        >
          {isCompleted ? <Icon icon="check" /> : <div>{stepNumber}</div>}
        </div>
        {children}
      </div>
      {stepNumber > 1 ? (
        <div className="gi-progress-stepper-step-connector">
          <span />
        </div>
      ) : null}
    </div>
  );
};

export const ProgressStepper = ({
  steps,
  currentStepIndex,
}: ProgressStepperProps) => {
  return (
    <div className="gi-progress-stepper">
      {steps.map((step, index) => (
        <Step
          key={`progress-stepper-step-${index}`}
          stepNumber={index + 1}
          isCurrentStep={currentStepIndex === index}
          isCompleted={index < currentStepIndex && index !== currentStepIndex}
        >
          {step}
        </Step>
      ))}
    </div>
  );
};
