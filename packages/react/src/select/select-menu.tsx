'use client';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { Children, cloneElement, isValidElement, useState, useEffect, forwardRef } from 'react';
import { cn } from '@/cn.js';
import { translate as t } from '@/i18n/utility.js';
import { InputText } from '@/input-text/input-text.js';
import { Label } from '@/label/label.js';
import { Spinner } from '@/spinner/spinner.js';
import Check from '@/atoms/icons/Check.js';
import type {
  SelectMenuGroupReactElement,
  SelectMenuOptionProps,
  SelectMenuOptionReactElement,
  SelectMenuProps,
} from './types.js';
import Text from '@/atoms/Text.js';
import { dividerStyles } from '@/atoms/Divider.js';

export const SelectMenu = forwardRef<HTMLDivElement, SelectMenuProps>(
  (
    {
      children,
      className,
      onChange,
      enableSearch,
      isLoading,
      showNoData,
      listboxId,
      listboxLabel,
      multiselectable,
      onClearAll,
      clearAllHighlighted,
    },
    ref,
  ) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<any>([]);
    useEffect(() => {
      const validChildren = Children.toArray(children).filter((child) => isValidElement(child)) as React.ReactElement[];

      const allOptions = validChildren
        .map((child) => {
          const type = (child?.type as any)?.componentType;
          const search = searchTerm.toLowerCase();

          switch (type) {
            case 'SelectMenuOption': {
              const typedChild = child as SelectMenuOptionReactElement;
              if (typeof typedChild.props.value === 'string') {
                const optionChildren = typedChild?.props?.children?.toString()?.toLowerCase() || '';
                const optionValue = typedChild?.props?.value?.toLowerCase();

                if (optionChildren.includes(search) || optionValue.includes(search)) {
                  return cloneElement(typedChild, {
                    onChange,
                    enableSearch,
                  });
                }
              }
              break;
            }
            case 'SelectMenuGroupItem': {
              const group = child as SelectMenuGroupReactElement;
              const groupChildren = Children.toArray(group.props.children).filter((child) => isValidElement(child));

              const filteredGroupOptions = groupChildren
                .map((sub) => {
                  if ((sub?.type as any)?.componentType === 'SelectMenuOption') {
                    const subOption = sub as SelectMenuOptionReactElement;
                    return cloneElement(subOption, { onChange });
                  }
                  return null;
                })
                .filter((opt): opt is SelectMenuOptionReactElement => opt !== null);

              const matches = filteredGroupOptions.filter((opt) => {
                const text = opt.props.children?.toString()?.toLowerCase() || '';
                const value = opt.props.value?.toLowerCase() || '';
                return text?.includes(searchTerm.toLowerCase()) || value?.includes(searchTerm.toLowerCase());
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

    const renderData = () => {
      if (isLoading) {
        return (
          <div className="gi-select-menu-loading">
            <Spinner size="md" />
          </div>
        );
      }

      return showNoData ? (
        <div className="gi-select-menu-option-not-found">
          {t('autocomplete.noData', {
            defaultValue: 'No data found.',
          })}
        </div>
      ) : (
        <ul
          id={listboxId}
          aria-label={listboxLabel || 'options'}
          role="listbox"
          aria-multiselectable={multiselectable || undefined}
        >
          {onClearAll && (
            <>
              <li
                id={listboxId ? `${listboxId}-clear-all` : undefined}
                role="option"
                aria-selected={false}
                className={cn('gi-select-option-item', {
                  'gi-select-option-item-highlighted': clearAllHighlighted,
                })}
                tabIndex={-1}
                onClick={onClearAll}
              >
                <Text size="sm">{t('autocomplete.clearAll', { defaultValue: 'Clear all selections' })}</Text>
              </li>
              <li role="presentation" className={dividerStyles()} />
            </>
          )}
          {filteredOptions}
        </ul>
      );
    };

    return (
      <div ref={ref} className={cn('gi-select-menu-container', className)}>
        {enableSearch && (
          <div className="gi-select-menu-input-container">
            <InputText
              tabIndex={0}
              placeholder={t('input.search', {
                defaultValue: 'Search',
              })}
              iconEnd="search"
              onChange={handleSearchChange}
              value={searchTerm}
            />
          </div>
        )}
        <div
          className={cn('gi-select-menu-option-container', {
            '!gi-pt-1': onClearAll,
          })}
        >
          {renderData()}
        </div>
      </div>
    );
  },
);

export const SelectMenuOption = ({
  children,
  value,
  id,
  selected,
  onChange,
  disabled,
  dataTestid,
  className,
  hidden,
  enableSearch,
  isHighlighted,
  index,
  multiple,
  ...props
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
      id={id}
      tabIndex={disabled ? -1 : 0}
      data-index={index}
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
          'gi-select-option-item-highlighted': isHighlighted,
          '!gi-justify-start gi-gap-3': multiple,
        },
        className,
      )}
      data-highlighted={isHighlighted}
      data-search-enabled={enableSearch}
      data-testid={dataTestid || `option-${value}`}
      {...props}
    >
      {multiple ? (
        <>
          <span aria-hidden="true" className="gi-input-checkbox-visual" data-checked={!!selected || undefined} />
          <Text
            size="sm"
            className={cn('gi-cursor-pointer', {
              'gi-font-bold': selected,
            })}
          >
            {children}
          </Text>
        </>
      ) : (
        <>
          <span className="gi-text-sm">{children}</span>
          {selected && <Check className="gi-shrink-0" />}
        </>
      )}
    </li>
  );
};
Object.defineProperty(SelectMenuOption, 'componentType', {
  value: 'SelectMenuOption',
  writable: false,
  enumerable: false,
});

export const SelectMenuGroupItem = ({ children, label, ...props }: { children?: any; label: string }) => {
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
