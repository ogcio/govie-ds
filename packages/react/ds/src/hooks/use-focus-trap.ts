import {
  createFocusTrap,
  Options as FocusTrapOptions,
  FocusTrap,
} from 'focus-trap';
import { useLayoutEffect } from 'react';

export const useFocusTrap = (
  ref: React.RefObject<HTMLElement | null>,
  isActive: boolean,
  options?: FocusTrapOptions,
) => {
  useLayoutEffect(() => {
    if (!isActive || !ref.current) {
      return;
    }
    const element = ref.current;

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
  }, [ref.current, isActive]);
};
