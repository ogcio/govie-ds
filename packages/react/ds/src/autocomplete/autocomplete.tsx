'use client';
import React, {
  FC,
  useRef,
  ChangeEvent,
  isValidElement,
  Children,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
} from 'react';
import { cn } from '../cn.js';
import { useDomId } from '../hooks/use-dom-id.js';
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
import { cycleEnabledIndex } from '../utilities.js';
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
  SET_VALUE,
} = AUTOCOMPLETE_ACTIONS;

const getIconEnd = (isOpen: boolean) =>
  isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

const propagateOnChange =
  (onChange: AutocompleteProps['onChange'], name?: string) =>
  (inputValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: { name, value: inputValue },
        currentTarget: { name, value: inputValue },
        type: 'change',
        bubbles: true,
        isTrusted: true,
      } as ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

const propagateOnBlur =
  (onBlur: AutocompleteProps['onBlur'], name?: string) =>
  (inputValue: string) => {
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

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (props, ref) => {
    const iconEndRef = useRef<HTMLDivElement>(null);
    const {
      disabled,
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
    } = props;
    const isPointerDownOnMenu = useRef(false);

    const {
      state,
      dispatch,
      inputRef,
      getOptionLabelByValue,
      listRef,
      debouncedFilter,
      validChildren,
    } = useAutocompleteController({
      ...props,
      onChange: propagateOnChange(onAutocompleteChange, name),
    });
    const srOnlyLabelId = useDomId();

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
      if (state.inputValue && !validChildren?.length && !freeSolo) {
        handleClearInput();
        propagateOnChange(onAutocompleteChange, name)('');
      }
    }, [validChildren]);

    const labelText =
      (props as any)['aria-label'] ??
      t('autocomplete.placeholder', { defaultValue: 'Type to Search' });

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

    const handleOnChange = (
      event: React.ChangeEvent<HTMLInputElement> & { __origin: string },
    ) => {
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

      propagateOnChange(onAutocompleteChange, name)(value);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      onSelectItem?.(value);
    };

    const handleOnBlur = (event: any) => {
      const { relatedTarget } = event;

      if (
        (relatedTarget &&
          (listRef.current?.contains(relatedTarget) ||
            iconEndRef.current?.contains(relatedTarget))) ||
        isPointerDownOnMenu.current
      ) {
        setTimeout(() => (isPointerDownOnMenu.current = false), 0);
        return;
      }

      const current =
        (state.value as string | undefined) ??
        (state.inputValue as string) ??
        '';
      propagateOnBlur(onAutocompleteBlur, name)(current);
    };

    const handleOnKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
          case 'ArrowDown':
          case 'ArrowUp': {
            event.preventDefault();
            const getStartingPoint = () => {
              if (state.highlightedIndex === -1) {
                return direction === -1 ? 0 : -1;
              }
              return state.highlightedIndex;
            };

            const direction = event.key === 'ArrowDown' ? 1 : -1;
            const newIndex = cycleEnabledIndex(
              state.autocompleteOptions,
              getStartingPoint(),
              direction,
            );
            dispatch({ type: SET_HIGHLIGHTED_INDEX, payload: newIndex });
            dispatch({ type: SET_IS_OPEN, payload: true });
            break;
          }
          case 'Enter':
          case 'NumpadEnter': {
            event.preventDefault();
            dispatch({ type: SET_IS_OPEN, payload: true });
            if (state.highlightedIndex >= 0) {
              const selected = state.autocompleteOptions[
                state.highlightedIndex
              ] as AutocompleteOptionItemElement;
              if (
                selected &&
                selected.props.value &&
                !selected.props.disabled
              ) {
                handleOnSelectItem(selected.props.value);
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
      [state.highlightedIndex, state.autocompleteOptions],
    );

    return (
      <div
        aria-disabled={disabled}
        className={cn('gi-autocomplete gi-not-prose', props.className)}
      >
        <span id={srOnlyLabelId} className="gi-sr-only">
          {labelText}
        </span>

        <InputText
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
          aria-labelledby={srOnlyLabelId}
          aria-disabled={disabled}
          disabled={disabled}
          placeholder={
            placeholder ??
            t('autocomplete.placeholder', { defaultValue: 'Type to Search' })
          }
          iconEndClassName={cn({
            'gi-cursor-pointer': !disabled && !freeSolo,
            'gi-cursor-not-allowed gi-pointer-events-none':
              disabled && !freeSolo,
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
  },
);

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
