import { Breakpoint } from '../hooks/use-breakpoint.js';
import { getDisplayPages } from './utils.js';

describe('getDisplayPages', () => {
  it('should return all pages for small screens when totalPages is less than or equal to 3', () => {
    expect(getDisplayPages(1, 3, Breakpoint.SM)).toEqual([1, 2, 3]);
    expect(getDisplayPages(2, 3, Breakpoint.SM)).toEqual([1, 2, 3]);
  });

  it('should return [1, -2, totalPages] when on first page for small screens and large totalPages', () => {
    expect(getDisplayPages(1, 10, Breakpoint.SM)).toEqual([1, -2, 10]);
  });

  it('should return [1, currentPage, -2, totalPages] when currentPage is near start for small screens', () => {
    expect(getDisplayPages(2, 10, Breakpoint.SM)).toEqual([1, 2, -2, 10]);
    expect(getDisplayPages(3, 100, Breakpoint.SM)).toEqual([1, -1, 3, -2, 100]);
  });

  it('should return [1, -1, currentPage, -2, totalPages] when currentPage is in the middle for small screens', () => {
    expect(getDisplayPages(5, 10, Breakpoint.SM)).toEqual([1, -1, 5, -2, 10]);
    expect(getDisplayPages(7, 10, Breakpoint.SM)).toEqual([1, -1, 7, -2, 10]);
  });

  it('should return [1, -1, totalPages-1, totalPages] when currentPage is near end for small screens', () => {
    expect(getDisplayPages(9, 10, Breakpoint.SM)).toEqual([1, -1, 9, 10]);
    expect(getDisplayPages(10, 10, Breakpoint.SM)).toEqual([1, -1, 10]);
  });

  it('should return wider range of pages with ellipses for large screens', () => {
    expect(getDisplayPages(5, 10, Breakpoint.LG)).toEqual([
      1, -1, 3, 4, 5, 6, 7, -2, 10,
    ]);
    expect(getDisplayPages(1, 10, Breakpoint.LG)).toEqual([1, 2, 3, -2, 10]);
    expect(getDisplayPages(10, 10, Breakpoint.LG)).toEqual([1, -1, 8, 9, 10]);
  });

  it('should handle edge case of currentPage being the only page', () => {
    expect(getDisplayPages(1, 1, Breakpoint.SM)).toEqual([1]);
    expect(getDisplayPages(1, 1, Breakpoint.LG)).toEqual([1]);
  });

  it('should handle case where currentPage is at extreme start and end for larger screens', () => {
    expect(getDisplayPages(1, 100, Breakpoint.LG)).toEqual([1, 2, 3, -2, 100]);
    expect(getDisplayPages(100, 100, Breakpoint.LG)).toEqual([
      1, -1, 98, 99, 100,
    ]);
  });

  it('should handle large number of pages with currentPage in the middle on large screens', () => {
    expect(getDisplayPages(50, 100, Breakpoint.LG)).toEqual([
      1, -1, 48, 49, 50, 51, 52, -2, 100,
    ]);
  });
});
