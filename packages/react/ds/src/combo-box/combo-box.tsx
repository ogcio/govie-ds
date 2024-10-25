import { DropdownItem } from './dropdown-item.js';
import { ComboboxProps } from './types.js';

export const Combobox = ({
  action,
  method,
  dropdownItems,
  id
}: ComboboxProps) => {
  return (
    <form id={id} method={method} action={action}>
      {dropdownItems.map((dropdown,index) => (
        <DropdownItem key={index} {...dropdown} />
      ))}
    </form>
  );
};

export default Combobox;
