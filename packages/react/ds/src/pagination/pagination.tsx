'use client';
import React from 'react';
import { Button } from '../button/button.js';
import { useBreakpoint } from '../hooks/use-breakpoint.js';
import { Icon } from '../icon/icon.js';
import { getDisplayPages } from '../utils/utils.js';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

// TODO Devise localisation
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { breakpoint, width } = useBreakpoint();
  const isCompactView = width < 524; // Custom breakpoint for compact view.

  const displayedPages = getDisplayPages(currentPage, totalPages, breakpoint);

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
      <span className="gi-font-bold">Page {currentPage}</span> of {totalPages}
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
        {!isCompactView && 'Previous'}
      </Button>

      {isCompactView ? renderPaginationLabel() : renderPaginationBtns()}

      <Button
        disabled={currentPage === totalPages}
        variant="flat"
        size="large"
        appearance="dark"
        onClick={() => onPageChange(currentPage + 1)}
      >
        {!isCompactView && 'Next'}
        <React.Fragment key="next-btn-pagination">
          <Icon icon="arrow_right_alt" />
        </React.Fragment>
      </Button>
    </div>
  );
};
