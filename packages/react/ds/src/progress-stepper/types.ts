type Orientation = 'vertical' | 'horizontal';

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
  dataTestId?: string;
  indicator?: ProgressStepperIndicatorType;
  className?: string;
  verticalGap?: number;
  stepStates?: { completed?: boolean; current?: boolean; disabled?: boolean }[];
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
};
