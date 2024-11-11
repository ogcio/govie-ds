'use client';
import React from 'react';
import { Button } from '../button/button.js';
import { Icon } from '../icon/icon.js';
import { Breakpoint, useBreakpoint } from '../hooks/useBreakpoint.js';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  nextLabel?: string;
  previousLabel?: string;
};

/**
 * Helper function to generate an array of page numbers and ellipses for pagination.
 *
 * @param {number} currentPage - The current active page in the pagination.
 * @param {number} totalPages - The total number of pages.
 *
 * @returns {(number | -1 | -2)[]} - Array representing pages to be displayed, with ellipses as placeholders.
 */
const calculateDisplayedPages = (
  currentPage: number,
  totalPages: number,
): (number | -1 | -2)[] => {
  const displayedPages: (number | -1 | -2)[] = [];

  if (currentPage > 3) displayedPages.push(1);
  if (currentPage > 4) displayedPages.push(-1);

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i >= 1 && i <= totalPages) displayedPages.push(i);
  }

  if (currentPage < totalPages - 3) displayedPages.push(-2);
  if (currentPage < totalPages - 2) displayedPages.push(totalPages);

  return displayedPages;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  previousLabel = 'Previous',
  nextLabel = 'Next',
}) => {
  const breakpoint = useBreakpoint();
  const isResponsive = breakpoint === Breakpoint.XS;

  const displayedPages = calculateDisplayedPages(currentPage, totalPages);

  const renderPaginationBtns = () => {
    if (isResponsive) {
      return [];
    }

    return displayedPages.map((page, index) =>
      page === -1 || page === -2 ? (
        <React.Fragment key={`ellipsis-${index}`}>
          <Icon className="gi-text-gray-700" icon="more_horiz" />
        </React.Fragment>
      ) : (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'flat'}
          size="medium"
          appearance="dark"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ),
    );
  };

  // TODO Devise localisation
  const renderPaginationLabel = () => (
    <span>
      Page {currentPage} of {totalPages}
    </span>
  );

  return (
    <div
      className={isResponsive ? 'gi-pagination-responsive' : 'gi-pagination'}
    >
      <Button
        variant="flat"
        size="medium"
        appearance="dark"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <React.Fragment key="previous-btn-pagination">
          <Icon icon="arrow_left_alt" />
        </React.Fragment>
        {!isResponsive && previousLabel}
      </Button>

      {isResponsive ? renderPaginationLabel() : renderPaginationBtns()}

      <Button
        disabled={currentPage === totalPages}
        variant="flat"
        size="medium"
        appearance="dark"
        onClick={() => onPageChange(currentPage + 1)}
      >
        {!isResponsive && nextLabel}
        <React.Fragment key="next-btn-pagination">
          <Icon icon="arrow_right_alt" />
        </React.Fragment>
      </Button>
    </div>
  );
};
