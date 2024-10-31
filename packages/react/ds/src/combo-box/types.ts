export type DropdownItemType = {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  noSearch?: boolean;
};

export type ComboboxProps = {
  // use any in order to use ServerActions for NextJs applications
  action: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  dropdownItems: DropdownItemType[];
  method?: 'get' | 'post';
  id?: string;
  className?: string;
};
