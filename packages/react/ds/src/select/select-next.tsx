'use client';
import {
  Children,
  FC,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { cn } from '../cn.js';
import { useDomId } from '../hooks/use-dom-id.js';
import { useScrollHighlightedItem } from '../hooks/use-scroll-highlighted-item.js';
import { translate as t } from '../i18n/utility.js';
import { InputText } from '../input-text/input-text.js';
import { Popover } from '../popover/popover.js';
import { cycleEnabledIndex } from '../utilities.js';
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
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    useScrollHighlightedItem(listRef, highlightedIndex);

    const childrenElements = Children.toArray(children).filter((child) =>
      isValidElement(child),
    ) as React.ReactElement<{ hidden?: boolean }>[];

    useEffect(() => {
      let found: SelectNextOptionItemElement | undefined;

      for (const child of childrenElements) {
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
    }, [internalValue, childrenElements]);

    useEffect(() => {
      if (!isOpen) {
        setHighlightedIndex(-1);
      }
    }, [isOpen]);

    useEffect(() => {
      if (controlledValue !== undefined) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue]);

    const handleOnClick = () => {
      if (disabled) {
        return;
      }
      setIsOpen(true);
      inputRef.current?.focus();
    };

    const handleOnOpenChange = (open: boolean) => {
      setIsOpen(open);
      if (!open) {
        onMenuClose?.();
      }
    };

    const selectValue = (value_: string) => {
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

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
      if (disabled) {
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp': {
          event.preventDefault();
          const direction = event.key === 'ArrowDown' ? 1 : -1;

          setHighlightedIndex((previous) => {
            const start =
              previous === -1 ? (direction === -1 ? 0 : -1) : previous;
            return cycleEnabledIndex(childrenElements, start, direction);
          });
          setIsOpen(true);
          break;
        }

        case 'Enter':
        case 'NumpadEnter': {
          event.preventDefault();
          if (
            isOpen &&
            highlightedIndex != -1 &&
            childrenElements[highlightedIndex]
          ) {
            const opt = childrenElements[highlightedIndex];
            if (!(opt.props as any)?.disabled) {
              selectValue((opt.props as any).value);
            }
          } else {
            setIsOpen(true);
          }
          break;
        }

        case 'Tab': {
          setIsOpen(false);
          break;
        }

        case 'Escape': {
          event.preventDefault();
          setIsOpen(false);
          break;
        }
      }
    }, []);

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const relatedTarget = event.relatedTarget as Node | null;

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

    const srOnlyLabelId = useDomId();
    const labelText =
      (props as any)['aria-label'] ??
      t('select.next.placeholder', { defaultValue: 'Select' });

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.setAttribute('aria-labelledby', srOnlyLabelId);
      }
    }, [srOnlyLabelId, enableSearch]);

    if (enableSearch) {
      return (
        <div className={cn('gi-select-next', props.className)}>
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
        </div>
      );
    }

    return (
      <div
        aria-disabled={disabled}
        className={cn('gi-select-next', props.className)}
      >
        <span id={srOnlyLabelId} className="gi-sr-only">
          {labelText}
        </span>

        <InputText
          {...props}
          autoComplete="off"
          aria-label={labelText}
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
            'gi-cursor-not-allowed gi-pointer-events-none': disabled,
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
          options={{
            placement: 'bottom-start',
            strategy: 'absolute',
            modifiers: [
              { name: 'offset', options: { offset: [0, 4] } },
              { name: 'flip', options: { fallbackPlacements: ['top'] } },
            ],
          }}
        >
          <SelectMenu
            ref={listRef as any}
            onChange={(value) => {
              setIsOpen(false);
              selectValue(value);
            }}
            enableSearch={enableSearch}
          >
            {childrenElements.map((child, optionIndex) => {
              const type = (child?.type as any)?.componentType;

              if (type === 'SelectItemNext') {
                const typedChild = child as SelectNextOptionItemElement;
                return (
                  <SelectMenuOption
                    key={`SelectItemNext-${typedChild.props.value.toString()}`}
                    {...typedChild.props}
                    isHighlighted={highlightedIndex === optionIndex}
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
                        isHighlighted={highlightedIndex === optionIndex}
                        selected={
                          internalValue?.toString() ===
                          optionProps.value.toString()
                        }
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
