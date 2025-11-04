'use client';
import {
  Children,
  FC,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';
import { InputText } from '../input-text/input-text.js';
import { Popover } from '../popover/popover.js';
import {
  SelectMenu,
  SelectMenuGroupItem,
  SelectMenuOption,
} from './select-menu.js';
import { SelectSearch } from './select-search.js';
import {
  SelectNextGroupItemElement,
  SelectNextGroupProps,
  SelectNextProps,
  SelectNextOptionItemElement,
  SelectNextOptionProps,
  SelectNextTableCellProps,
} from './types.js';

export const SelectNext = forwardRef<HTMLInputElement, SelectNextProps>(
  (
    {
      children,
      value: controlledValue,
      defaultValue = '',
      onChange: onSelectNextChange,
      onMenuClose,
      enableSearch,
      disabled,
      name,
      onBlur,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const iconEndRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const isPointerDownOnMenu = useRef(false);

    const [internalValue, setInternalValue] = useState(
      defaultValue || controlledValue,
    );
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const validOptions = Children.toArray(children).filter((child) =>
      isValidElement(child),
    ) as React.ReactElement[];

    useEffect(() => {
      let found: SelectNextOptionItemElement | undefined;

      for (const child of validOptions) {
        const type = (child.type as any)?.componentType;

        if (type === 'SelectItemNext') {
          const item = child as SelectNextOptionItemElement;
          if (item.props.value === internalValue) {
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
                (subChild as SelectNextOptionItemElement).props.value ===
                  internalValue
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
        const foundValue = found.props.children?.toString() || '';
        setInputValue(foundValue);
      } else {
        setInputValue('');
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }, [internalValue, validOptions]);

    useEffect(() => {
      if (controlledValue !== undefined) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue]);

    const handleOnClick = () => {
      setIsOpen(true);
      inputRef.current?.focus();
    };

    const handleOnOpenChange = (open: boolean) => {
      setIsOpen(open);
      if (onMenuClose && !open) {
        onMenuClose();
      }
    };

    const handleOnSelectItem = (value_: string) => {
      setIsOpen(false);
      setInternalValue(value_);

      if (onSelectNextChange) {
        const event = {
          target: { name, value: value_ },
          currentTarget: { name, value: value_ },
          type: 'change',
          bubbles: true,
        } as unknown as React.ChangeEvent<HTMLSelectElement>;

        onSelectNextChange(event);

        if (onBlur) {
          const event = {
            target: { name, value: value_ },
            currentTarget: { name, value: value_ },
            type: 'blur',
            bubbles: true,
          } as unknown as any;
          onBlur?.(event);
        }
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !disabled) {
        handleOnClick();
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const relatedTarget = event.relatedTarget as Node | null;

      // Ignore blur if focus moves into the popover menu or the chevron icon.
      if (
        (relatedTarget &&
          (listRef.current?.contains(relatedTarget) ||
            iconEndRef.current?.contains(relatedTarget))) ||
        isPointerDownOnMenu.current
      ) {
        setTimeout(() => (isPointerDownOnMenu.current = false), 0);
        return;
      }

      if (onBlur) {
        const value = (controlledValue ?? internalValue ?? '') as string;
        const synthetic = {
          target: { name, value },
          currentTarget: { name, value },
          type: 'blur',
          bubbles: true,
        } as unknown as React.FocusEvent<HTMLInputElement>;
        onBlur(synthetic);
      }
    };

    if (enableSearch) {
      return (
        <SelectSearch
          {...props}
          value={internalValue}
          onChange={onSelectNextChange}
          disabled={disabled}
          ref={inputRef}
          onBlur={onBlur}
          name={name}
          placeholder={placeholder}
        >
          {children}
        </SelectSearch>
      );
    }

    return (
      <div
        aria-disabled={disabled}
        className={cn('gi-select-next', props.className)}
      >
        <InputText
          {...props}
          autoComplete="off"
          aria-label="Select an option"
          aria-disabled={disabled}
          disabled={disabled}
          placeholder={
            placeholder ??
            t('select.next.placeholder', { defaultValue: 'Search' })
          }
          readOnly
          inputClassName="gi-cursor-pointer"
          iconEndClassName={cn({
            'gi-cursor-pointer': !disabled,
            'gi-cursor-not-allowed': disabled,
            'gi-pointer-events-none': disabled,
          })}
          iconEnd={isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          onIconEndClick={handleOnClick}
          ref={inputRef}
          iconEndRef={iconEndRef}
          value={inputValue}
          onClick={handleOnClick}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          name={name}
        />
        <Popover
          triggerRef={inputRef}
          extraRefs={[iconEndRef]}
          onOpenChange={handleOnOpenChange}
          open={isOpen}
          maxHeight={304}
        >
          <SelectMenu
            ref={listRef as any}
            onChange={handleOnSelectItem}
            enableSearch={enableSearch}
          >
            {validOptions.map((child, optionIndex) => {
              const type = (child?.type as any)?.componentType;

              if (type === 'SelectItemNext') {
                const typedChild = child as SelectNextOptionItemElement;
                return (
                  <SelectMenuOption
                    key={`SelectItemNext-${typedChild.props.value.toString()}`}
                    {...typedChild.props}
                    selected={
                      internalValue?.toString() ===
                      typedChild.props.value.toString()
                    }
                    index={optionIndex}
                  />
                );
              } else if (type === 'SelectGroupItemNext') {
                const typedChild = child as SelectNextGroupItemElement;

                const groupOptions = Children.toArray(typedChild.props.children)
                  .filter((child) => isValidElement(child))
                  .map((optionChild, index) => {
                    const optionProps = (
                      optionChild as SelectNextOptionItemElement
                    ).props;
                    return (
                      <SelectMenuOption
                        key={`SelectGroupItemNext-SelectItemNext-${optionProps.value.toString()}`}
                        {...optionProps}
                        selected={
                          internalValue?.toString() ===
                          optionProps.value.toString()
                        }
                        onChange={handleOnSelectItem}
                        index={index}
                      />
                    );
                  });

                return (
                  <SelectMenuGroupItem
                    label={typedChild.props.label}
                    key={`option-group-${optionIndex}`}
                  >
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
  },
);

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
