import React, {
  Children,
  HTMLAttributes,
  isValidElement,
  useMemo,
} from 'react';
import { Button } from '../button/button.js';
import { Chip } from '../chip/chip.js';
import { cn } from '../cn.js';
import { Heading } from '../heading/heading.js';
import { translate as t } from '../i18n/utility.js';

interface DataTableHeaderTypeProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DataTableHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  showHeader?: boolean;
  showFilter?: boolean;
}

const isSection = <P,>(
  child: React.ReactNode,
  sectionType: React.ComponentType<P>,
): child is React.ReactElement<P> => {
  return isValidElement(child) && child.type === sectionType;
};

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  children,
  className,
  showHeader = true,
  showFilter = true,
  ...props
}) => {
  const { search, filter, filterList, actions } = useMemo(() => {
    let search: React.ReactElement<DataTableHeaderTypeProps> | null = null;
    let filter: React.ReactElement<DataTableHeaderTypeProps> | null = null;
    let filterList: React.ReactElement<DataTableHeaderFilterListProps> | null =
      null;
    let actions: React.ReactElement<DataTableHeaderTypeProps> | null = null;

    Children.forEach(children, (child) => {
      if (isSection(child, DataTableHeaderSearch)) {
        search = child;
      } else if (isSection(child, DataTableHeaderFilter)) {
        filter = child;
      } else if (isSection(child, DataTableHeaderFilterList)) {
        filterList = child;
      } else if (isSection(child, DataTableHeaderActions)) {
        actions = child;
      }
    });

    return { search, filter, filterList, actions };
  }, [children]);

  return (
    <div {...props} className={cn('gi-data-table-header', className)}>
      {showHeader && (
        <div className="gi-flex gi-flex-1 gi-gap-4 gi-items-center">
          {search}
          {filter}
          {actions}
        </div>
      )}

      {filterList && showFilter && (
        <div className="gi-w-full">{filterList}</div>
      )}
    </div>
  );
};

export const DataTableHeaderSearch: React.FC<DataTableHeaderTypeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('gi-data-table-header-search', className)} {...props}>
      {children}
    </div>
  );
};

export const DataTableHeaderActions: React.FC<DataTableHeaderTypeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('gi-data-table-header-actions', className)} {...props}>
      {children}
    </div>
  );
};

export const DataTableHeaderFilter: React.FC<DataTableHeaderTypeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('gi-data-table-header-filter', className)} {...props}>
      {children}
    </div>
  );
};
export const DataTableHeaderFilterContent: React.FC<
  DataTableHeaderTypeProps
> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('gi-data-table-header-filter-content', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const DataTableHeaderFilterContentTitle: React.FC<
  DataTableHeaderTypeProps
> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('gi-data-table-header-filter-content-title', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const DataTableHeaderFilterActions: React.FC<
  DataTableHeaderTypeProps
> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('gi-data-table-header-filter-actions', className)}
      {...props}
    >
      {children}
    </div>
  );
};

type DataTableHeaderFilterListProps = {
  filters: { id: string; label: string }[];
  onRemove?: (id: string) => void;
  onClear?: () => void;
  className?: string;
};

export const DataTableHeaderFilterList: React.FC<
  DataTableHeaderFilterListProps
> = ({ filters, onRemove, onClear, className, ...props }) => {
  if (!filters || filters.length === 0) {
    return null;
  }

  return (
    <div
      className={cn('gi-data-table-header-filter-list', className)}
      {...props}
    >
      <span className="gi-text-sm">
        {t('dataTableHeader.filtersApplied', {
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

      <Button
        appearance="dark"
        size="medium"
        variant="flat"
        onClick={() => {
          onClear?.();
        }}
      >
        {t('dataTableHeader.clearAllFilters', {
          defaultValue: 'Clear all filters',
        })}
      </Button>
    </div>
  );
};

DataTableHeader.displayName = 'DataTableHeader';
DataTableHeaderSearch.displayName = 'DataTableHeaderSearch';
DataTableHeaderActions.displayName = 'DataTableHeaderActions';
DataTableHeaderFilter.displayName = 'DataTableHeaderFilter';
DataTableHeaderFilterList.displayName = 'DataTableHeaderFilterList';
DataTableHeaderFilterContent.displayName = 'DataTableHeaderFilterContent';
DataTableHeaderFilterContentTitle.displayName =
  'DataTableHeaderFilterContentTitle';
DataTableHeaderFilterActions.displayName = 'DataTableHeaderFilterActions';

Object.defineProperty(DataTableHeader, 'componentType', {
  value: 'DataTableHeader',
});
Object.defineProperty(DataTableHeaderSearch, 'componentType', {
  value: 'DataTableHeaderSearch',
});
Object.defineProperty(DataTableHeaderActions, 'componentType', {
  value: 'DataTableHeaderActions',
});
Object.defineProperty(DataTableHeaderFilter, 'componentType', {
  value: 'DataTableHeaderFilter',
});
Object.defineProperty(DataTableHeaderFilterList, 'componentType', {
  value: 'DataTableHeaderFilterList',
});
Object.defineProperty(DataTableHeaderFilterContent, 'componentType', {
  value: 'DataTableHeaderFilterContent',
});
Object.defineProperty(DataTableHeaderFilterContentTitle, 'componentType', {
  value: 'DataTableHeaderFilterContentTitle',
});
Object.defineProperty(DataTableHeaderFilterActions, 'componentType', {
  value: 'DataTableHeaderFilterActions',
});
