'use client';
import { FC, useRef, ChangeEvent, isValidElement, Children } from 'react';
import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';
import { InputText } from '../input-text/input-text.js';
import { Popover } from '../popover/popover.js';
import {
  SelectMenu,
  SelectMenuGroupItem,
  SelectMenuOption,
} from '../select/select-menu.js';
import {
  SelectNextGroupItemElement,
  SelectNextOptionItemElement,
} from '../select/types.js';
import {
  AUTOCOMPLETE_ACTIONS,
  AutocompleteItemProps,
  AutocompleteOptionItemElement,
  AutocompleteProps,
} from './types.js';
import { useAutocompleteController } from './use-autocomplete-controller.js';

const {
  ON_RESET,
  ON_SELECT_ITEM,
  SET_INPUT_VALUE,
  SET_IS_OPEN,
  TOGGLE_CLEAR_BUTTON,
  SET_HIGHLIGHTED_INDEX,
} = AUTOCOMPLETE_ACTIONS;

const getIconEnd = (isOpen: boolean) =>
  isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

const propagateOnChange =
  (onChange: any) => (inputValue: string, inputRef: any) => {
    if (onChange && inputRef.current) {
      const syntheticEvent = {
        target: {
          ...inputRef.current,
          value: inputValue,
        },
        currentTarget: inputRef.current,
        bubbles: true,
        isTrusted: true,
      } as ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    }
  };

export const Autocomplete: FC<AutocompleteProps> = (props) => {
  const iconEndRef = useRef<HTMLDivElement>(null);
  const {
    disabled,
    children,
    placeholder,
    onSelectItem,
    isLoading,
    freeSolo = false,
    onChange: onAutocompleteChange,
  } = props;

  const { state, dispatch, inputRef, getOptionLabelByValue, listRef } =
    useAutocompleteController({
      ...props,
      onChange: propagateOnChange(onAutocompleteChange),
    });

  const handleOnOpenChange = (isOpen: boolean) => {
    dispatch({ type: SET_IS_OPEN, payload: isOpen });
    if (!isOpen) {
      dispatch({ type: TOGGLE_CLEAR_BUTTON, payload: false });
    }
  };

  const handleClearInput = () => {
    dispatch({ type: ON_RESET });
    dispatch({ type: SET_IS_OPEN, payload: false });
    propagateOnChange(onAutocompleteChange)('', inputRef);
  };

  const handleUpdateInput = (value: string) => {
    dispatch({ type: SET_INPUT_VALUE, payload: value });
    propagateOnChange(onAutocompleteChange)(value, inputRef);
    if (value) {
      dispatch({ type: SET_IS_OPEN, payload: true });
    }
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement> & { __origin: string },
  ) => {
    const {
      target: { value },
    } = event;

    if (event.__origin === 'clear_button') {
      handleClearInput();
    } else {
      handleUpdateInput(value);
    }

    dispatch({ type: TOGGLE_CLEAR_BUTTON });
    setTimeout(() => inputRef.current?.focus());
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

  const handleOnSelectItem = (value: string) => {
    dispatch({
      type: ON_SELECT_ITEM,
      payload: {
        inputValue: getOptionLabelByValue(children, value),
        value,
      },
    });
    if (onSelectItem) {
      onSelectItem(value);
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const total = state.autocompleteOptions.length;

    const findNextEnabledIndex = (
      currentIndex: number,
      direction: 1 | -1,
    ): number => {
      let index = currentIndex;
      for (let step = 0; step < total; step++) {
        index = (index + direction + total) % total;
        const candidateOption = state.autocompleteOptions[
          index
        ] as AutocompleteOptionItemElement;
        // it skips disabled items
        if (!candidateOption.props.disabled) {
          return index;
        }
      }
      return -1;
    };

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      dispatch({
        type: SET_HIGHLIGHTED_INDEX,
        payload: state.isOpen
          ? findNextEnabledIndex(state.highlightedIndex, 1)
          : 0,
      });
      dispatch({ type: SET_IS_OPEN, payload: true });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      dispatch({
        type: SET_HIGHLIGHTED_INDEX,
        payload: findNextEnabledIndex(state.highlightedIndex, -1),
      });
      dispatch({ type: SET_IS_OPEN, payload: true });
    } else if (event.key === 'Enter' && state.highlightedIndex >= 0) {
      const selected = state.autocompleteOptions[
        state.highlightedIndex
      ] as AutocompleteOptionItemElement;
      if (selected && selected.props.value && !selected.props.disabled) {
        handleOnSelectItem(selected.props.value);
      }
    }
  };

  return (
    <div
      aria-disabled={disabled}
      className={cn('gi-autocomplete gi-not-prose', props.className)}
    >
      <InputText
        onKeyDown={handleOnKeyDown}
        onIconEndClick={handleOnIconEndClick}
        onChange={handleOnChange}
        onClick={handleOnClick}
        clearButtonEnabled={state.isClearButtonEnabled}
        inputActionPosition="beforeSuffix"
        aria-label={t('autocomplete.placeholder')}
        aria-disabled={disabled}
        disabled={disabled}
        placeholder={placeholder || t('autocomplete.placeholder')}
        iconEndClassName={cn({
          'gi-cursor-pointer': !disabled && !freeSolo,
          'gi-cursor-not-allowed gi-pointer-events-none': disabled && !freeSolo,
        })}
        iconEnd={freeSolo ? undefined : getIconEnd(state.isOpen)}
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
          onChange={handleOnSelectItem}
          isLoading={isLoading}
          showNoData={!state.autocompleteOptions?.length}
          ref={listRef}
        >
          {renderSelectMenuOptions(
            state.autocompleteOptions,
            state,
            handleOnSelectItem,
          )}
        </SelectMenu>
      </Popover>
    </div>
  );
};

export const renderSelectMenuOptions = (
  options: any[],
  state: any,
  handleOnSelectItem: (value: string) => void,
): React.ReactNode[] => {
  return options.map((child, index) => {
    if (state.optionType === 'AutocompleteItem') {
      return (
        <SelectMenuOption
          {...child.props}
          key={`AutocompleteItem-${child.props.value}`}
          selected={state.value === child.props.value}
          isHighlighted={index === state.highlightedIndex}
          index={index}
        />
      );
    } else if (state.optionType === 'AutocompleteGroupItem') {
      const typedChild = child as SelectNextGroupItemElement;

      const groupOptions = Children.toArray(typedChild.props.children)
        .filter((child) => isValidElement(child))
        .map((optionChild) => {
          const optionProps = (optionChild as SelectNextOptionItemElement)
            .props;
          return (
            <SelectMenuOption
              key={`SelectGroupItemNext-SelectItemNext-${optionProps.value.toString()}`}
              {...optionProps}
              selected={state.value.toString() === optionProps.value.toString()}
              onChange={handleOnSelectItem}
              index={index}
            />
          );
        });

      return (
        <SelectMenuGroupItem
          label={typedChild.props.label}
          key={`Group-${typedChild.props.label}`}
        >
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
