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
      element.setAttribute('aria-hidden', 'true');
    }

    return () => {
      for (const element of elementsToHide) {
        element.removeAttribute('aria-hidden');
      }
    };
  }, [shouldActivate, ref.current]);
};
