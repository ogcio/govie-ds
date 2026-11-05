type Size = {
  width: number;
  height: number;
};

type Position = {
  top: number;
  left: number;
};

const GAP = 8;

/**
 * The element's box on screen, or `null` when nothing meaningful of it is rendered.
 *
 * Angular renders each component as a `gi-*` host element styled `display: contents`, so the host
 * has no box of its own: its box is the union of what its child nodes render. Children are measured one
 * by one because the host often wraps another `display: contents` element.
 * A box of a pixel or less in both directions is visually hidden content, such as a skip link, and does
 * not count. A one-pixel line, such as a divider, does.
 */
export function measure(element: Element): DOMRect | null {
  const rect = element.getBoundingClientRect();
  if (isVisible(rect)) {
    return rect;
  }
  if (getComputedStyle(element).display !== 'contents') {
    return null;
  }
  const boxes = [...element.childNodes].map((node) => boxOf(node)).filter((box) => box !== null);
  return boxes.length > 0 ? union(boxes) : null;
}

/** Places the card below the target, or above it when there is no room, and keeps it inside the viewport. */
export function placeCard(target: DOMRect, card: Size, viewport: Size): Position {
  const fitsBelow = target.bottom + GAP + card.height <= viewport.height;
  const top = fitsBelow ? target.bottom + GAP : target.top - GAP - card.height;
  return {
    top: clamp(top, GAP, viewport.height - card.height - GAP),
    left: clamp(target.left, GAP, viewport.width - card.width - GAP),
  };
}

/** An element's box, or the box of a text node's glyphs. */
function boxOf(node: ChildNode): DOMRect | null {
  if (node instanceof Element) {
    return measure(node);
  }
  const range = document.createRange();
  range.selectNodeContents(node);
  const rect = range.getBoundingClientRect();
  return isVisible(rect) ? rect : null;
}

function union(rects: DOMRect[]): DOMRect {
  const left = Math.min(...rects.map((rect) => rect.left));
  const top = Math.min(...rects.map((rect) => rect.top));
  const right = Math.max(...rects.map((rect) => rect.right));
  const bottom = Math.max(...rects.map((rect) => rect.bottom));
  return new DOMRect(left, top, right - left, bottom - top);
}

function isVisible({ width, height }: DOMRect): boolean {
  return width > 0 && height > 0 && (width > 1 || height > 1);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
