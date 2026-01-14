import React from 'react';
import { cn } from '../cn.js';

interface DataTableFooterTypeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DataTableFooterProps extends React.HTMLAttributes<
  HTMLDivElement | HTMLTableSectionElement
> {
  children?: React.ReactNode;
  standalone?: boolean;
}

export type { DataTableFooterProps, DataTableFooterTypeProps };

const isDataTableFooterSection = (
  child: React.ReactNode,
  sectionType: React.ComponentType<DataTableFooterTypeProps>,
): child is React.ReactElement<DataTableFooterTypeProps> => {
  return React.isValidElement(child) && child.type === sectionType;
};

const renderFooterType = (
  section: React.ReactElement<DataTableFooterTypeProps> | null,
  baseClassName: string,
  conditionalClassName?: string,
): React.ReactNode => {
  if (!section) {
    return null;
  }

  return (
    <div
      className={cn(
        baseClassName,
        conditionalClassName,
        section.props.className,
      )}
      style={section.props.style}
    >
      {section.props.children}
    </div>
  );
};

export const DataTableFooterStart: React.FC<DataTableFooterTypeProps> = ({
  children,
  ...props
}) => <div {...props}>{children}</div>;
DataTableFooterStart.displayName = 'DataTableFooterStart';

export const DataTableFooterCenter: React.FC<DataTableFooterTypeProps> = ({
  children,
  ...props
}) => <div {...props}>{children}</div>;
DataTableFooterCenter.displayName = 'DataTableFooterCenter';

export const DataTableFooterEnd: React.FC<DataTableFooterTypeProps> = ({
  children,
  ...props
}) => <div {...props}>{children}</div>;
DataTableFooterEnd.displayName = 'DataTableFooterEnd';

export const DataTableFooter: React.FC<DataTableFooterProps> = ({
  children,
  className,
  standalone = false,
  ...props
}) => {
  const sections = React.useMemo(() => {
    let start: React.ReactElement<DataTableFooterTypeProps> | null = null;
    let center: React.ReactElement<DataTableFooterTypeProps> | null = null;
    let end: React.ReactElement<DataTableFooterTypeProps> | null = null;

    React.Children.forEach(children, (child) => {
      if (isDataTableFooterSection(child, DataTableFooterStart)) {
        start = child;
      } else if (isDataTableFooterSection(child, DataTableFooterCenter)) {
        center = child;
      } else if (isDataTableFooterSection(child, DataTableFooterEnd)) {
        end = child;
      }
    });

    return { start, center, end };
  }, [children]);

  const { start, center, end } = sections;

  const hasStart = Boolean(start);
  const hasCenter = Boolean(center);
  const hasEnd = Boolean(end);
  const onlyEnd = !hasStart && !hasCenter && hasEnd;

  const baseSectionClasses = 'gi-data-table-footer-base';
  const centerSectionClasses = `${baseSectionClasses} gi-text-center`;
  const endSectionClasses = cn('gi-min-w-0', {
    'gi-basis-1/2 gi-text-right': !onlyEnd,
  });

  const content = (
    <div
      className={cn(
        'gi-data-table-footer',
        onlyEnd ? 'gi-justify-end' : 'gi-gap-2',
        className,
      )}
    >
      {renderFooterType(start, baseSectionClasses)}
      {renderFooterType(center, centerSectionClasses)}
      {renderFooterType(end, endSectionClasses)}
    </div>
  );

  if (standalone) {
    return (
      <div {...props} className={cn('gi-w-full gi-p-2', className)}>
        {content}
      </div>
    );
  }

  return (
    <tfoot {...props}>
      <tr>
        <td colSpan={999} className="gi-p-2">
          {content}
        </td>
      </tr>
    </tfoot>
  );
};

DataTableFooter.displayName = 'DataTableFooter';
