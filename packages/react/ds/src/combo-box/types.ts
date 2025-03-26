import { DropdownItem } from './dropdown-item.js';

export type DropdownItemProps = {
  children: string;
  options: {
    label: string;
    value: string;
  }[];
  noSearch?: boolean;
  value?: string[];
  defaultValue?: string[];
  onChange?: (selectedValues: string[]) => void;
  onSearch?: (query: string) => void;
};

export type ComboboxProps = {
  children:
    | React.ReactElement<typeof DropdownItem>[]
    | React.ReactElement<typeof DropdownItem>;
  className?: string;
  dataTestid?: string;
};
