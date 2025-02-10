'use client';
import React from 'react';
import { Button } from '../button/button.js';
import { Breakpoint, useBreakpoint } from '../hooks/use-breakpoint.js';
import { Icon } from '../icon/icon.js';
import { getDisplayPages } from '../utils/utils.js';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  dataTestid?: string;
};

// TODO Devise localisation
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  dataTestid,
}) => {
  const { breakpoint, width } = useBreakpoint();
  const isCompactView = breakpoint === Breakpoint.XS;
  const isSMWidth = width < 639;

  const displayedPages = getDisplayPages(currentPage, totalPages, breakpoint);

  const renderPaginationBtns = () => {
    return displayedPages.map((page, index) =>
      page === -1 || page === -2 ? (
        <React.Fragment key={`ellipsis-${index}`}>
          <Icon
            role="presentation"
            className="gi-text-gray-700"
            icon="more_horiz"
          />
        </React.Fragment>
      ) : (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'flat'}
          size="large"
          appearance="dark"
          onClick={() => onPageChange(page)}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </Button>
      ),
    );
  };

  const renderPaginationLabel = () => (
    <span className="gi-text-md" aria-live="polite">
      <span className="gi-font-bold">Page {currentPage}</span> of {totalPages}
    </span>
  );

  return (
    <div
      className="gi-pagination"
      role="navigation"
      aria-label="Pagination"
      data-testid={dataTestid}
    >
      <Button
        variant="flat"
        size="large"
        appearance="dark"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Go to previous page"
        className={isSMWidth ? 'gi-icon-btn-large' : ''}
      >
        <React.Fragment key="previous-btn-pagination">
          <Icon icon="arrow_left_alt" />
        </React.Fragment>
        {!isSMWidth && 'Previous'}
      </Button>

      {isCompactView ? renderPaginationLabel() : renderPaginationBtns()}

      <Button
        disabled={currentPage === totalPages}
        variant="flat"
        size="large"
        appearance="dark"
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Go to next page"
        className={isSMWidth ? 'gi-icon-btn-large' : ''}
      >
        {!isSMWidth && 'Next'}
        <React.Fragment key="next-btn-pagination">
          <Icon icon="arrow_right_alt" />
        </React.Fragment>
      </Button>
    </div>
  );
};
