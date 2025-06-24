'use client';
import {
  Children,
  FC,
  isValidElement,
  useEffect,
  useRef,
  useReducer,
} from 'react';
import { cn } from '../cn.js';
import { InputText } from '../input-text/input-text.js';
import { Popover } from '../popover/popover.js';
import { SelectMenu, SelectMenuOption } from '../select/select-menu.js';
import {
  AUTOCOMPLETE_ACTIONS,
  AutocompleteAction,
  AutocompleteState,
  AutocompleteItemProps,
  AutocompleteOptionItemElement,
  AutocompleteProps,
} from './types.js';

const {
  ON_RESET,
  ON_SELECT_ITEM,
  SET_INPUT_VALUE,
  SET_IS_OPEN,
  SET_OPTIONS,
  TOGGLE_CLEAR_BUTTON,
  SET_VALUE,
  SET_HIGHLIGHTED_INDEX,
} = AUTOCOMPLETE_ACTIONS;

const reducer = (
  state: AutocompleteState,
  action: AutocompleteAction,
): AutocompleteState => {
  switch (action.type) {
    case SET_IS_OPEN: {
      return { ...state, isOpen: action.payload };
    }
    case SET_INPUT_VALUE: {
      return { ...state, inputValue: action.payload };
    }
    case SET_OPTIONS: {
      return { ...state, autocompleteOptions: action.payload };
    }
    case SET_VALUE: {
      return { ...state, value: action.payload };
    }
    case TOGGLE_CLEAR_BUTTON: {
      return {
        ...state,
        isClearButtonEnabled: action.payload || !!state.inputValue,
      };
    }
    case ON_RESET: {
      return {
        ...state,
        value: '',
        inputValue: '',
        isClearButtonEnabled: false,
        highlightedIndex: -1,
      };
    }
    case ON_SELECT_ITEM: {
      return {
        ...state,
        inputValue: action.payload.inputValue,
        value: action.payload.value,
        isOpen: false,
        isClearButtonEnabled: true,
      };
    }
    case SET_HIGHLIGHTED_INDEX: {
      return { ...state, highlightedIndex: action.payload, isOpen: true };
    }
    default: {
      return state;
    }
  }
};

const filterChildOption = (
  child: AutocompleteOptionItemElement,
  inputValue: string,
) => {
  const label = child.props.children?.toString().toLowerCase() || '';
  const value = child.props.value?.toLowerCase();
  const input = inputValue.toLowerCase();
  return label.includes(input) || value.includes(input);
};

const isAutocompleteItem = (
  child: React.ReactNode,
): child is AutocompleteOptionItemElement => {
  const type =
    (child as any)?.type?.componentType || (child as any)?.props?.__mdxType;

  return isValidElement(child) && type === 'AutocompleteItem';
};
const getValidChildren = (children: React.ReactNode) =>
  Children.toArray(children).filter((child) => isAutocompleteItem(child)) || [];

const getOptionLabelByValue = (
  children: AutocompleteProps['children'],
  value: string,
) => {
  return (
    getValidChildren(children).find((child) => child.props.value === value)
      ?.props.children || ''
  ).toString();
};

export const Autocomplete: FC<AutocompleteProps> = ({
  disabled,
  children,
  defaultValue = '',
  onChange: onAutocompleteChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const iconEndRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
    value: defaultValue,
    inputValue: defaultValue
      ? getOptionLabelByValue(children, defaultValue)
      : '',
    autocompleteOptions: children,
    isClearButtonEnabled: false,
    highlightedIndex: -1,
  });

  const options = getValidChildren(state.autocompleteOptions);

  const propagateOnChange = (inputValue: string) => {
    if (onAutocompleteChange && inputRef.current) {
      const syntheticEvent = {
        target: {
          ...inputRef.current,
          value: inputValue,
        },
        currentTarget: inputRef.current,
        bubbles: true,
        isTrusted: true,
      } as React.ChangeEvent<HTMLInputElement>;

      onAutocompleteChange(syntheticEvent);
    }
  };

  const handleOnOpenChange = (isOpen: boolean) => {
    dispatch({ type: SET_IS_OPEN, payload: isOpen });
    if (!isOpen) {
      dispatch({ type: TOGGLE_CLEAR_BUTTON, payload: false });
    }
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement> & { __origin: string },
  ) => {
    const {
      target: { value },
    } = event;

    if (event.__origin === 'clear_button') {
      dispatch({ type: ON_RESET });
      dispatch({ type: SET_IS_OPEN, payload: false });
      propagateOnChange('');
    } else {
      dispatch({ type: SET_INPUT_VALUE, payload: value });
      if (value) {
        dispatch({ type: SET_IS_OPEN, payload: true });
      }
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
    propagateOnChange(value);
  };

  useEffect(() => {
    const option = options.find(
      (child): child is AutocompleteOptionItemElement =>
        isAutocompleteItem(child) && child.props.value === state.value,
    );
    if (option) {
      dispatch({
        type: SET_INPUT_VALUE,
        payload: option.props.children?.toString() || '',
      });
    }
  }, [state.value]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    const isResetState = state.inputValue === '' && state.value === '';
    if (isResetState) {
      inputRef.current?.focus();
    }
  }, [state.isClearButtonEnabled]);

  useEffect(() => {
    if (state.isOpen) {
      inputRef.current?.focus();
    } else {
      const label = getOptionLabelByValue(children, state.value);
      if (label && state.value) {
        dispatch({
          type: SET_INPUT_VALUE,
          payload: label,
        });
        dispatch({ type: SET_IS_OPEN, payload: false });
      } else {
        dispatch({ type: ON_RESET });
      }
      dispatch({ type: TOGGLE_CLEAR_BUTTON });
    }
  }, [state.isOpen]);

  useEffect(() => {
    if (state.inputValue && children) {
      const validChildren = getValidChildren(children).filter((child) =>
        filterChildOption(child, state.inputValue),
      );
      dispatch({ type: SET_OPTIONS, payload: validChildren });
      if (!state.isOpen && !state.value) {
        dispatch({ type: SET_IS_OPEN, payload: true });
      }
    } else {
      dispatch({ type: SET_VALUE, payload: '' });
      dispatch({ type: SET_OPTIONS, payload: children });
    }
  }, [state.inputValue]);

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const total = options.length;

    const findNextEnabledIndex = (
      currentIndex: number,
      direction: 1 | -1,
    ): number => {
      let index = currentIndex;
      for (let step = 0; step < total; step++) {
        index = (index + direction + total) % total;
        const candidateOption = options[index] as AutocompleteOptionItemElement;
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
      const selected = options[
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
        placeholder={state.inputValue || 'Type to Search'}
        iconEndClassName={cn({
          'gi-cursor-pointer': !disabled,
          'gi-cursor-not-allowed gi-pointer-events-none': disabled,
        })}
        iconEnd={state.isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
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
            { name: 'preventOverflow', options: { padding: 8 } },
            {
              name: 'flip',
              options: { fallbackPlacements: ['top', 'right', 'left'] },
            },
          ],
        }}
      >
        <SelectMenu onChange={handleOnSelectItem}>
          {options.map((child, index) =>
            isAutocompleteItem(child) ? (
              <SelectMenuOption
                {...child.props}
                key={`AutocompleteItem-${child.props.value}`}
                selected={state.value === child.props.value}
                isHighlighted={index === state.highlightedIndex}
              />
            ) : null,
          )}
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
