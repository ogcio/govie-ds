export type SelectMenuOptionsProps = {
  children: React.ReactNode;
  className?: string;
  onChange?: (value: string) => void;
  enableSearch?: boolean;
};

export type SelectMenuOptionElementProps = {
  value: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
};

export type SelectMenuOptionReactElement =
  React.ReactElement<SelectMenuOptionElementProps>;

export type SelectMenuOptionProps = {
  children: React.ReactNode;
  value: string;
  isSelected?: boolean;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  dataTestid?: string;
};
