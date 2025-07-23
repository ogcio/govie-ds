import { debounce } from 'lodash';
import {
  Children,
  isValidElement,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import {
  AUTOCOMPLETE_ACTIONS,
  AutocompleteAction,
  AutocompleteState,
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
      return { ...state, autocompleteOptions: action.payload || [] };
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

const isAutocompleteItem = (
  child: React.ReactNode,
): child is AutocompleteOptionItemElement => {
  const type =
    (child as any)?.type?.componentType || (child as any)?.props?.__mdxType;

  return isValidElement(child) && type === 'AutocompleteItem';
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

export const useAutocompleteController = ({
  children,
  defaultValue = '',
  isOpen = false,
  freeSolo = false,
  onOpen,
  onClose,
  onChange,
}: { onChange?: (input: string, inputRef: any) => void } & Pick<
  AutocompleteProps,
  'children' | 'defaultValue' | 'isOpen' | 'freeSolo' | 'onOpen' | 'onClose'
>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasMountedRef = useRef(false);
  const validChildren = useMemo(
    () => getValidChildren(children || []),
    [children],
  );

  const focusInput = () => inputRef.current?.focus();
  const [state, dispatch] = useReducer(reducer, null, () => {
    return {
      isOpen: !!isOpen,
      value: defaultValue,
      inputValue: defaultValue,
      autocompleteOptions: validChildren,
      isClearButtonEnabled: false,
      highlightedIndex: -1,
    };
  });

  useEffect(() => {
    dispatch({ type: SET_OPTIONS, payload: validChildren });
  }, [validChildren]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (state.inputValue === '' && state.value === '') {
      focusInput();
    }
  }, [state.isClearButtonEnabled]);

  useEffect(() => {
    if (state.isOpen) {
      onOpen?.();
      focusInput();
    } else {
      onClose?.();
      const label = getOptionLabelByValue(children, state.value);
      if (label && state.value) {
        dispatch({
          type: SET_INPUT_VALUE,
          payload: label,
        });
        dispatch({ type: SET_IS_OPEN, payload: false });
        onChange?.(label, inputRef);
      } else if (!freeSolo) {
        dispatch({ type: ON_RESET });
        onChange?.('', inputRef);
      }
      dispatch({ type: TOGGLE_CLEAR_BUTTON });
    }
  }, [state.isOpen]);

  const debouncedFilter = useMemo(
    () =>
      debounce((input: string) => {
        if (input) {
          const filtered = validChildren.filter((child) =>
            filterChildOption(child, input),
          );
          dispatch({ type: SET_OPTIONS, payload: filtered });
          if (!state.isOpen && !state.value) {
            dispatch({ type: SET_IS_OPEN, payload: true });
          }
          if (freeSolo) {
            dispatch({ type: SET_VALUE, payload: '' });
          }
        } else {
          dispatch({ type: SET_VALUE, payload: '' });
          dispatch({ type: SET_OPTIONS, payload: validChildren });
        }
      }, 500),
    [validChildren, state.isOpen, state.value, freeSolo],
  );

  useEffect(() => {
    debouncedFilter(state.inputValue);
    return () => debouncedFilter.cancel();
  }, [state.inputValue]);

  return {
    state,
    dispatch,
    inputRef,
    validChildren,
    getOptionLabelByValue,
  };
};
