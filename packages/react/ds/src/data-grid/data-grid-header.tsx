import React from 'react';
import { cn } from '../cn.js';

interface DataGridHeaderTypeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DataGridHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const isSection = (
  child: React.ReactNode,
  sectionType: React.ComponentType<DataGridHeaderTypeProps>,
): child is React.ReactElement<DataGridHeaderTypeProps> => {
  return React.isValidElement(child) && child.type === sectionType;
};

export const DataGridHeader: React.FC<DataGridHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  const { search, filter, actions } = React.useMemo(() => {
    let search: React.ReactElement<DataGridHeaderTypeProps> | null = null;
    let filter: React.ReactElement<DataGridHeaderTypeProps> | null = null;
    let actions: React.ReactElement<DataGridHeaderTypeProps> | null = null;

    React.Children.forEach(children, (child) => {
      if (isSection(child, DataGridHeaderSearch)) {
        search = child;
      } else if (isSection(child, DataGridHeaderFilter)) {
        filter = child;
      } else if (isSection(child, DataGridHeaderActions)) {
        actions = child;
      }
    });

    return { search, filter, actions };
  }, [children]);

  return (
    <div
      {...props}
      className={cn(
        'gi-flex gi-flex-wrap gi-items-center gi-w-full gi-gap-4 gi-mb-2',
        className,
      )}
    >
      {search}
      {filter}
      {actions}
    </div>
  );
};

DataGridHeader.displayName = 'DataGridHeader';

Object.defineProperty(DataGridHeader, 'componentType', {
  value: 'DataGridHeader',
  writable: false,
  enumerable: false,
});

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

DataGridHeaderSearch.displayName = 'DataGridHeaderSearch';

Object.defineProperty(DataGridHeaderSearch, 'componentType', {
  value: 'DataGridHeaderSearch',
  writable: false,
  enumerable: false,
});

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

DataGridHeaderFilter.displayName = 'DataGridHeaderFilter';

Object.defineProperty(DataGridHeaderFilter, 'componentType', {
  value: 'DataGridHeaderFilter',
  writable: false,
  enumerable: false,
});

export const DataGridHeaderActions: React.FC<DataGridHeaderTypeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('gi-flex gi-items-center  gi-ml-auto', className)}
      {...props}
    >
      {children}
    </div>
  );
};

DataGridHeaderActions.displayName = 'DataGridHeaderActions';

Object.defineProperty(DataGridHeaderActions, 'componentType', {
  value: 'DataGridHeaderActions',
  writable: false,
  enumerable: false,
});
