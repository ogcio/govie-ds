import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';

export type DataTableSelectedRowsBannerProps = {
  selectedCount: number;
  actions?: React.ReactNode;
  className?: string;
};

export const DataTableSelectedRowsBanner: React.FC<
  DataTableSelectedRowsBannerProps
> = ({ selectedCount, actions, className, ...props }) => {
  return (
    <div
      className={cn(
        'gi-w-full gi-flex gi-items-center gi-justify-between gi-px-3 gi-py-2 gi-bg-gray-900 gi-rounded-md',
        className,
      )}
      {...props}
    >
      <span className="gi-text-sm gi-font-medium gi-text-white">
        {t('dataTable.selectedRows', {
          count: selectedCount,
          defaultValue: ` (${selectedCount} Row${selectedCount === 1 ? '' : 's'} selected)`,
        })}
      </span>

      <div className="gi-flex gi-gap-4">{actions}</div>
    </div>
  );
};
