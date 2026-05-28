import { cn } from '@/cn.js';
import { translate as t } from '@/i18n/utility.js';
import { SelectItem, SelectNative } from '@/select/select-native.js';
import IconButton from '@/atoms/IconButton';
import LastPage from '@/atoms/icons/LastPage';
import KeyboardArrowRight from '@/atoms/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@/atoms/icons/KeyboardArrowLeft';
import FirstPage from '@/atoms/icons/FirstPage';

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
  const atFirstPage = currentPage === 1;
  const atLastPage = currentPage === totalPages;

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
        disabled={atFirstPage}
        onClick={() => onPageChange(1)}
        appearance="dark"
        variant="flat"
        className="gi-mr-2 gi-p-2"
        ariaLabel="First page"
      >
        <FirstPage className="gi-shrink-0" />
      </IconButton>
      <IconButton
        disabled={atFirstPage}
        onClick={handlePrevious}
        appearance="dark"
        variant="flat"
        className="gi-mr-2 gi-p-2"
        ariaLabel="Previous page"
      >
        <KeyboardArrowLeft className="gi-shrink-0" />
      </IconButton>
      <div className="gi-table-pagination-label gi-space-x-2" aria-live="polite">
        <span>
          {t('table.pagination.page', {
            defaultValue: 'Page',
          })}
        </span>
        <SelectNative
          aria-label="Select page"
          value={currentPage}
          className="!gi-min-w-12 !gi-border-color-border-system-neutral-interactive-muted"
          onChange={(event) => onPageChange(Number(event.target.value))}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <SelectItem key={index + 1} value={index + 1}>
              {index + 1}
            </SelectItem>
          ))}
        </SelectNative>
        <span>
          {t('table.pagination.ofTotal', {
            totalPages,
            defaultValue: `of ${totalPages}`,
          })}
        </span>
      </div>
      <IconButton
        onClick={handleNext}
        disabled={atLastPage}
        aria-disabled={atLastPage}
        appearance="dark"
        variant="flat"
        className="gi-ml-2 gi-p-2"
        ariaLabel="Next page"
      >
        <KeyboardArrowRight className="gi-shrink-0" />
      </IconButton>
      <IconButton
        disabled={atLastPage}
        onClick={() => onPageChange(totalPages)}
        appearance="dark"
        variant="flat"
        className="gi-ml-2 gi-p-2"
        ariaLabel="Last page"
      >
        <LastPage className="gi-shrink-0" />
      </IconButton>
    </div>
  );
};

export default TablePagination;
