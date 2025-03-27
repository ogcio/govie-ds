export type DropdownItemProps = {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  noSearch?: boolean;
};

export type ComboBoxProps = {
  items: DropdownItemProps[];
  className?: string;
  dataTestid?: string;
};
