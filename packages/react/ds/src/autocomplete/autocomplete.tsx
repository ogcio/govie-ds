'use client';
import { FC, useRef, ChangeEvent } from 'react';
import { cn } from '../cn.js';
import { InputText } from '../input-text/input-text.js';
import { Popover } from '../popover/popover.js';
import { SelectMenu, SelectMenuOption } from '../select/select-menu.js';
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
  isOpen ? 'arrow_drop_up' : 'arrow_drop_down';

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

  const { state, dispatch, inputRef, getOptionLabelByValue } =
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
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      dispatch({
        type: SET_HIGHLIGHTED_INDEX,
        payload: findNextEnabledIndex(state.highlightedIndex, -1),
      });
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
      {...props}
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
        aria-label="Type to Search"
        aria-disabled={disabled}
        disabled={disabled}
        placeholder={placeholder || 'Type to Search'}
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
        options={{
          placement: 'bottom-start',
          strategy: 'absolute',
          modifiers: [
            { name: 'offset', options: { offset: [0, 4] } },
            { name: 'preventOverflow', options: { padding: 8 } },
            {
              name: 'flip',
              options: { fallbackPlacements: ['top', 'right', 'left'] },
            },
          ],
        }}
      >
        <SelectMenu
          onChange={handleOnSelectItem}
          isLoading={isLoading}
          showNoData={!state.autocompleteOptions?.length}
        >
          {state.autocompleteOptions?.map((child, index) => (
            <SelectMenuOption
              {...child.props}
              key={`AutocompleteItem-${child.props.value}`}
              selected={state.value === child.props.value}
              isHighlighted={index === state.highlightedIndex}
            />
          ))}
        </SelectMenu>
      </Popover>
    </div>
  );
};

export const AutocompleteItem: FC<AutocompleteItemProps> = () => null;
Object.defineProperty(AutocompleteItem, 'componentType', {
  value: 'AutocompleteItem',
  writable: false,
  enumerable: false,
});
