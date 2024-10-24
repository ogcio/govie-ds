import { DropdownItem } from './dropdown-item.js';
import { MultiSelectSearchProps } from './types.js';

export const MultiSelectSearch = ({
  action,
  actionMethod,
  dropdownItems,
  submitButton,
  clearFilters,
}: MultiSelectSearchProps) => {
  return (
    <form className="gi-border-t" method={actionMethod} action={action}>
      {dropdownItems.map((dropdown) => (
        <DropdownItem {...dropdown} />
      ))}
      {clearFilters && clearFilters}
      {submitButton}
    </form>
  );
};

export default MultiSelectSearch;
