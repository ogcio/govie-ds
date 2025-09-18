type Orientation = 'vertical' | 'horizontal';

export const StepStatus = {
  Active: 'active',
  Disabled: 'disabled',
  Completed: 'completed',
} as const;

export type StepStatusType = (typeof StepStatus)[keyof typeof StepStatus];

export const StepFillLevel = {
  Empty: 'empty',
  Half: 'half',
  Full: 'full',
} as const;
export type StepFillLevelType =
  (typeof StepFillLevel)[keyof typeof StepFillLevel];

export const ProgressStepperIndicator = {
  Hashtag: 'hashtag',
  Number: 'number',
} as const;

export type ProgressStepperIndicatorType =
  (typeof ProgressStepperIndicator)[keyof typeof ProgressStepperIndicator];

export type Step = {
  label: string;
  slot: React.ReactElement;
};

export type StepItemProps = {
  label?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  ariaLabel?: string;
};

export type ProgressStepperProps = {
  children: React.ReactElement<InnerStepProps>[];
  currentStepIndex?: number;
  orientation?: Orientation;
  completeAll?: boolean;
  indicator?: ProgressStepperIndicatorType;
  className?: string;
  verticalGap?: number;
  stepStates?: {
    status: StepStatusType;
    fill: StepFillLevelType;
  }[];
};

export type InnerStepProps = {
  children: string;
  isCurrentStep: boolean;
  isLastStep: boolean;
  isCompleted: boolean;
  stepNumber: number;
  orientation?: Orientation;
  indicator?: ProgressStepperIndicatorType;
  verticalSlot?: React.ReactNode;
  defaultOpen?: boolean;
  dataTestId?: string;
  ariaLabel?: string;
  verticalGap: number;
};

export type ConnectorProps = {
  stepNumber: number;
  isNextStep: boolean;
  isCurrentStep: boolean;
  isCompleted: boolean;
  orientation?: Orientation;
  verticalGap: number;
  fill?: StepFillLevelType;
  useFill?: boolean;
};
