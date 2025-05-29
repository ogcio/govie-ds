type Orientation = 'vertical' | 'horizontal';

export type Step = {
  label: string;
  slot: React.ReactElement;
};

export type StepItemProps = {
  label?: string;
  content?: string;
  defaultOpen?: boolean;
  ariaLabel?: string;
};

export const ProgressStepperIndicator = {
  Hashtag: 'hashtag',
  Number: 'number',
} as const;

export type ProgressStepperIndicatorType =
  (typeof ProgressStepperIndicator)[keyof typeof ProgressStepperIndicator];

export type ProgressStepperProps = {
  children: StepItemProps[];
  currentStepIndex?: number;
  orientation?: Orientation;
  completeAll?: boolean;
  dataTestId?: string;
  indicator?: ProgressStepperIndicatorType;
  className?: string;
  gap?: number;
};

export type InnerStepProps = {
  content: string;
  isCurrentStep: boolean;
  isLastStep: boolean;
  isCompleted: boolean;
  stepNumber: number;
  orientation?: Orientation;
  verticalSlot?: React.ReactNode;
  defaultOpen?: boolean;
  gap: number;
};

export type ConnectorProps = {
  stepNumber: number;
  isNextStep: boolean;
  isCurrentStep: boolean;
  isCompleted: boolean;
  orientation?: Orientation;
  gap: number;
};
