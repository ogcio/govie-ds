import { describe, expect, it } from 'vitest';
import { getPaginationList } from '../atoms/pagination/pagination-list';

describe('getPaginationList', () => {
  it('returns every page when there are 3 or fewer', () => {
    expect(getPaginationList({ current: 1, total: 0, range: 2 })).toEqual([]);
    expect(getPaginationList({ current: 1, total: 1, range: 2 })).toEqual([1]);
    expect(getPaginationList({ current: 2, total: 2, range: 2 })).toEqual([1, 2]);
    expect(getPaginationList({ current: 2, total: 3, range: 2 })).toEqual([1, 2, 3]);
    expect(getPaginationList({ current: 9, total: 3, range: 2 })).toEqual([1, 2, 3]);
  });

  it('returns the list safely when current is outside 1..total', () => {
    expect(getPaginationList({ current: 0, total: 10, range: 2 })).toEqual([1, 2, 3, -1, 10]);
    expect(getPaginationList({ current: 11, total: 10, range: 2 })).toEqual([1, -1, 8, 9, 10]);
  });

  it.each([
    [{ current: 1, total: 10, range: 2 }, [1, 2, 3, -1, 10]],
    [{ current: 4, total: 10, range: 2 }, [1, 2, 3, 4, 5, 6, -1, 10]],
    [{ current: 5, total: 10, range: 2 }, [1, -1, 3, 4, 5, 6, 7, -1, 10]],
    [{ current: 6, total: 10, range: 2 }, [1, -1, 4, 5, 6, 7, 8, -1, 10]],
    [{ current: 7, total: 10, range: 2 }, [1, -1, 5, 6, 7, 8, 9, 10]],
    [{ current: 10, total: 10, range: 2 }, [1, -1, 8, 9, 10]],
    [{ current: 1, total: 100, range: 2 }, [1, 2, 3, -1, 100]],
    [{ current: 50, total: 100, range: 2 }, [1, -1, 48, 49, 50, 51, 52, -1, 100]],
    [{ current: 100, total: 100, range: 2 }, [1, -1, 98, 99, 100]],
    [{ current: 1, total: 10, range: 1 }, [1, 2, -1, 10]],
    [{ current: 5, total: 10, range: 0 }, [1, -1, 5, -1, 10]],
    [{ current: 1, total: 5, range: 2 }, [1, 2, 3, -1, 5]],
    [{ current: 3, total: 5, range: 2 }, [1, 2, 3, 4, 5]],
    [{ current: 5, total: 5, range: 2 }, [1, -1, 3, 4, 5]],
    [{ current: 1, total: 4, range: 2 }, [1, 2, 3, 4]],
  ] as const)('%j', (input, expected) => {
    expect(getPaginationList(input)).toEqual(expected);
  });
});
