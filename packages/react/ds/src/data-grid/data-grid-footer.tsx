import React from 'react';
import { cn } from '../cn.js';

interface DataGridFooterTypeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DataGridFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export type { DataGridFooterProps, DataGridFooterTypeProps };

const isDataGridFooterSection = (
  child: React.ReactNode,
  sectionType: React.ComponentType<DataGridFooterTypeProps>,
): child is React.ReactElement<DataGridFooterTypeProps> => {
  return React.isValidElement(child) && child.type === sectionType;
};

const renderFooterType = (
  section: React.ReactElement<DataGridFooterTypeProps> | null,
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

export const DataGridFooterStart: React.FC<DataGridFooterTypeProps> = ({
  children,
  ...props
}) => <div {...props}>{children}</div>;
DataGridFooterStart.displayName = 'DataGridFooterStart';

export const DataGridFooterCenter: React.FC<DataGridFooterTypeProps> = ({
  children,
  ...props
}) => <div {...props}>{children}</div>;
DataGridFooterCenter.displayName = 'DataGridFooterCenter';

export const DataGridFooterEnd: React.FC<DataGridFooterTypeProps> = ({
  children,
  ...props
}) => <div {...props}>{children}</div>;
DataGridFooterEnd.displayName = 'DataGridFooterEnd';

export const DataGridFooter: React.FC<DataGridFooterProps> = ({
  children,
  className,
  ...props
}) => {
  const sections = React.useMemo(() => {
    let start: React.ReactElement<DataGridFooterTypeProps> | null = null;
    let center: React.ReactElement<DataGridFooterTypeProps> | null = null;
    let end: React.ReactElement<DataGridFooterTypeProps> | null = null;

    React.Children.forEach(children, (child) => {
      if (isDataGridFooterSection(child, DataGridFooterStart)) {
        start = child;
      } else if (isDataGridFooterSection(child, DataGridFooterCenter)) {
        center = child;
      } else if (isDataGridFooterSection(child, DataGridFooterEnd)) {
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

DataGridFooter.displayName = 'DataGridFooter';
