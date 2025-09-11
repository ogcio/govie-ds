import { Button } from '../button/button.js';
import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';

export type DataGridSelectedRowsBannerProps = {
  selectedCount: number;
  onClearSelection?: () => void;
  actions?: React.ReactNode;
  className?: string;
};

export const DataGridSelectedRowsBanner: React.FC<
  DataGridSelectedRowsBannerProps
> = ({ selectedCount, onClearSelection, actions, className, ...props }) => {
  return (
    <div
      className={cn(
        'gi-w-full gi-flex gi-items-center gi-justify-between gi-px-3 gi-py-2 gi-bg-gray-900 gi-rounded-md',
        className,
      )}
      {...props}
    >
      <div className="gi-flex gi-items-center gi-gap-3">
        <span className="gi-text-sm gi-font-medium gi-text-white">
          {t('dataGrid.selectedRows', {
            count: selectedCount,
            defaultValue: ` (${selectedCount} Row${selectedCount === 1 ? '' : 's'} selected)`,
          })}
        </span>
        {onClearSelection && (
          <Button
            appearance="light"
            size="medium"
            variant="flat"
            onClick={onClearSelection}
          >
            {t('dataGrid.clearSelection', { defaultValue: 'Clear selection' })}
          </Button>
        )}
      </div>
      {actions && <div className="gi-flex gi-gap-4">{actions}</div>}
    </div>
  );
};
