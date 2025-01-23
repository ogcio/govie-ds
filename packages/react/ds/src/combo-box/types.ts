import { DropdownItem } from './dropdown-item.js';

export type DropdownItemType = {
  children: string;
  options: {
    label: string;
    value: string;
  }[];
  noSearch?: boolean;
};

export type ComboboxProps = {
  children:
    | React.ReactElement<typeof DropdownItem>[]
    | React.ReactElement<typeof DropdownItem>;
  className?: string;
};
