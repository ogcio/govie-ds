import { ButtonProps } from '../button/types.js';
import { LinkProps } from '../link/link.js';

export type DropdownItemType = {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  noSearch?: boolean;
};

export type MultiSelectSearchProps = {
  // use any in order to use ServerActions for NextJs applications
  action: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  dropdownItems: DropdownItemType[];
  submitButton: React.ReactElement<ButtonProps>;
  actionMethod?: 'get' | 'post';
  clearFilters?: React.ReactElement<LinkProps>;
};
