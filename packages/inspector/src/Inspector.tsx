import { useEffect, useRef, useState } from 'react';
import { Card } from './Card';
import { useElementRect, usePageEvents } from './hooks';
import { componentAncestors, describeComponent, findComponent } from './match';

type Pin = {
  /** Distinguishes repeated pins of the same element. */
  id: number;
  /** Pinned from the keyboard: focus moves to the card and comes back on Esc. */
  fromKeyboard: boolean;
  /** The page element that had focus when the card was pinned from the keyboard. */
  returnFocus: HTMLElement | null;
};

/**
 * Hover or focus previews a Design System component, a click pins it,
 * Esc unpins and then leaves inspect mode.
 */
export function Inspector({ host }: { host: Element }) {
  const [active, setActive] = useState(false);
  const [target, setTarget] = useState<Element | null>(null);
  const [pin, setPin] = useState<Pin | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pinCount = useRef(0);

  const reset = () => {
    setTarget(null);
    setPin(null);
  };
  const rect = useElementRect(target, () => {
    // The card disappears with its target. Focus moves to the toggle so keyboard users are not left
    // on a removed element.
    if (host.shadowRoot?.activeElement?.closest('.card')) {
      toggleRef.current?.focus();
    }
    reset();
  });
  const component = target && describeComponent(target);

  usePageEvents(active, host, {
    onPreview: (element) => {
      if (!pin) {
        setTarget(findComponent(element));
      }
    },
    onPin: (element, fromKeyboard) => {
      const found = findComponent(element);
      setTarget(found);
      pinCount.current += 1;
      setPin(
        found && {
          id: pinCount.current,
          fromKeyboard,
          returnFocus: fromKeyboard && element instanceof HTMLElement ? element : null,
        },
      );
    },
    onEscape: () => {
      if (pin) {
        setPin(null);
        pin.returnFocus?.focus();
      } else {
        setActive(false);
        reset();
        toggleRef.current?.focus();
      }
    },
  });

  useEffect(() => {
    document.documentElement.style.cursor = active ? 'crosshair' : '';
  }, [active]);

  return (
    <>
      {active && target && component && rect && (
        <>
          <div className={pin ? 'highlight pinned' : 'highlight'} style={toStyle(rect)} />
          <Card
            rect={rect}
            component={component}
            ancestors={componentAncestors(target)
              .map((ancestor) => describeComponent(ancestor).name)
              .join(' › ')}
            pinned={pin !== null}
            keyboardPin={pin?.fromKeyboard ? pin.id : null}
          />
        </>
      )}
      <p className="gi-sr-only" aria-live="polite">
        {pin && component ? `${component.name} pinned` : ''}
      </p>
      <button
        ref={toggleRef}
        className={active ? 'toggle active' : 'toggle'}
        onClick={() => {
          setActive(!active);
          reset();
        }}
      >
        {active ? 'Stop inspecting' : 'Inspect components'}
      </button>
    </>
  );
}

function toStyle({ top, left, width, height }: DOMRect) {
  return { top, left, width, height };
}
