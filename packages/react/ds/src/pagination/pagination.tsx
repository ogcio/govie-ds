'use client';
import { t } from 'i18next';
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

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  dataTestid,
}) => {
  const { breakpoint, width } = useBreakpoint();
  const isCompactView = breakpoint === Breakpoint.ExtraSmall;
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
          aria-label={t('pagination.goToPage', { page })}
        >
          {page}
        </Button>
      ),
    );
  };

  const renderPaginationLabel = () => (
    <span className="gi-text-md" aria-live="polite">
      <span className="gi-font-bold">
        {t('pagination.page', { currentPage, totalPages })}
      </span>
    </span>
  );

  return (
    <div
      className="gi-pagination"
      role="navigation"
      aria-label={t('pagination.page', { currentPage, totalPages })}
      data-testid={dataTestid}
    >
      <Button
        variant="flat"
        size="large"
        appearance="dark"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label={t('pagination.goToPrevious')}
        className={isSMWidth ? 'gi-icon-btn-large' : ''}
      >
        <React.Fragment key="previous-btn-pagination">
          <Icon icon="arrow_left_alt" />
        </React.Fragment>
        {!isSMWidth && t('pagination.previous')}
      </Button>

      {isCompactView ? renderPaginationLabel() : renderPaginationBtns()}

      <Button
        disabled={currentPage === totalPages}
        variant="flat"
        size="large"
        appearance="dark"
        onClick={() => onPageChange(currentPage + 1)}
        aria-label={t('pagination.goToNext')}
        className={isSMWidth ? 'gi-icon-btn-large' : ''}
      >
        {!isSMWidth && t('pagination.next')}
        <React.Fragment key="next-btn-pagination">
          <Icon icon="arrow_right_alt" />
        </React.Fragment>
      </Button>
    </div>
  );
};
