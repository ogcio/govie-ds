import React from 'react';
import { Chip } from '../chip/chip.js';
import { cn } from '../cn.js';
import { Heading } from '../heading/heading.js';
import { translate as t } from '../i18n/utility.js';

interface DataGridHeaderTypeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DataGridHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const isSection = <P,>(
  child: React.ReactNode,
  sectionType: React.ComponentType<P>,
): child is React.ReactElement<P> => {
  return React.isValidElement(child) && child.type === sectionType;
};

export const DataGridHeader: React.FC<DataGridHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  const { search, filter, filterList, actions } = React.useMemo(() => {
    let search: React.ReactElement<DataGridHeaderTypeProps> | null = null;
    let filter: React.ReactElement<DataGridHeaderTypeProps> | null = null;
    let filterList: React.ReactElement<DataGridHeaderFilterListProps> | null =
      null;
    let actions: React.ReactElement<DataGridHeaderTypeProps> | null = null;

    React.Children.forEach(children, (child) => {
      if (isSection(child, DataGridHeaderSearch)) {
        search = child;
      } else if (isSection(child, DataGridHeaderFilter)) {
        filter = child;
      } else if (isSection(child, DataGridHeaderFilterList)) {
        filterList = child;
      } else if (isSection(child, DataGridHeaderActions)) {
        actions = child;
      }
    });

    return { search, filter, filterList, actions };
  }, [children]);

  return (
    <div
      {...props}
      className={cn(
        'gi-flex gi-flex-wrap gi-items-center gi-w-full gi-gap-4 gi-mb-2',
        className,
      )}
    >
      <div className="gi-flex gi-flex-1 gi-gap-4 gi-items-center">
        {search}
        {filter}
        {actions}
      </div>

      {filterList && <div className="gi-w-full">{filterList}</div>}
    </div>
  );
};

export const DataGridHeaderSearch: React.FC<DataGridHeaderTypeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('gi-flex gi-flex-1', className)} {...props}>
      {children}
    </div>
  );
};

export const DataGridHeaderActions: React.FC<DataGridHeaderTypeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('gi-flex gi-items-center gi-ml-auto gi-gap-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const DataGridHeaderFilter: React.FC<DataGridHeaderTypeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('gi-flex gi-items-center', className)} {...props}>
      {children}
    </div>
  );
};

export const DataGridHeaderFilterTitle: React.FC<DataGridHeaderTypeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('gi-border-b gi-px-6 gi-py-4', className)} {...props}>
      <Heading as="h6">{children}</Heading>
    </div>
  );
};

export const DataGridHeaderFilterContent: React.FC<DataGridHeaderTypeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('gi-flex gi-flex-col gi-gap-2 gi-px-6', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const DataGridHeaderFilterContentTitle: React.FC<
  DataGridHeaderTypeProps
> = ({ children, className, ...props }) => {
  return (
    <div className={cn('gi-py-2 gi-font-medium', className)} {...props}>
      {children}
    </div>
  );
};

export const DataGridHeaderFilterActions: React.FC<DataGridHeaderTypeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('gi-flex gi-justify-end gi-gap-2 gi-p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
};

type DataGridHeaderFilterListProps = {
  filters: { id: string; label: string }[];
  onRemove?: (id: string) => void;
  className?: string;
};

export const DataGridHeaderFilterList: React.FC<
  DataGridHeaderFilterListProps
> = ({ filters, onRemove, className, ...props }) => {
  if (!filters || filters.length === 0) {
    return null;
  }

  return (
    <div
      className={cn('gi-flex gi-items-center gi-gap-2 gi-flex-wrap', className)}
      {...props}
    >
      <span className="gi-text-sm">
        {t('dataGridHeader.filtersApplied', {
          length: filters.length,
          defaultValue: `Filters applied ${filters.length}:`,
        })}
      </span>

      {filters.map((filter) => (
        <Chip
          key={filter.id}
          onClose={() => onRemove?.(filter.id)}
          label={filter.label}
        />
      ))}
    </div>
  );
};

DataGridHeader.displayName = 'DataGridHeader';
DataGridHeaderSearch.displayName = 'DataGridHeaderSearch';
DataGridHeaderActions.displayName = 'DataGridHeaderActions';
DataGridHeaderFilter.displayName = 'DataGridHeaderFilter';
DataGridHeaderFilterList.displayName = 'DataGridHeaderFilterList';
DataGridHeaderFilterTitle.displayName = 'DataGridHeaderFilterTitle';
DataGridHeaderFilterContent.displayName = 'DataGridHeaderFilterContent';
DataGridHeaderFilterContentTitle.displayName =
  'DataGridHeaderFilterContentTitle';
DataGridHeaderFilterActions.displayName = 'DataGridHeaderFilterActions';

Object.defineProperty(DataGridHeader, 'componentType', {
  value: 'DataGridHeader',
});
Object.defineProperty(DataGridHeaderSearch, 'componentType', {
  value: 'DataGridHeaderSearch',
});
Object.defineProperty(DataGridHeaderActions, 'componentType', {
  value: 'DataGridHeaderActions',
});
Object.defineProperty(DataGridHeaderFilter, 'componentType', {
  value: 'DataGridHeaderFilter',
});
Object.defineProperty(DataGridHeaderFilterList, 'componentType', {
  value: 'DataGridHeaderFilterList',
});
Object.defineProperty(DataGridHeaderFilterTitle, 'componentType', {
  value: 'DataGridHeaderFilterTitle',
});
Object.defineProperty(DataGridHeaderFilterContent, 'componentType', {
  value: 'DataGridHeaderFilterContent',
});
Object.defineProperty(DataGridHeaderFilterContentTitle, 'componentType', {
  value: 'DataGridHeaderFilterContentTitle',
});
Object.defineProperty(DataGridHeaderFilterActions, 'componentType', {
  value: 'DataGridHeaderFilterActions',
});
