import React from 'react';
import { tv } from 'tailwind-variants';
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

  const styles = dataTableFooterStyles({ onlyEnd });

  const renderFooterSection = (
    section: React.ReactElement<DataTableFooterTypeProps> | null,
    slotClassName: string,
  ): React.ReactNode => {
    if (!section) {
      return null;
    }

    return (
      <div
        className={cn(slotClassName, section.props.className)}
        style={section.props.style}
      >
        {section.props.children}
      </div>
    );
  };

  const content = (
    <div className={cn(styles.footer(), className)}>
      {renderFooterSection(start, styles.baseSection())}
      {renderFooterSection(center, styles.centerSection())}
      {renderFooterSection(end, styles.endSection())}
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

const dataTableFooterStyles = tv({
  slots: {
    footer: 'gi-flex gi-flex-row gi-w-full gi-items-center',
    baseSection: 'gi-grow gi-basis-0 gi-min-w-0',
    centerSection: 'gi-grow gi-basis-0 gi-min-w-0 gi-text-center',
    endSection: 'gi-min-w-0',
  },
  variants: {
    onlyEnd: {
      true: {
        footer: 'gi-justify-end',
      },
      false: {
        footer: 'gi-gap-2',
        endSection: 'gi-basis-1/2 gi-text-right',
      },
    },
  },
});

const isDataTableFooterSection = (
  child: React.ReactNode,
  sectionType: React.ComponentType<DataTableFooterTypeProps>,
): child is React.ReactElement<DataTableFooterTypeProps> => {
  return React.isValidElement(child) && child.type === sectionType;
};
