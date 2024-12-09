type Orientation = 'vertical' | 'horizontal';

export type ProgressStepperProps = {
  steps: string[];
  currentStepIndex: number;
  orientation?: Orientation;
};

export type StepProps = {
  children: string;
  isCurrentStep: boolean;
  isCompleted: boolean;
  stepNumber: number;
  orientation?: Orientation;
};

export type ConnectorProps = {
  stepNumber: number;
  isNextStep: boolean;
  orientation?: Orientation;
};
