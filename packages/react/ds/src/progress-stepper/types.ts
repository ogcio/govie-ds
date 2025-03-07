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

export type StepItemProps = {
  label: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
};

export type ProgressStepperProps = {
  children: React.ReactElement<InnerStepProps>[];
  currentStepIndex?: number;
  orientation?: Orientation;
  completeAll?: boolean;
  dataTestId?: string;
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
};

export type ConnectorProps = {
  stepNumber: number;
  isNextStep: boolean;
  isCurrentStep: boolean;
  isCompleted: boolean;
  orientation?: Orientation;
};
