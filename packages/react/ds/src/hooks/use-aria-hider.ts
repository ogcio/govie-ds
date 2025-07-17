import { useEffect } from 'react';

export const useAriaHider = (
  refNode: HTMLElement | null,
  activate: boolean,
) => {
  useEffect(() => {
    if (!activate || !refNode) {
      return;
    }

    const bodyChildren = [...document.body.children];
    const elementsToHide = bodyChildren.filter(
      (element) =>
        element !== refNode && element.getAttribute('aria-hidden') !== 'true',
    );

    for (const element of elementsToHide) {
      element.setAttribute('aria-hidden', 'true');
    }

    return () => {
      for (const element of elementsToHide) {
        element.removeAttribute('aria-hidden');
      }
    };
  }, [activate, refNode]);
};
