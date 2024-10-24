import { DropdownItem } from './dropdown-item.js';
import { MultiSelectSearchProps } from './types.js';

export const MultiSelectSearch = ({
  action,
  method,
  dropdownItems,
  id
}: MultiSelectSearchProps) => {
  return (
    <form id={id} method={method} action={action}>
      {dropdownItems.map((dropdown) => (
        <DropdownItem {...dropdown} />
      ))}
    </form>
  );
};

export default MultiSelectSearch;
