import {
  createFocusTrap,
  FocusTrap,
  Options as FocusTrapOptions,
} from 'focus-trap';
import { useEffect } from 'react';

export const useFocusTrap = (
  element: HTMLElement | null,
  isActive: boolean,
  options?: FocusTrapOptions,
) => {
  useEffect(() => {
    if (!element || !isActive) {
      return;
    }

    const trap: FocusTrap = createFocusTrap(element, options);

    trap.activate();

    return () => {
      trap.deactivate();
    };
  }, [element, isActive]);
};
