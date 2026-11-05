import { Heading, Paragraph } from '@ogcio/design-system-react';
import { Link } from '@ogcio/design-system-react/next';
import { useEffect, useLayoutEffect, useRef } from 'react';
import type { ComponentDescription } from './catalogue';
import { placeCard } from './utils';

type CardProps = {
  rect: DOMRect;
  component: ComponentDescription;
  /** The components the inspected one is nested in, outermost first: `Header › Header navigation`. */
  ancestors: string;
  pinned: boolean;
  /** Changes on every pin made from the keyboard, moving focus to the documentation link. */
  keyboardPin: number | null;
};

/** Details of the inspected component, shown next to its highlight. */
export function Card({ rect, component, ancestors, pinned, keyboardPin }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // The card's size is only known after it renders, so it is positioned right before paint.
  useLayoutEffect(() => {
    const card = ref.current;
    if (!card) {
      return;
    }
    const { top, left } = placeCard(
      rect,
      { width: card.offsetWidth, height: card.offsetHeight },
      { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight },
    );
    card.style.top = `${top}px`;
    card.style.left = `${left}px`;
  });

  useEffect(() => {
    if (keyboardPin !== null) {
      ref.current?.querySelector('a')?.focus();
    }
  }, [keyboardPin]);

  return (
    <div ref={ref} className="card">
      {ancestors && <p className="ancestors">{ancestors} ›</p>}
      <Heading as="h2" size="xs">
        {component.name}
      </Heading>
      <code className="selector">{component.selector}</code>
      {component.description && <Paragraph size="sm">{component.description}</Paragraph>}
      {component.docsUrl && (
        <p className="docs" inert={!pinned}>
          <Link href={component.docsUrl} variant="inline" external>
            Documentation<span className="gi-sr-only"> (opens in a new tab)</span>
          </Link>
        </p>
      )}
    </div>
  );
}
