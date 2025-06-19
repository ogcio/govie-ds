import {
  Children,
  FC,
  isValidElement,
  useEffect,
  useRef,
  useReducer,
  ReactElement,
} from 'react';
import { cn } from '../cn.js';
import { InputText } from '../input-text/input-text.js';
import {
  AUTOCOMPLETE_ACTIONS,
  AutocompleteAction,
  AutocompleteState,
} from '../input-text/type.js';
import { Popover } from '../popover/popover.js';

import { SelectMenu, SelectMenuOption } from '../select/select-menu.js';
import {
  AutocompleteItemProps,
  AutocompleteOptionItemElement,
  AutocompleteProps,
} from './types.js';

export const AutocompleteItem: FC<AutocompleteItemProps> = () => null;
Object.defineProperty(AutocompleteItem, 'componentType', {
  value: 'AutocompleteItem',
  writable: false,
  enumerable: false,
});

const {
  ON_CLEAR,
  ON_SELECT_ITEM,
  SET_INPUT_VALUE,
  SET_IS_OPEN,
  SET_OPTIONS,
  TOGGLE_CLEAR_BUTTON,
  SET_VALUE,
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
    case ON_CLEAR: {
      return {
        ...state,
        value: '',
        inputValue: '',
        isClearButtonEnabled: false,
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
    default: {
      return state;
    }
  }
};

const filterChildOption = (child: any, inpValue: string) => {
  const type = (child?.type as any)?.componentType;

  if (type === 'AutocompleteItem') {
    const typedChild = child as AutocompleteOptionItemElement;
    const optionLabel =
      typedChild?.props?.children?.toString()?.toLowerCase() || '';
    const optionValue = typedChild?.props?.value?.toLowerCase();

    return (
      optionLabel.includes(inpValue.toLowerCase()) ||
      optionValue.includes(inpValue.toLowerCase())
    );
  }

  return false;
};

const getOptionLabelByValue = (
  children: ReactElement<AutocompleteItemProps>[],
  value: string,
) => {
  const optionLabel = children
    ?.filter((child) => filterChildOption(child, value))
    ?.find((child) => child?.props?.value === value)?.props?.children;

  return optionLabel || '';
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
    inputValue: '',
    autocompleteOptions: children,
    isClearButtonEnabled: false,
  });

  const options = Children.toArray(state.autocompleteOptions).filter((child) =>
    isValidElement(child),
  ) as React.ReactElement[];

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
      dispatch({ type: ON_CLEAR });
      dispatch({ type: SET_IS_OPEN, payload: false });
      propagateOnChange('');
    } else {
      dispatch({ type: SET_INPUT_VALUE, payload: value });
      if (value) {
        dispatch({ type: SET_IS_OPEN, payload: true });
      }
    }

    dispatch({ type: TOGGLE_CLEAR_BUTTON });
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
    const found: AutocompleteOptionItemElement | undefined = options.find(
      (child): child is AutocompleteOptionItemElement => {
        const type = (child.type as any)?.componentType;
        if (type === 'AutocompleteItem') {
          const item = child as AutocompleteOptionItemElement;
          return item.props.value === state.value;
        }
        return false;
      },
    );

    if (found) {
      dispatch({
        type: SET_INPUT_VALUE,
        payload: found.props.children?.toString() || '',
      });
    }
  }, [state.value]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    inputRef.current?.focus();
  }, [state.isClearButtonEnabled]);

  useEffect(() => {
    if (state.isOpen) {
      inputRef.current?.focus();
    } else {
      const optionLabel = getOptionLabelByValue(children, state.value);

      if (optionLabel && state.value) {
        dispatch({
          type: SET_INPUT_VALUE,
          payload: optionLabel,
        });
        dispatch({ type: SET_IS_OPEN, payload: false });
        dispatch({ type: TOGGLE_CLEAR_BUTTON });
      } else {
        dispatch({ type: ON_CLEAR });
        dispatch({ type: TOGGLE_CLEAR_BUTTON });
      }
    }
  }, [state.isOpen]);

  useEffect(() => {
    if (state.inputValue && children) {
      const newChildrenOptions = children.filter((child) =>
        filterChildOption(child, state.inputValue),
      );
      dispatch({ type: SET_OPTIONS, payload: newChildrenOptions });
      if (!state.isOpen && !state.value) {
        dispatch({ type: SET_IS_OPEN, payload: true });
      }
    } else {
      dispatch({ type: SET_VALUE, payload: '' });
      dispatch({ type: SET_OPTIONS, payload: children });
      dispatch({ type: SET_IS_OPEN, payload: true });
    }
  }, [state.inputValue]);

  return (
    <div
      {...props}
      aria-disabled={disabled}
      className={cn('gi-autocomplete', props.className)}
    >
      <InputText
        onIconEndClick={handleOnIconEndClick}
        onChange={handleOnChange}
        onClick={handleOnClick}
        clearButtonEnabled={state.isClearButtonEnabled}
        inputActionPosition="beforeSuffix"
        aria-label="Select an option"
        aria-disabled={disabled}
        disabled={disabled}
        placeholder={state.inputValue || 'Select'}
        iconEndClassName={cn({
          'gi-cursor-pointer': !disabled,
          'gi-cursor-not-allowed': disabled,
          'gi-pointer-events-none': disabled,
        })}
        iconEnd={state.isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
        ref={inputRef}
        iconEndRef={iconEndRef}
        value={state.inputValue}
        defaultValue={defaultValue}
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
          {options.map((child) => {
            const type = (child?.type as any)?.componentType;

            if (type === 'AutocompleteItem') {
              const typedChild = child as AutocompleteOptionItemElement;

              return (
                <SelectMenuOption
                  key={`AutocompleteItem-${typedChild.props.value.toString()}`}
                  {...typedChild.props}
                  selected={
                    state.value?.toString() ===
                    typedChild.props.value.toString()
                  }
                />
              );
            }
            return null;
          })}
        </SelectMenu>
      </Popover>
    </div>
  );
};
