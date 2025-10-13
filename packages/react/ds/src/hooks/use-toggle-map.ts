'use client';
import { useMemo, useReducer } from 'react';

export const ACTIONS = {
  OPEN: 'open',
  CLOSE: 'close',
  TOGGLE: 'toggle',
  OPEN_ALL: 'openAll',
  CLOSE_ALL: 'closeAll',
} as const;

const setAll = (currentState: any, value: boolean) => {
  const nextState: any = { ...currentState };
  const keys: string[] = Object.keys(currentState);
  for (const key of keys) {
    nextState[key] = value;
  }
  return nextState;
};

type Action =
  | { type: typeof ACTIONS.OPEN; key: string }
  | { type: typeof ACTIONS.CLOSE; key: string }
  | { type: typeof ACTIONS.TOGGLE; key: string }
  | { type: typeof ACTIONS.OPEN_ALL }
  | { type: typeof ACTIONS.CLOSE_ALL };

export const useToggleMap = (initialState: any) => {
  const handlers: Record<string, (state: any, action: any) => any> = {
    [ACTIONS.OPEN]: (state, action) => {
      return { ...state, [action.key]: true };
    },
    [ACTIONS.CLOSE]: (state, action) => {
      return { ...state, [action.key]: false };
    },
    [ACTIONS.TOGGLE]: (state, action) => {
      return { ...state, [action.key]: !state[action.key] };
    },
    [ACTIONS.OPEN_ALL]: (state) => {
      return setAll(state, true);
    },
    [ACTIONS.CLOSE_ALL]: (state) => {
      return setAll(state, false);
    },
  };

  const reducer = (state: any, action: Action) => {
    const handle = handlers[action.type] ?? ((s: any) => s);
    return handle(state, action);
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const api = useMemo(() => {
    return {
      open: (key: string) => {
        dispatch({ type: ACTIONS.OPEN, key });
      },
      close: (key: string) => {
        dispatch({ type: ACTIONS.CLOSE, key });
      },
      toggle: (key: string) => {
        dispatch({ type: ACTIONS.TOGGLE, key });
      },
      openAll: () => {
        dispatch({ type: ACTIONS.OPEN_ALL });
      },
      closeAll: () => {
        dispatch({ type: ACTIONS.CLOSE_ALL });
      },
      isOpen: (key: string) => {
        return !!state?.[key];
      },
    };
  }, [state]);

  return [state, api] as const;
};
