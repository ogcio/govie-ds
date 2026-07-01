'use client';
import type { FC, ChangeEvent } from 'react';
import React, {
  useRef,
  isValidElement,
  Children,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
} from 'react';
import { tv } from 'tailwind-variants';
import clsx from 'clsx';
import { useDomId } from '@/hooks/use-dom-id';
import { translate as t } from '@/i18n/utility';
import { InputText } from '@/input-text/input-text';
import { Popover } from '@/popover/popover';
import { SelectMenu, SelectMenuGroupItem, SelectMenuOption } from '@/select/select-menu';
import type { SelectNextGroupItemElement, SelectNextOptionItemElement } from '@/select/types';
import { Tag, TagTypeEnum } from '@/tag/tag';
import type { AutocompleteItemProps, AutocompleteOptionItemElement, AutocompleteProps } from './types';
import { AUTOCOMPLETE_ACTIONS } from './types';
import { useAutocompleteController } from './use-autocomplete-controller';
import KeyboardArrowDownIcon from '@/atoms/icons/KeyboardArrowDown';

const {
  ON_RESET,
  ON_SELECT_ITEM,
  SET_INPUT_VALUE,
  SET_IS_OPEN,
  SET_OPTIONS,
  TOGGLE_CLEAR_BUTTON,
  SET_HIGHLIGHTED_INDEX,
  SET_VALUE,

  CLEAR_ALL_SELECTIONS,
  SET_SELECTED_VALUES,
} = AUTOCOMPLETE_ACTIONS;

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>((props, ref) => {
  const iconEndRef = useRef<HTMLDivElement>(null);
  const {
    disabled = false,
    children,
    placeholder,
    onSelectItem,
    isLoading,
    freeSolo = false,
    onChange: onAutocompleteChange,
    onBlur: onAutocompleteBlur,
    name,
    value,
    id,
    multiple,
    onSelectChange,
    defaultSelectedValues,
    selectedValues,
    clearAllLabel,
  } = props;
  const isPointerDownOnMenu = useRef(false);
  const styles = autocompleteStyles({ freeSolo, disabled });

  const { state, dispatch, inputRef, getOptionLabelByValue, listRef, debouncedFilter, validChildren } =
    useAutocompleteController({
      ...props,
      multiple,
      defaultSelectedValues,
      onChange: propagateOnChange(onAutocompleteChange, name),
    });
  const listboxId = useDomId();

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  useEffect(() => {
    if (value !== undefined) {
      dispatch({ type: SET_VALUE, payload: value });
      dispatch({
        type: SET_INPUT_VALUE,
        payload: getOptionLabelByValue(children, value),
      });
      dispatch({ type: TOGGLE_CLEAR_BUTTON });
    }
  }, [value]);

  useEffect(() => {
    if (
      selectedValues &&
      (selectedValues.length !== state.selectedValues.size ||
        selectedValues.some((value) => !state.selectedValues.has(value)))
    ) {
      dispatch({ type: SET_SELECTED_VALUES, payload: selectedValues });
    }
  }, [selectedValues]);

  const labelText = (props as any)['aria-label'] ?? t('autocomplete.placeholder', { defaultValue: 'Type to Search' });

  const handleOnOpenChange = (isOpen: boolean) => {
    dispatch({ type: SET_IS_OPEN, payload: isOpen });
    if (!isOpen) {
      dispatch({ type: TOGGLE_CLEAR_BUTTON, payload: false });
    }
  };

  const handleClearInput = () => {
    dispatch({ type: ON_RESET });
    dispatch({ type: SET_IS_OPEN, payload: false });
    propagateOnChange(onAutocompleteChange, name)('');
  };

  const handleUpdateInput = (value: string) => {
    dispatch({ type: SET_INPUT_VALUE, payload: value });
    if (freeSolo) {
      propagateOnChange(onAutocompleteChange, name)(value);
    }
    if (value) {
      dispatch({ type: SET_IS_OPEN, payload: true });
    }

    debouncedFilter(value);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> & { __origin: string }) => {
    const {
      target: { value },
    } = event;

    if (event.__origin === 'clear_button') {
      handleClearInput();
    }

    if (/^\s/.test(value)) {
      return;
    }

    handleUpdateInput(value);
    dispatch({ type: TOGGLE_CLEAR_BUTTON });
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleOnIconEndClick = () => {
    dispatch({ type: SET_IS_OPEN, payload: !state.isOpen });
    inputRef.current?.focus();
  };

  const handleOnClick = () => {
    if (!state.isOpen) {
      dispatch({
        type: SET_IS_OPEN,
        payload: true,
      });
    }
  };

  const handleOnSelectItem = useCallback(
    (value: string) => {
      dispatch({
        type: ON_SELECT_ITEM,
        payload: {
          inputValue: getOptionLabelByValue(children, value),
          value,
        },
      });

      propagateOnChange(onAutocompleteChange, name)(value);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);

      onSelectItem?.(value);
    },
    [children, dispatch, name, onAutocompleteChange, onSelectItem],
  );

  const handleOnToggleItem = useCallback(
    (toggleValue: string) => {
      const next = new Set(state.selectedValues);
      if (!next.delete(toggleValue)) {
        next.add(toggleValue);
      }
      dispatch({ type: SET_SELECTED_VALUES, payload: [...next] });
      dispatch({ type: SET_INPUT_VALUE, payload: '' });
      debouncedFilter.cancel();
      dispatch({ type: SET_OPTIONS, payload: validChildren });
      onSelectChange?.([...next]);
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [dispatch, state.selectedValues, onSelectChange, validChildren, debouncedFilter],
  );

  const handleClearAll = useCallback(() => {
    debouncedFilter.cancel();
    dispatch({ type: CLEAR_ALL_SELECTIONS });
    dispatch({ type: SET_OPTIONS, payload: validChildren });
    onSelectChange?.([]);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [dispatch, onSelectChange, validChildren, debouncedFilter]);

  const handleOnBlur = (event: any) => {
    const { relatedTarget } = event;

    if (
      (relatedTarget && (listRef.current?.contains(relatedTarget) || iconEndRef.current?.contains(relatedTarget))) ||
      isPointerDownOnMenu.current
    ) {
      setTimeout(() => (isPointerDownOnMenu.current = false), 0);
      return;
    }

    const current = (state.value as string | undefined) ?? (state.inputValue as string) ?? '';
    propagateOnBlur(onAutocompleteBlur, name)(current);
  };

  const handleChange = multiple ? handleOnToggleItem : handleOnSelectItem;

  const hasSelections = multiple && state.selectedValues.size > 0;
  const CLEAR_ALL_INDEX = -2;

  const handleOnKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp': {
          event.preventDefault();
          dispatch({ type: SET_IS_OPEN, payload: true });
          const direction = event.key === 'ArrowDown' ? 1 : -1;
          const enabledIndices = state.autocompleteOptions.flatMap(
            (option: AutocompleteOptionItemElement, index: number) => (option.props.disabled ? [] : [index]),
          );
          const items = hasSelections ? [CLEAR_ALL_INDEX, ...enabledIndices] : enabledIndices;
          const currentPos = items.indexOf(state.highlightedIndex);
          const startPos = currentPos === -1 ? (direction === 1 ? -1 : 0) : currentPos;
          const next = items[(startPos + direction + items.length) % items.length];

          dispatch({ type: SET_HIGHLIGHTED_INDEX, payload: next });
          break;
        }
        case 'Enter':
        case 'NumpadEnter': {
          event.preventDefault();
          dispatch({ type: SET_IS_OPEN, payload: true });
          if (state.highlightedIndex === CLEAR_ALL_INDEX && hasSelections) {
            handleClearAll();
          } else if (state.highlightedIndex >= 0) {
            const selected = state.autocompleteOptions[state.highlightedIndex] as AutocompleteOptionItemElement;
            if (selected && selected.props.value && !selected.props.disabled) {
              handleChange(selected.props.value);
            }
          }
          break;
        }
        case 'Tab': {
          dispatch({ type: SET_IS_OPEN, payload: false });
          break;
        }
        case 'Escape': {
          dispatch({ type: SET_IS_OPEN, payload: false });
          break;
        }
        default: {
          break;
        }
      }
    },
    [state.highlightedIndex, state.autocompleteOptions, state.isOpen, handleChange, hasSelections, handleClearAll],
  );

  return (
    <div aria-disabled={disabled} className={clsx(styles.root(), props.className)}>
      <InputText
        role="combobox"
        autoComplete="off"
        id={id}
        name={name}
        onKeyDown={handleOnKeyDown}
        onIconEndClick={handleOnIconEndClick}
        onChange={handleOnChange}
        onClick={handleOnClick}
        onBlur={handleOnBlur}
        clearButtonEnabled={state.isClearButtonEnabled}
        inputActionPosition="beforeSuffix"
        aria-label={labelText}
        aria-expanded={state.isOpen}
        aria-controls={listboxId}
        aria-activedescendant={
          state.highlightedIndex === CLEAR_ALL_INDEX
            ? `${listboxId}-clear-all`
            : state.highlightedIndex >= 0
              ? `${listboxId}-option-${state.highlightedIndex}`
              : undefined
        }
        aria-autocomplete="list"
        aria-disabled={disabled}
        disabled={disabled}
        placeholder={placeholder ?? t('autocomplete.placeholder', { defaultValue: 'Type to Search' })}
        iconStart={hasSelections ? <Tag type={TagTypeEnum.Counter} text={`${state.selectedValues.size}`} /> : undefined}
        iconEndClassName={styles.iconEnd({ isOpen: state.isOpen })}
        iconEnd={
          freeSolo ? undefined : (
            <KeyboardArrowDownIcon
              className={clsx('gi-shrink-0', {
                'gi-fill-gray-700': disabled,
              })}
            />
          )
        }
        ref={inputRef}
        iconEndRef={iconEndRef}
        value={state.inputValue}
        data-highlighted-index={state.highlightedIndex}
      />
      <Popover
        onOpenChange={handleOnOpenChange}
        triggerRef={inputRef}
        extraRefs={[iconEndRef]}
        open={state.isOpen}
        maxHeight={304}
        options={{
          placement: 'bottom-start',
          strategy: 'absolute',
          modifiers: [
            { name: 'offset', options: { offset: [0, 4] } },
            {
              name: 'flip',
              options: { fallbackPlacements: ['top'] },
            },
          ],
        }}
      >
        <SelectMenu
          onChange={handleChange}
          isLoading={isLoading}
          showNoData={!state.autocompleteOptions?.length}
          ref={listRef}
          listboxId={listboxId}
          listboxLabel={labelText}
          multiselectable={multiple || undefined}
          onClearAll={multiple ? handleClearAll : undefined}
          clearAllLabel={clearAllLabel}
          clearAllDisabled={!hasSelections}
          clearAllHighlighted={state.highlightedIndex === CLEAR_ALL_INDEX}
        >
          {renderSelectMenuOptions(state.autocompleteOptions, state, handleChange, listboxId, multiple)}
        </SelectMenu>
      </Popover>
    </div>
  );
});

export const renderSelectMenuOptions = (
  options: any[],
  state: any,
  handleOnChange: (value: string) => void,
  listboxId?: string,
  multiple?: boolean,
): React.ReactNode[] => {
  const isSelected = (optionValue: string) =>
    multiple ? state.selectedValues.has(optionValue) : state.value === optionValue;

  return options.map((child, index) => {
    if (state.optionType === 'AutocompleteItem') {
      return (
        <SelectMenuOption
          {...child.props}
          key={`AutocompleteItem-${child.props.value}`}
          id={listboxId ? `${listboxId}-option-${index}` : undefined}
          selected={isSelected(child.props.value)}
          isHighlighted={index === state.highlightedIndex}
          index={index}
          multiple={multiple}
        />
      );
    } else if (state.optionType === 'AutocompleteGroupItem') {
      const typedChild = child as SelectNextGroupItemElement;

      const groupOptions = Children.toArray(typedChild.props.children)
        .filter((child) => isValidElement(child))
        .map((optionChild) => {
          const optionProps = (optionChild as SelectNextOptionItemElement).props;
          return (
            <SelectMenuOption
              key={`SelectGroupItemNext-SelectItemNext-${optionProps.value.toString()}`}
              id={listboxId ? `${listboxId}-option-${index}` : undefined}
              {...optionProps}
              selected={isSelected(optionProps.value.toString())}
              onChange={handleOnChange}
              index={index}
              multiple={multiple}
            />
          );
        });

      return (
        <SelectMenuGroupItem label={typedChild.props.label} key={`Group-${typedChild.props.label}`}>
          {groupOptions}
        </SelectMenuGroupItem>
      );
    }

    return null;
  });
};

export const AutocompleteItem: FC<AutocompleteItemProps> = () => null;
Object.defineProperty(AutocompleteItem, 'componentType', {
  value: 'AutocompleteItem',
  writable: false,
  enumerable: false,
});

export const AutocompleteGroupItem: FC<{
  children?: any;
  label: string;
}> = () => null;
Object.defineProperty(AutocompleteGroupItem, 'componentType', {
  value: 'AutocompleteGroupItem',
  writable: false,
  enumerable: false,
});

const autocompleteStyles = tv({
  slots: {
    root: 'gi-relative gi-w-full gi-not-prose',
    iconEnd: 'motion-safe:gi-transition-transform motion-safe:gi-duration-100',
  },
  variants: {
    freeSolo: {
      true: {},
      false: {
        iconEnd: 'gi-cursor-pointer',
      },
    },
    disabled: {
      true: {
        iconEnd: 'gi-cursor-not-allowed gi-pointer-events-none',
      },
    },
    isOpen: {
      true: {
        iconEnd: 'gi-rotate-180',
      },
    },
  },
});

const propagateOnChange = (onChange: AutocompleteProps['onChange'], name?: string) => (inputValue: string) => {
  onChange?.({
    target: { name, value: inputValue },
    currentTarget: { name, value: inputValue },
    type: 'change',
    bubbles: true,
    isTrusted: true,
  } as ChangeEvent<HTMLInputElement>);
};

const propagateOnBlur = (onBlur: AutocompleteProps['onBlur'], name?: string) => (inputValue: string) => {
  if (onBlur) {
    const syntheticEvent = {
      target: { name, value: inputValue },
      currentTarget: { name, value: inputValue },
      type: 'blur',
      bubbles: true,
      isTrusted: true,
    } as unknown as any;
    onBlur(syntheticEvent);
  }
};
