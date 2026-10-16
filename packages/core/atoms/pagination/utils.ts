import clamp from 'lodash/clamp';

type PaginationListProps = {
  current: number;
  total: number;
  size: number;
};

const pageRange = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

/**
 * Pages to render. Positive numbers are page links and `-1` is an ellipsis.
 * The list length is `min(size, total)` on every page.
 */
export const getPaginationList = ({ current, total, size }: PaginationListProps): number[] => {
  if (total < 1 || size < 1) {
    return [];
  }

  const length = Math.min(Math.floor(size), total);
  const page = clamp(current, 1, total);

  if (length === total) {
    return pageRange(1, total);
  }

  const half = Math.floor(length / 2);
  let start = Math.max(page - half, 1);
  const end = Math.min(start + length - 1, total);
  start = Math.max(end - length + 1, 1);

  const items = pageRange(start, end);

  if (start > 1 && items[0] !== page) {
    items[0] = 1;
    if (length > 2 && items[1] !== page) {
      items[1] = -1;
    }
  }

  if (end < total && items[length - 1] !== page) {
    items[length - 1] = total;
    if (length > 2 && items[length - 2] !== page) {
      items[length - 2] = -1;
    }
  }

  return items;
};
