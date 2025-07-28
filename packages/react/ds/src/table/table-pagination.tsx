import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';
import { IconButton } from '../icon-button/icon-button.js';

export type TablePaginationProps = {
  align?: 'start' | 'center' | 'end';
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  align = 'end',
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
    <div
      className={cn(
        {
          'gi-justify-first': align === 'start',
          'gi-justify-center': align === 'center',
          'gi-justify-end': align === 'end',
        },
        'gi-table-pagination',
      )}
    >
      <IconButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        appearance="dark"
        variant="flat"
        className="gi-mr-4"
        icon={{
          icon: 'first_page',
        }}
      />
      <IconButton
        disabled={currentPage === 1}
        onClick={handlePrevious}
        appearance="dark"
        variant="flat"
        className="gi-mr-2"
        icon={{
          icon: 'chevron_left',
        }}
      />
      <div className="gi-table-pagination-label" aria-live="polite">
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
      </div>
      <IconButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
        appearance="dark"
        variant="flat"
        className="gi-ml-2"
        icon={{
          icon: 'chevron_right',
        }}
      />
      <IconButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        appearance="dark"
        variant="flat"
        className="gi-ml-4"
        icon={{
          icon: 'last_page',
        }}
      />
    </div>
  );
};

export default TablePagination;
