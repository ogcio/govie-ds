export type StepsRootProps = {
  currentStepIndex: number;
  onStepClicked: (stepIndex: number) => void;
  children: React.ReactNode;
};

export type StepsListProps = {
  items: string[];
  currentStepIndex: number;
  onStepClicked: (stepIndex: number) => void;
};
