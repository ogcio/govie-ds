import { cn } from '../cn.js';

export type DataGridSelectedRowsBannerProps = {
  selectedCount: number;
  actions?: React.ReactNode;
  className?: string;
};

export const DataGridSelectedRowsBanner: React.FC<
  DataGridSelectedRowsBannerProps
> = ({ selectedCount, actions, className, ...props }) => {
  return (
    <div
      className={cn(
        'gi-w-full gi-flex gi-items-center gi-justify-between gi-px-4 gi-py-2 gi-bg-gray-900',
        className,
      )}
      {...props}
    >
      <span className="gi-text-sm gi-font-medium gi-text-white">
        {selectedCount} Row{selectedCount === 1 ? '' : 's'} selected
      </span>

      <div className="gi-flex gi-gap-2">{actions}</div>
    </div>
  );
};
