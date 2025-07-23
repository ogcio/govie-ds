import React from 'react';
import { IconButton } from '../icon-button/icon-button.js';
import { translate as t } from '../i18n/utility.js';

export type TablePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="gi-table-pagination">
      <IconButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        appearance="dark"
        variant="flat"
        icon={{
          icon: 'first_page',
        }}
      />
      <IconButton
        disabled={currentPage === 1}
        onClick={handlePrevious}
        appearance="dark"
        variant="flat"
        icon={{
          icon: 'chevron_left',
        }}
      />
      <span className="gi-text-md" aria-live="polite">
        <span className="gi-font-bold">
          {t('table.pagination.page', {
            currentPage,
            defaultValue: `Page ${currentPage} `,
          })}
        </span>
        {t('table.pagination.ofTotal', {
          totalPages,
          defaultValue: `of ${totalPages}`,
        })}
      </span>
      <IconButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
        appearance="dark"
        variant="flat"
        icon={{
          icon: 'chevron_right',
        }}
      />
      <IconButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        appearance="dark"
        variant="flat"
        icon={{
          icon: 'last_page',
        }}
      />
    </div>
  );
};

export default TablePagination;
