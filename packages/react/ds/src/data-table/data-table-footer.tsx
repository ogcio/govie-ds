import React from 'react';
import { cn } from '../cn.js';

interface DataTableFooterTypeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DataTableFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
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

  const baseSectionClasses = 'gi-grow gi-basis-0 gi-min-w-0';
  const centerSectionClasses = `${baseSectionClasses} gi-text-center`;
  const endSectionClasses = cn('gi-min-w-0', {
    'gi-basis-1/2 gi-text-right': !onlyEnd,
  });

  return (
    <div
      {...props}
      className={cn(
        'gi-flex gi-flex-row gi-w-full gi-items-center gi-py-2',
        onlyEnd ? 'gi-justify-end' : 'gi-gap-2',
        className,
      )}
    >
      {renderFooterType(start, baseSectionClasses)}
      {renderFooterType(center, centerSectionClasses)}
      {renderFooterType(end, endSectionClasses)}
    </div>
  );
};

DataTableFooter.displayName = 'DataTableFooter';
