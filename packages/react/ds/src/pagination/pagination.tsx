'use client';
import React from 'react';
import { Button } from '../button/button.js';
import { Icon } from '../icon/icon.js';

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

// TODO Devise localisation
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const displayedPages = calculateDisplayedPages(currentPage, totalPages);

  const renderPaginationBtns = () => {
    return displayedPages.map((page, index) =>
      page === -1 || page === -2 ? (
        <React.Fragment key={`ellipsis-${index}`}>
          <Icon className="gi-text-gray-700" icon="more_horiz" />
        </React.Fragment>
      ) : (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'flat'}
          size="large"
          appearance="dark"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ),
    );
  };

  const renderPaginationLabel = () => (
    <span className="gi-text-md">
      Page {currentPage} of {totalPages}
    </span>
  );

  return (
    <div className="gi-pagination">
      <Button
        variant="flat"
        size="large"
        appearance="dark"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <React.Fragment key="previous-btn-pagination">
          <Icon icon="arrow_left_alt" />
        </React.Fragment>
        <span className="gi-pagination-btn-label">Previous</span>
      </Button>

      <div className="gi-pagination-layout-label">
        {renderPaginationLabel()}
      </div>

      <div className="gi-pagination-layout-btn">{renderPaginationBtns()}</div>

      <Button
        disabled={currentPage === totalPages}
        variant="flat"
        size="large"
        appearance="dark"
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span className="gi-pagination-btn-label">Next</span>
        <React.Fragment key="next-btn-pagination">
          <Icon icon="arrow_right_alt" />
        </React.Fragment>
      </Button>
    </div>
  );
};
