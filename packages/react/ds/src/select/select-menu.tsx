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
import { Label } from '../label/label.js';
import {
  SelectMenuGroupReactElement,
  SelectMenuOptionProps,
  SelectMenuOptionReactElement,
  SelectMenuProps,
} from './types.js';

export const SelectMenu = ({
  children,
  className,
  onChange,
  enableSearch,
}: SelectMenuProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<any>([]);

  useEffect(() => {
    const validChildren = Children.toArray(children).filter((child) =>
      isValidElement(child),
    ) as React.ReactElement[];

    const allOptions = validChildren
      .map((child) => {
        const type = (child?.type as any)?.componentType;
        const search = searchTerm.toLowerCase();

        switch (type) {
          case 'SelectMenuOption': {
            const typedChild = child as SelectMenuOptionReactElement;
            if (typeof typedChild.props.value === 'string') {
              const optionChildren =
                typedChild?.props?.children?.toString()?.toLowerCase() || '';
              const optionValue = typedChild?.props?.value?.toLowerCase();

              if (
                optionChildren.includes(search) ||
                optionValue.includes(search)
              ) {
                return cloneElement(typedChild, {
                  onChange,
                });
              }
            }
            break;
          }
          case 'SelectMenuGroupItem': {
            const group = child as SelectMenuGroupReactElement;
            const groupChildren = Children.toArray(group.props.children).filter(
              (child) => isValidElement(child),
            );

            const filteredGroupOptions = groupChildren
              .map((sub) => {
                if ((sub?.type as any)?.componentType === 'SelectMenuOption') {
                  const subOption = sub as SelectMenuOptionReactElement;
                  return cloneElement(subOption, { onChange });
                }
                return null;
              })
              .filter(
                (opt): opt is SelectMenuOptionReactElement => opt !== null,
              );

            const matches = filteredGroupOptions.filter((opt) => {
              const text = opt.props.children?.toString()?.toLowerCase() || '';
              const value = opt.props.value?.toLowerCase() || '';
              return (
                text?.includes(searchTerm.toLowerCase()) ||
                value?.includes(searchTerm.toLowerCase())
              );
            });

            if (matches.length > 0 || searchTerm === '') {
              return cloneElement(group, {
                children: matches,
              });
            }

            return null;
          }
          default: {
            return null;
          }
        }
      })
      .filter(Boolean);

    setFilteredOptions(allOptions);
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
  selected,
  onChange,
  disabled,
  dataTestid,
  className,
  hidden,
}: SelectMenuOptionProps) => {
  const handleOnKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange?.(value);
    }
  };
  const handleOnClick = () => {
    if (!disabled) {
      onChange?.(value);
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <li
      role="option"
      tabIndex={disabled ? -1 : 0}
      key={`${children}-${value}`}
      aria-selected={selected}
      aria-label={children?.toString()}
      aria-disabled={disabled}
      onKeyDown={handleOnKeyDown}
      onClick={handleOnClick}
      className={cn(
        'gi-select-option-item',
        {
          'gi-select-option-item-disabled': disabled,
        },
        className,
      )}
      data-testid={dataTestid || `option-${value}`}
    >
      <span className="gi-text-sm">{children}</span>
      {selected && <Icon icon="check" />}
    </li>
  );
};
Object.defineProperty(SelectMenuOption, 'componentType', {
  value: 'SelectMenuOption',
  writable: false,
  enumerable: false,
});

export const SelectMenuGroupItem = ({
  children,
  label,
  ...props
}: {
  children?: any;
  label: string;
}) => {
  return (
    <div {...props} role="group" className="gi-px-3">
      <Label text={label} size="sm" className="gi-font-bold gi-pb-1" />
      {children}
    </div>
  );
};
Object.defineProperty(SelectMenuGroupItem, 'componentType', {
  value: 'SelectMenuGroupItem',
  writable: false,
  enumerable: false,
});
