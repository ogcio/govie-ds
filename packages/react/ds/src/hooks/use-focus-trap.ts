import {
  createFocusTrap,
  Options as FocusTrapOptions,
  FocusTrap,
} from 'focus-trap';
import { useLayoutEffect } from 'react';

export const useFocusTrap = (
  element: HTMLElement | null,
  isActive: boolean,
  options?: FocusTrapOptions,
) => {
  useLayoutEffect(() => {
    if (!element || !isActive) {
      return;
    }

    const trap: FocusTrap = createFocusTrap(element, {
      ...options,
      initialFocus: options?.initialFocus ?? element,
      fallbackFocus: options?.fallbackFocus ?? element,
      returnFocusOnDeactivate: false,
    });

    trap.activate();

    return () => {
      trap.deactivate();
    };
  }, [element, isActive]);
};
