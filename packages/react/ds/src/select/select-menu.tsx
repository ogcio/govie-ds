import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import { InputText } from '../input-text/input-text.js';
import {
  SelectMenuOptionProps,
  SelectMenuOptionReactElement,
  SelectMenuOptionsProps,
} from './types.js';

export const SelectMenu = ({
  children,
  className,
  onChange,
  enableSearch,
}: SelectMenuOptionsProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<
    SelectMenuOptionReactElement[]
  >([]);

  useEffect(() => {
    const validChildren = Children.toArray(children).filter((child) =>
      isValidElement(child),
    ) as React.ReactElement[];

    const allOptions = validChildren
      .map((child): SelectMenuOptionReactElement | null => {
        const typedChild = child as SelectMenuOptionReactElement;

        if (typeof typedChild.props.value === 'string') {
          return cloneElement(typedChild, {
            onChange,
          });
        }
        return null;
      })
      .filter(
        (option): option is SelectMenuOptionReactElement => option !== null,
      );

    if (searchTerm === '') {
      setFilteredOptions(allOptions);
    } else {
      const search = searchTerm.toLowerCase();
      const newFilteredOptions = allOptions.filter((option) => {
        const optionChildren =
          option?.props?.children?.toString().toLowerCase() || '';
        const optionValue = option?.props?.value?.toLowerCase();

        return optionChildren.includes(search) || optionValue.includes(search);
      });
      setFilteredOptions(newFilteredOptions);
    }
  }, [children, searchTerm, onChange]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={cn('gi-select-menu-container', className)}>
      {enableSearch && (
        <div className="gi-select-menu-input-container">
          <InputText
            tabIndex={0}
            placeholder="Search"
            iconEnd="search"
            onChange={handleSearchChange}
            value={searchTerm}
          />
        </div>
      )}
      <div className="gi-select-menu-option-container">
        {filteredOptions.length > 0 ? (
          <ul>{filteredOptions}</ul>
        ) : (
          enableSearch &&
          searchTerm && (
            <div className="gi-select-menu-option-not-found">
              No data found.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export const SelectMenuOption = ({
  children,
  value,
  isSelected,
  onChange,
  isDisabled,
  dataTestid,
}: SelectMenuOptionProps) => {
  const handleOnKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange?.(value);
    }
  };
  const handleOnClick = () => {
    if (!isDisabled) {
      onChange?.(value);
    }
  };

  return (
    <li
      tabIndex={isDisabled ? -1 : 0}
      key={`${children}-${value}`}
      aria-selected={isSelected}
      aria-label={children?.toString()}
      aria-disabled={isDisabled}
      onKeyDown={handleOnKeyDown}
      onClick={handleOnClick}
      className={cn('gi-select-option-item', {
        'gi-select-option-item-disabled': isDisabled,
      })}
      data-testid={dataTestid || `option-${value}`}
    >
      <span className="gi-text-sm">{children}</span>
      {isSelected && <Icon icon="check" />}
    </li>
  );
};
