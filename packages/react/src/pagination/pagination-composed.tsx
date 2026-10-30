'use client';
import React, { useState, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Button } from '@/atoms';
import { ArrowRightIcon, ArrowLeftIcon } from '@/atoms/icons';
import { Breakpoint, useBreakpoint } from '@/hooks/use-breakpoint.js';
import { getDisplayPages } from '@/utils/utilities.js';
import { tv } from 'tailwind-variants';
import MoreHorizontal from '@/atoms/icons/MoreHorizontal';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  dataTestid?: string;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, dataTestid }) => {
  const { t } = useTranslation();
  const { breakpoint, width } = useBreakpoint();

  // SSR Safety
  // State to track if component has mounted on the client
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (totalPages === 0) {
    return null;
  }

  const isCompactView = isClient && breakpoint === Breakpoint.ExtraSmall;
  const isSMWidth = isClient && width !== null && width < 639;

  const renderPaginationBtns = () => {
    // Calculate pagesToRender only when breakpoint is known
    const pagesToRender =
      isClient && breakpoint
        ? getDisplayPages(currentPage, totalPages, breakpoint)
        : getDisplayPages(currentPage, totalPages, Breakpoint.Large);

    return pagesToRender.map((page, index) =>
      page === -1 || page === -2 ? (
        <React.Fragment key={`ellipsis-${index}`}>
          <MoreHorizontal className="gi-text-gray-700 gi-shrink-0" />
        </React.Fragment>
      ) : (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'flat'}
          size="lg"
          appearance="dark"
          onClick={() => onPageChange(page)}
          ariaLabel={t('pagination.goToPage', {
            page,
            defaultValue: `Go to page ${page}`,
          })}
        >
          {page}
        </Button>
      ),
    );
  };

  const renderPaginationLabel = () => (
    <span className="gi-text-md gi-leading-6" aria-live="polite">
      <Trans
        i18nKey="pagination.page"
        values={{ currentPage, totalPages }}
        components={{ bold: <span className="gi-font-bold" /> }}
      >
        <span className="gi-font-bold">Page {currentPage}</span> of {totalPages}
      </Trans>
    </span>
  );

  const { container, button } = styles({ isSMWidth });

  return (
    <div
      className={container()}
      role="navigation"
      aria-label={t('pagination.page', {
        currentPage,
        totalPages,
        defaultValue: `Page ${currentPage} of ${totalPages}`,
      })}
      data-testid={dataTestid}
    >
      <Button
        variant="flat"
        size="lg"
        appearance="dark"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        ariaLabel={t('pagination.goToPrevious', {
          defaultValue: 'Go to previous',
        })}
        className={button()}
        dataTestId="govie-pagination-prev-btn"
      >
        <React.Fragment key="previous-btn-pagination">
          <ArrowLeftIcon className="gi-block gi-shrink-0" />
        </React.Fragment>
        {!isSMWidth && t('pagination.previous', { defaultValue: 'Previous' })}
      </Button>

      {isCompactView ? renderPaginationLabel() : renderPaginationBtns()}

      <Button
        disabled={currentPage === totalPages}
        variant="flat"
        size="lg"
        appearance="dark"
        onClick={() => onPageChange(currentPage + 1)}
        ariaLabel={t('pagination.goToNext', { defaultValue: 'Go to next' })}
        className={button()}
        dataTestId="govie-pagination-next-btn"
      >
        {!isSMWidth && t('pagination.next', { defaultValue: 'Next' })}
        <React.Fragment key="next-btn-pagination">
          <ArrowRightIcon className="gi-block gi-shrink-0" />
        </React.Fragment>
      </Button>
    </div>
  );
};

const styles = tv({
  slots: {
    container: 'gi-flex xs:gi-justify-center gi-justify-between gi-items-center gi-gap-2',
    button: '',
  },
  variants: {
    isSMWidth: {
      true: {
        button: 'gi-p-3 gi-h-12 gi-w-12 gi-justify-center',
      },
    },
  },
});
