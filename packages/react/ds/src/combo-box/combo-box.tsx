import { DropdownItem } from './dropdown-item.js';
import { ComboboxProps } from './types.js';

export const Combobox = ({
  action,
  method,
  dropdownItems,
  id,
  className,
}: ComboboxProps) => {
  return (
    <form
      className={`gi-combobox-container ${className}`}
      id={id}
      method={method}
      action={action}
    >
      {dropdownItems.map((dropdown, index) => (
        <div
          key={`${index}_${dropdown.label}`}
          aria-label={`${dropdown.label} dropdown`}
        >
          <DropdownItem {...dropdown} />
        </div>
      ))}
    </form>
  );
};

export default Combobox;
