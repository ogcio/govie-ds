import React from 'react';
import { cn } from '../cn.js';
import { Step } from './Step.js';
import { type ProgressStepperProps, type StepItemProps } from './types.js';

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
          data-testId={`horizontal-step-slot-${currentStepIndex}`}
        >
          {slot}
        </div>
      )}
    </div>
  );
};
