import { Breakpoint } from '../hooks/use-breakpoint.js';
import { generateSvgPlaceholderDataUrl } from './placeholder.js';
import { getDisplayPages } from './utilities.js';

describe('getDisplayPages', () => {
  it('should return all pages for small screens when totalPages is less than or equal to 3', () => {
    expect(getDisplayPages(1, 3, Breakpoint.Small)).toEqual([1, 2, 3]);
    expect(getDisplayPages(2, 3, Breakpoint.Small)).toEqual([1, 2, 3]);
  });

  it('should return [1, -2, totalPages] when on first page for small screens and large totalPages', () => {
    expect(getDisplayPages(1, 10, Breakpoint.Small)).toEqual([1, -2, 10]);
  });

  it('should return [1, currentPage, -2, totalPages] when currentPage is near start for small screens', () => {
    expect(getDisplayPages(2, 10, Breakpoint.Small)).toEqual([1, 2, -2, 10]);
    expect(getDisplayPages(3, 100, Breakpoint.Small)).toEqual([
      1, -1, 3, -2, 100,
    ]);
  });

  it('should return [1, -1, currentPage, -2, totalPages] when currentPage is in the middle for small screens', () => {
    expect(getDisplayPages(5, 10, Breakpoint.Small)).toEqual([
      1, -1, 5, -2, 10,
    ]);
    expect(getDisplayPages(7, 10, Breakpoint.Small)).toEqual([
      1, -1, 7, -2, 10,
    ]);
  });

  it('should return [1, -1, totalPages-1, totalPages] when currentPage is near end for small screens', () => {
    expect(getDisplayPages(9, 10, Breakpoint.Small)).toEqual([1, -1, 9, 10]);
    expect(getDisplayPages(10, 10, Breakpoint.Small)).toEqual([1, -1, 10]);
  });

  it('should return wider range of pages with ellipses for large screens', () => {
    expect(getDisplayPages(5, 10, Breakpoint.Large)).toEqual([
      1, -1, 3, 4, 5, 6, 7, -2, 10,
    ]);
    expect(getDisplayPages(1, 10, Breakpoint.Large)).toEqual([1, 2, 3, -2, 10]);
    expect(getDisplayPages(10, 10, Breakpoint.Large)).toEqual([
      1, -1, 8, 9, 10,
    ]);
  });

  it('should handle edge case of currentPage being the only page', () => {
    expect(getDisplayPages(1, 1, Breakpoint.Small)).toEqual([1]);
    expect(getDisplayPages(1, 1, Breakpoint.Large)).toEqual([1]);
  });

  it('should handle case where currentPage is at extreme start and end for larger screens', () => {
    expect(getDisplayPages(1, 100, Breakpoint.Large)).toEqual([
      1, 2, 3, -2, 100,
    ]);
    expect(getDisplayPages(100, 100, Breakpoint.Large)).toEqual([
      1, -1, 98, 99, 100,
    ]);
  });

  it('should handle large number of pages with currentPage in the middle on large screens', () => {
    expect(getDisplayPages(50, 100, Breakpoint.Large)).toEqual([
      1, -1, 48, 49, 50, 51, 52, -2, 100,
    ]);
  });

  describe('generateSvgPlaceholderDataUrl', () => {
    it('should generate a data url svg using default dimensions', () => {
      const dataUrl = generateSvgPlaceholderDataUrl();

      expect(dataUrl.startsWith('data:image/svg+xml,')).toBe(true);

      const encodedSvg = dataUrl.replace('data:image/svg+xml,', '');
      const svg = decodeURIComponent(encodedSvg);

      expect(svg).toContain('width="300"');
      expect(svg).toContain('height="400"');
      expect(svg).toContain('>300x400<');
      expect(svg).toContain('font-size="18"');
    });

    it('should generate a data url svg using custom dimensions and clamp font size', () => {
      const dataUrl = generateSvgPlaceholderDataUrl(80, 60);

      const encodedSvg = dataUrl.replace('data:image/svg+xml,', '');
      const svg = decodeURIComponent(encodedSvg);

      expect(svg).toContain('width="80"');
      expect(svg).toContain('height="60"');
      expect(svg).toContain('>80x60<');
      expect(svg).toContain('font-size="12"');
    });
  });
});
