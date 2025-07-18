import { useEffect } from 'react';

export const useAriaHider = (
  refNode: HTMLElement | null,
  shouldActivate: boolean,
): void => {
  useEffect(() => {
    if (shouldActivate !== true || refNode === null) {
      return;
    }

    const documentContext = refNode.ownerDocument ?? document;
    const bodyChildren = [...documentContext.body.children];

    const elementsToHide: Element[] = bodyChildren.filter((element) => {
      const isSameElement: boolean = element === refNode;
      const alreadyHidden: boolean =
        element.getAttribute('aria-hidden') === 'true';
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
  }, [shouldActivate, refNode]);
};
