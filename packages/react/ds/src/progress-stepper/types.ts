type Orientation = 'vertical' | 'horizontal';

export const ProgressStepperIndicator = {
  Hashtag: 'hashtag',
} as const;

export type ProgressStepperIndicatorType =
  (typeof ProgressStepperIndicator)[keyof typeof ProgressStepperIndicator];

export type Step = {
  label: string;
  slot: React.ReactElement;
};

export type ProgressStepperProps = {
  children: React.ReactElement<StepProps>[];
  currentStepIndex?: number;
  orientation?: Orientation;
  completeAll?: boolean;
};

export type StepProps = {
  children: string;
  isCurrentStep: boolean;
  isLastStep: boolean;
  isCompleted: boolean;
  stepNumber: number;
  orientation?: Orientation;
  indicator?: ProgressStepperIndicatorType;
};

export type ConnectorProps = {
  stepNumber: number;
  isNextStep: boolean;
  isCurrentStep: boolean;
  isCompleted: boolean;
  orientation?: Orientation;
};
