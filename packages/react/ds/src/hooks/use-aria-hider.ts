import { useLayoutEffect } from 'react';

export const useAriaHider = (
  ref: React.RefObject<HTMLElement | null>,
  shouldActivate: boolean,
): void => {
  useLayoutEffect(() => {
    if (shouldActivate !== true || !ref.current) {
      return;
    }
    const element = ref.current;

    const documentContext = element.ownerDocument ?? document;
    const bodyChildren = [...documentContext.body.children];

    const elementsToHide: Element[] = bodyChildren.filter((child) => {
      const isSameElement: boolean = child === element;
      const alreadyHidden: boolean =
        child.getAttribute('aria-hidden') === 'true';
      return !isSameElement && !alreadyHidden;
    });

    for (const element of elementsToHide) {
      if (element.contains(documentContext.activeElement)) {
        // activeElement exists, so we blur it before aria-hiding the active elements ancestor
        // focus is restored by the focus-trap.
        (documentContext.activeElement as HTMLElement)?.blur?.();
      }
      element.setAttribute('aria-hidden', 'true');
    }

    return () => {
      for (const element of elementsToHide) {
        element.removeAttribute('aria-hidden');
      }
    };
  }, [shouldActivate, ref.current]);
};
