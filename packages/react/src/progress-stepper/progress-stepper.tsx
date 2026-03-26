import { Children, FC } from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import {
  ProgressStepperIndicator,
  StepStatus,
  type ConnectorProps,
  type InnerStepProps,
  type ProgressStepperIndicatorType,
  type ProgressStepperProps,
  type StepItemProps,
  StepFillLevelType,
} from './types.js';

const getVerticalConnectorHeight = (gap: number): string => {
  const heightOffset = gap * 4 - 36;
  return `calc(100% + ${heightOffset}px)`;
};

const Connector = ({
  isNextStep,
  orientation = 'horizontal',
  isCurrentStep,
  isCompleted,
  verticalGap,
  fill,
  useFill,
}: ConnectorProps) => {
  const connectorStyle =
    orientation === 'vertical'
      ? { height: getVerticalConnectorHeight(verticalGap) }
      : undefined;
  return (
    <div
      data-orientation={orientation}
      data-next={isNextStep}
      data-completed={isCompleted}
      data-current={isCurrentStep}
      className={'gi-progress-stepper-step-connector'}
      aria-hidden="true"
      style={connectorStyle}
      data-use-fill={useFill ? 'true' : undefined}
      data-fill={useFill ? fill : undefined}
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
      current: () => '#',
      next: () => '#',
    },
    [ProgressStepperIndicator.Number]: {
      completed: <Icon icon="check" />,
      current: (stepNumber: number) => stepNumber,
      next: (stepNumber: number) => stepNumber,
    },
  };

  return indicatorClasses[indicator];
};

const getProgressIconStep = (
  indicator: ProgressStepperIndicatorType,
  stepNumber: number,
  isCompleted: boolean,
  isCurrentStep: boolean,
) => {
  const { current, completed, next } = getIndicatorClasses(
    indicator || ProgressStepperIndicator.Hashtag,
  );

  if (isCompleted) {
    return completed;
  } else if (isCurrentStep) {
    return current(stepNumber);
  }
  return next(stepNumber);
};

export const Step = ({
  isCurrentStep,
  isCompleted,
  isLastStep,
  isDisabled = false,
  stepNumber,
  orientation,
  children,
  indicator,
  verticalSlot,
  defaultOpen,
  dataTestId,
  ariaLabel,
  verticalGap,
  fill,
  useFill,
}: InnerStepProps & {
  isDisabled?: boolean;
  fill?: StepFillLevelType;
  useFill?: boolean;
}) => {
  const isNextStep = !isCompleted && !isCurrentStep;
  const showVerticalSlots =
    orientation === 'vertical' && (isCurrentStep || defaultOpen || isCompleted);
  const hasLabel = Boolean(children);

  return (
    <div className={`gi-relative ${isDisabled ? 'gi-disabled' : ''}`}>
      <div
        className="gi-progress-stepper-step-container"
        data-orientation={orientation}
        data-current={isCurrentStep}
        data-completed={isCompleted}
        data-disabled={isDisabled}
        data-next={isNextStep}
        data-indicator={indicator}
        aria-labelledby={`step-label-${stepNumber}`}
        data-testid={dataTestId || `step-label-${stepNumber}`}
        aria-label={hasLabel ? undefined : ariaLabel}
      >
        <div className="gi-progress-stepper-step" data-indicator={indicator}>
          {getProgressIconStep(
            indicator || ProgressStepperIndicator.Hashtag,
            stepNumber,
            isCompleted,
            isCurrentStep,
          )}
        </div>
        {hasLabel && (
          <div
            className="gi-progress-stepper-step-label"
            data-orientation={orientation}
            id={`step-label-${stepNumber}`}
          >
            {children}
          </div>
        )}
      </div>
      {isLastStep ? null : (
        <Connector
          isCurrentStep={isCurrentStep}
          isNextStep={isNextStep}
          isCompleted={isCompleted}
          orientation={orientation}
          stepNumber={stepNumber}
          verticalGap={verticalGap}
          fill={fill}
          useFill={useFill}
        />
      )}
      {showVerticalSlots && verticalSlot && (
        <div
          data-testid={`vertical-step-slot-${stepNumber - 1}`}
          className={cn('gi-ml-10', {
            'gi-pt-5': hasLabel,
            '-gi-mt-[34px]': !hasLabel && verticalSlot,
          })}
        >
          {verticalSlot}
        </div>
      )}
    </div>
  );
};

export const StepItem: FC<StepItemProps> = () => null;

export const ProgressStepper = ({
  children,
  currentStepIndex = 0,
  orientation = 'horizontal',
  indicator = 'number',
  completeAll,
  stepStates,
  className,
  verticalGap = 14,
  ...props
}: ProgressStepperProps) => {
  const slot = children[currentStepIndex]?.props?.children;
  const showHorizontalSlot = orientation === 'horizontal' && slot;
  const useFill = !!(stepStates && stepStates?.length);

  return (
    <div
      {...props}
      role="presentation"
      className={cn('gi-w-full', {
        'gi-flex': orientation === 'vertical',
      })}
    >
      <div
        data-testid="progress-stepper"
        className={cn(
          'gi-progress-stepper',
          {
            [`gi-gap-${verticalGap}`]: orientation === 'vertical',
          },
          className,
        )}
        data-orientation={orientation}
        role="list"
        aria-live="polite"
      >
        {Children.map(children, (child, index) => {
          const {
            label = '',
            defaultOpen,
            ariaLabel,
          } = child.props as StepItemProps;

          let isCurrentStep: boolean;
          let isCompleted: boolean;
          let isDisabled: boolean;

          const step = stepStates?.[index];

          if (step) {
            isCurrentStep = step.status === StepStatus.Active;
            isCompleted = step.status === StepStatus.Completed;
            isDisabled = step.status === StepStatus.Disabled;
          } else {
            isCurrentStep = !completeAll && currentStepIndex === index;
            isCompleted = completeAll || index < currentStepIndex;
            isDisabled = false;
          }

          const isLastStep = index === children.length - 1;

          return (
            <div className="gi-w-full" role="listitem">
              <Step
                key={`progress-stepper-step-${index}`}
                stepNumber={index + 1}
                isCurrentStep={isCurrentStep}
                isCompleted={isCompleted}
                isDisabled={isDisabled}
                orientation={orientation}
                isLastStep={isLastStep}
                verticalSlot={children[index]?.props?.children}
                defaultOpen={defaultOpen}
                indicator={indicator}
                ariaLabel={ariaLabel}
                verticalGap={verticalGap}
                fill={useFill ? step?.fill : undefined}
                useFill={useFill}
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
