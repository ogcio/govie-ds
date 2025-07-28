import { useEffect } from 'react';

export function useScrollHighlightedItem(
  containerRef: React.RefObject<any>,
  highlightedIndex: number,
  itemSelector: (index: number) => string = (index) =>
    `[data-index="${index}"]`,
) {
  useEffect(() => {
    if (highlightedIndex < 0 || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const highlighted = container.querySelector(
      itemSelector(highlightedIndex),
    ) as HTMLElement | null;

    if (!highlighted || !container.contains(highlighted)) {
      return;
    }

    requestAnimationFrame(() => {
      highlighted.scrollIntoView({ block: 'nearest' });
    });
  }, [highlightedIndex, containerRef, itemSelector]);
}
