import { useEffect, useEffectEvent, useState } from 'react';
import { measure } from './utils';

type PageEventHandlers = {
  onPreview: (target: Element | null) => void;
  onPin: (target: Element | null, fromKeyboard: boolean) => void;
  onEscape: () => void;
};

/**
 * Listens to the page while inspect mode is on. Listeners run in the capture phase on `window`,
 * so clicks and Esc are stopped before the application (a router link, a menu) ever sees them.
 * Pointer, focus and click events from the inspector's own UI are left alone. Esc is handled wherever focus is.
 */
export function usePageEvents(active: boolean, host: Element, handlers: PageEventHandlers) {
  const preview = useEffectEvent(handlers.onPreview);
  const pin = useEffectEvent(handlers.onPin);
  const escape = useEffectEvent(handlers.onEscape);

  useEffect(() => {
    if (!active) {
      return;
    }
    const fromPage = (event: Event) => !event.composedPath().includes(host);

    const handlePreview = (event: Event) => {
      if (fromPage(event)) {
        preview(targetOf(event));
      }
    };
    const handleClick = (event: MouseEvent) => {
      if (fromPage(event)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        // A click that Enter or Space produced on a focused element has no pointer position.
        pin(targetOf(event), event.detail === 0);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation();
        escape();
      }
    };

    globalThis.addEventListener('pointermove', handlePreview, true);
    globalThis.addEventListener('focusin', handlePreview, true);
    globalThis.addEventListener('click', handleClick, true);
    globalThis.addEventListener('auxclick', handleClick, true);
    globalThis.addEventListener('keydown', handleKeyDown, true);
    return () => {
      globalThis.removeEventListener('pointermove', handlePreview, true);
      globalThis.removeEventListener('focusin', handlePreview, true);
      globalThis.removeEventListener('click', handleClick, true);
      globalThis.removeEventListener('auxclick', handleClick, true);
      globalThis.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [active, host]);
}

/**
 * The element's box on screen, re-measured every frame so it follows scrolling, layout shifts
 * and DOM updates. Calls `onLost` once the element is removed from the page.
 * While the element has no box, the last one is kept: a skip link, for example, collapses as soon as
 * focus moves to the pinned card.
 */
export function useElementRect(element: Element | null, onLost: () => void): DOMRect | null {
  const [measured, setMeasured] = useState<{ element: Element; rect: DOMRect } | null>(null);
  const lost = useEffectEvent(onLost);

  useEffect(() => {
    if (!element) {
      return;
    }
    let frame = requestAnimationFrame(function update() {
      if (!element.isConnected) {
        lost();
        return;
      }
      const rect = measure(element);
      if (rect) {
        setMeasured((previous) =>
          previous?.element === element && sameRect(previous.rect, rect) ? previous : { element, rect },
        );
      }
      frame = requestAnimationFrame(update);
    });
    return () => cancelAnimationFrame(frame);
  }, [element]);

  if (!element) {
    return null;
  }
  // Until the first frame lands, measure right away so a new target is never drawn a frame late.
  return measured?.element === element ? measured.rect : measure(element);
}

/** The element the event started on, including inside open shadow roots. */
function targetOf(event: Event): Element | null {
  const [origin] = event.composedPath();
  return origin instanceof Element ? origin : null;
}

function sameRect(a: DOMRect, b: DOMRect): boolean {
  return a.top === b.top && a.left === b.left && a.width === b.width && a.height === b.height;
}
