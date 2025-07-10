'use client';
import {
  Children,
  FC,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../cn.js';
import { InputText } from '../input-text/input-text.js';
import { Popover } from '../popover/popover.js';
import {
  SelectMenu,
  SelectMenuGroupItem,
  SelectMenuOption,
} from './select-menu.js';
import {
  SelectNextGroupItemElement,
  SelectNextGroupProps,
  SelectNextProps,
  SelectNextOptionItemElement,
  SelectNextOptionProps,
  SelectNextTableCellProps,
} from './types.js';

export const SelectNext = ({
  children,
  onChange: onSelectNextChange,
  onMenuClose,
  defaultValue = '',
  enableSearch,
  disabled,
  ...props
}: SelectNextProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const validOptions = Children.toArray(children).filter((child) =>
    isValidElement(child),
  ) as React.ReactElement[];

  const handleOnClick = () => {
    setIsOpen(true);

    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  };

  const handleOnOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);

    if (onMenuClose && !isOpen) {
      onMenuClose();
    }
  };

  const handleOnSelectItem = (value: string) => {
    setIsOpen(false);
    setValue(value);

    if (onSelectNextChange) {
      const event = {
        ...new Event('change', { bubbles: true }),
        target: {
          ...inputRef.current,
          value,
        },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;

      // it dispatches a synthetic native event
      onSelectNextChange(event);
    }
  };

  useEffect(() => {
    let found: SelectNextOptionItemElement | undefined;

    for (const child of validOptions) {
      const type = (child.type as any)?.componentType;

      if (type === 'SelectItemNext') {
        const item = child as SelectNextOptionItemElement;
        if (item.props.value === value) {
          found = item;
          break;
        }
      }

      if (type === 'SelectGroupItemNext') {
        const group = child as SelectNextGroupItemElement;

        const groupChild = Children.toArray(group.props.children).find(
          (subChild) => {
            const subType = (subChild as any)?.type?.componentType;
            return (
              subType === 'SelectItemNext' &&
              (subChild as SelectNextOptionItemElement).props.value === value
            );
          },
        );

        if (groupChild && isValidElement(groupChild)) {
          found = groupChild as SelectNextOptionItemElement;
          break;
        }
      }
    }

    if (found) {
      setInputValue(found.props.children?.toString() || '');
    }
  }, [value, validOptions]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !disabled) {
      handleOnClick();
    }
  };

  return (
    <div
      {...props}
      aria-disabled={disabled}
      className={cn('gi-select-next', props.className)}
    >
      <InputText
        aria-label="Select an option"
        aria-disabled={disabled}
        disabled={disabled}
        placeholder={inputValue || 'Select'}
        readOnly={true}
        inputClassName="gi-cursor-pointer"
        iconEndClassName={cn({
          'gi-cursor-pointer': !disabled,
          'gi-cursor-not-allowed': disabled,
          'gi-pointer-events-none': disabled,
        })}
        iconEnd="arrow_drop_down"
        onIconEndClick={handleOnClick}
        ref={inputRef}
        value={inputValue}
        onClick={handleOnClick}
        onKeyDown={handleKeyDown}
      />
      <Popover
        triggerRef={inputRef}
        onOpenChange={handleOnOpenChange}
        open={isOpen}
        options={{
          placement: 'bottom-start',
          strategy: 'absolute',
          modifiers: [
            { name: 'offset', options: { offset: [0, 4] } },
            { name: 'preventOverflow', options: { padding: 10 } },
            {
              name: 'flip',
              options: { fallbackPlacements: ['top', 'right', 'left'] },
            },
          ],
        }}
      >
        <SelectMenu onChange={handleOnSelectItem} enableSearch={enableSearch}>
          {validOptions.map((child) => {
            const type = (child?.type as any)?.componentType;

            if (type === 'SelectItemNext') {
              const typedChild = child as SelectNextOptionItemElement;

              return (
                <SelectMenuOption
                  key={`SelectItemNext-${typedChild.props.value.toString()}`}
                  {...typedChild.props}
                  selected={
                    value.toString() === typedChild.props.value.toString()
                  }
                />
              );
            } else if (type === 'SelectGroupItemNext') {
              const typedChild = child as SelectNextGroupItemElement;

              const groupOptions = Children.toArray(typedChild.props.children)
                .filter((child) => isValidElement(child))
                .map((optionChild) => {
                  const optionProps = (
                    optionChild as SelectNextOptionItemElement
                  ).props;
                  return (
                    <SelectMenuOption
                      key={`SelectGroupItemNext-SelectItemNext-${optionProps.value.toString()}`}
                      {...optionProps}
                      selected={
                        value.toString() === optionProps.value.toString()
                      }
                      onChange={handleOnSelectItem}
                    />
                  );
                });

              return (
                <SelectMenuGroupItem label={typedChild.props.label}>
                  {groupOptions}
                </SelectMenuGroupItem>
              );
            }
            return null;
          })}
        </SelectMenu>
      </Popover>
    </div>
  );
};

export const SelectItemNext: FC<SelectNextOptionProps> = () => null;
Object.defineProperty(SelectItemNext, 'componentType', {
  value: 'SelectItemNext',
  writable: false,
  enumerable: false,
});

export const SelectGroupItemNext: FC<SelectNextGroupProps> = () => null;
Object.defineProperty(SelectGroupItemNext, 'componentType', {
  value: 'SelectGroupItemNext',
  writable: false,
  enumerable: false,
});

export const SelectNextTableCell = (props: SelectNextTableCellProps) => {
  const { options, defaultValue, onChange, error } = props;
  return (
    <SelectNext
      {...props}
      defaultValue={defaultValue}
      onChange={onChange}
      data-table-cell="true"
      data-table-cell-error-state={error?.toString()}
    >
      {options.map(({ value, label }) => (
        <SelectItemNext key={`${value}-${label}`} value={value}>
          {label}
        </SelectItemNext>
      ))}
    </SelectNext>
  );
};
