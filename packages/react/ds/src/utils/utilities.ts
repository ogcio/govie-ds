import { cloneElement } from 'react';
import { Breakpoint, BreakpointType } from '../hooks/use-breakpoint.js';

type DisplayPage = number | -1 | -2;

/**
 * Helper function to generate an array of page numbers and ellipses for pagination.
 *
 * This function is used to generate a compact pagination display that includes page numbers and ellipsis placeholders
 * based on the active page (`currentPage`), total number of pages (`totalPages`), and the screen size breakpoint.
 * When the `breakpoint` is small (`SM` or `MD`), the function limits the displayed pages to a simplified view.
 * When the breakpoint is larger, it displays a wider range of pages around the `currentPage`.
 *
 * @param {number} currentPage - The currently active page number in the pagination.
 * @param {number} totalPages - The total number of pages in the pagination.
 * @param {Breakpoint} breakpoint - The screen size breakpoint, which determines the range of displayed pages.
 *
 * @returns {DisplayPage[]} - An array representing pages to be displayed, where:
 *   - Positive numbers represent actual page numbers.
 *   - `-1` and `-2` are placeholders for ellipses ('...') indicating a range of hidden pages.
 *
 * Examples:
 * - For `currentPage = 3`, `totalPages = 100`, and `breakpoint = SM`, the output would be `[1, -1, 3, -2, 100]`.
 * - For `currentPage = 3`, `totalPages = 3`, and `breakpoint = SM`, the output would be `[1, 2, 3]`.
 */
export const getDisplayPages = (
  currentPage: number,
  totalPages: number,
  breakpoint: BreakpointType,
): DisplayPage[] => {
  if (breakpoint === Breakpoint.Small || breakpoint === Breakpoint.Medium) {
    const displayedPages: DisplayPage[] = [];
    if (totalPages <= 3) {
      for (let index = 1; index <= totalPages; index++) {
        displayedPages.push(index);
      }
      return displayedPages;
    }

    displayedPages.push(1);

    if (currentPage > 2) {
      displayedPages.push(-1);
    }

    if (currentPage > 1 && currentPage < totalPages) {
      displayedPages.push(currentPage);
    }

    if (currentPage < totalPages - 1) {
      displayedPages.push(-2);
    }

    if (totalPages > 1) {
      displayedPages.push(totalPages);
    }

    return displayedPages;
  }

  const displayedPages: DisplayPage[] = [];

  if (currentPage > 3) {
    displayedPages.push(1);
  }

  if (currentPage > 4) {
    displayedPages.push(-1);
  }

  for (let index = currentPage - 2; index <= currentPage + 2; index++) {
    if (index >= 1 && index <= totalPages) {
      displayedPages.push(index);
    }
  }

  if (currentPage < totalPages - 3) {
    displayedPages.push(-2);
  }

  if (currentPage < totalPages - 2) {
    displayedPages.push(totalPages);
  }

  return displayedPages;
};

export const safeCloneElement = (
  element: React.ReactElement,
  props: Record<string, any> = {},
) => {
  const { __type, ...restProps } = element.props as any;
  return cloneElement(element, { ...restProps, ...props });
};

export const splitAriaProps = (props: any = {}) => {
  const aria: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};
  for (const key in props) {
    if (key === 'role' || key.startsWith('aria-')) {
      aria[key] = (props as any)[key];
    } else {
      rest[key] = (props as any)[key];
    }
  }
  return [aria, rest] as const;
};
