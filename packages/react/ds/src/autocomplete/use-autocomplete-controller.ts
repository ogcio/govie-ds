import { debounce } from 'lodash';
import {
  Children,
  isValidElement,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { useScrollHighlightedItem } from '../hooks/use-scroll-highlighted-item.js';
import { safeCloneElement } from '../utils/utilities.js';
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
  SET_OPTION_TYPE,
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
      return {
        ...state,
        autocompleteOptions: action.payload || [],
      };
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
        highlightedIndex: -1,
      };
    }
    case SET_HIGHLIGHTED_INDEX: {
      return { ...state, highlightedIndex: action.payload };
    }
    case SET_OPTION_TYPE: {
      return { ...state, optionType: action.payload };
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
    (child as any)?.type?.componentType || (child as any)?.props?.__type;

  return (
    isValidElement(child) &&
    !(child as AutocompleteOptionItemElement)?.props?.hidden &&
    (type === 'AutocompleteItem' || type === 'AutocompleteGroupItem')
  );
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

const getOptionLabelByValue = (children: any, value: string): string => {
  const valid = getValidChildren(children) as any;

  for (const child of valid) {
    const type = child.type?.componentType || child.props?.__type;

    if (child.props?.value === value) {
      return child.props.children?.toString() || '';
    }

    if (type === 'AutocompleteGroupItem') {
      const groupChildren = Children.toArray(child.props.children).filter(
        (child) => isValidElement(child),
      );

      for (const child of groupChildren) {
        if ((child as any).props?.value === value) {
          return (child as any).props.children?.toString() || '';
        }
      }
    }
  }
  return '';
};

const detectOptionType = (children: any) => {
  const valid = getValidChildren(children);

  if (valid?.length) {
    const allGroup = valid.every(
      (child: any) =>
        child.props.__type === 'AutocompleteGroupItem' ||
        child.type?.componentType === 'AutocompleteGroupItem',
    );

    return allGroup ? 'AutocompleteGroupItem' : 'AutocompleteItem';
  }

  return 'AutocompleteItem';
};

export const useAutocompleteController = ({
  children,
  defaultValue = '',
  isOpen = false,
  freeSolo = false,
  onOpen,
  onClose,
  onChange,
  value,
}: {
  onChange?: (input: string, name?: string) => void;
  ref?: any;
} & Pick<
  AutocompleteProps,
  | 'children'
  | 'defaultValue'
  | 'isOpen'
  | 'freeSolo'
  | 'onOpen'
  | 'onClose'
  | 'value'
>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const validChildren = useMemo(
    () => getValidChildren(children || []),
    [children],
  );

  const focusInput = () => inputRef.current?.focus();
  const optionType = useMemo(() => detectOptionType(children), [children]);
  const [state, dispatch] = useReducer(reducer, null, () => {
    return {
      isOpen: !!isOpen,
      value,
      inputValue: defaultValue,
      autocompleteOptions: validChildren,
      isClearButtonEnabled: false,
      highlightedIndex: -1,
      optionType,
    };
  });
  useScrollHighlightedItem(listRef, state.highlightedIndex);

  useEffect(() => {
    dispatch({ type: SET_OPTIONS, payload: validChildren });
  }, [validChildren]);

  useEffect(() => {
    dispatch({ type: SET_OPTION_TYPE, payload: optionType });
  }, [optionType]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (
      state.inputValue === '' &&
      state.value === '' &&
      state.autocompleteOptions?.length
    ) {
      focusInput();
    }
  }, [state.isClearButtonEnabled]);

  useEffect(() => {
    if (state.isOpen) {
      onOpen?.();
      focusInput();
      dispatch({ type: SET_OPTIONS, payload: validChildren });
    } else {
      onClose?.();
      const label = getOptionLabelByValue(children, state.value);
      if (label && state.value) {
        dispatch({
          type: SET_INPUT_VALUE,
          payload: label,
        });
        dispatch({ type: SET_IS_OPEN, payload: false });
      } else if (!freeSolo) {
        dispatch({ type: ON_RESET });
        onChange?.('');
      }
      dispatch({ type: TOGGLE_CLEAR_BUTTON });
    }
  }, [state.isOpen]);

  const debouncedFilter = useMemo(
    () =>
      debounce((input: string) => {
        if (input) {
          const filtered = validChildren
            .map((child: any) => {
              const type = child.type?.componentType || child.props?.__type;
              const isGroupItem =
                optionType === 'AutocompleteGroupItem' &&
                type === 'AutocompleteGroupItem';

              if (isGroupItem) {
                const groupChildren = Children.toArray(
                  child.props.children,
                ).filter((child) => isValidElement(child));

                const matched = groupChildren.filter((groupItem: any) =>
                  filterChildOption(groupItem, input),
                );

                if (matched.length > 0) {
                  return safeCloneElement(child, { children: matched });
                }

                return null;
              } else if (optionType === 'AutocompleteItem') {
                return filterChildOption(child, input) ? child : null;
              }
              return null;
            })
            .filter(Boolean);

          dispatch({ type: SET_OPTIONS, payload: filtered });
          dispatch({ type: SET_HIGHLIGHTED_INDEX, payload: -1 });
          if ((!state.isOpen && !state.value) || filtered?.length === 0) {
            dispatch({ type: SET_IS_OPEN, payload: true });
          }
        } else {
          dispatch({ type: SET_VALUE, payload: '' });
          dispatch({ type: SET_OPTIONS, payload: validChildren });
          dispatch({ type: SET_HIGHLIGHTED_INDEX, payload: -1 });
        }
      }, 500),
    [validChildren, state.isOpen, state.value, freeSolo],
  );

  return {
    state,
    dispatch,
    inputRef,
    listRef,
    validChildren,
    getOptionLabelByValue,
    debouncedFilter,
  };
};
