'use client';

import {
  TdHTMLAttributes,
  ReactNode,
  useRef,
  useEffect,
  useState,
} from 'react';
import { cn } from '../cn.js';
import { IconButton } from '../icon-button/icon-button.js';
import { TableAlign, VerticalAlign } from './table.js';

type TableDataSize = 'xs-fixed' | 'sm-fixed' | 'md-fixed' | 'lg-flex' | 'fluid';

interface TableDataProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
  valign?: VerticalAlign;
  tableCellClassName?: string;
  size?: TableDataSize;
  children: any;
}

type TableCellProps = {
  children: ReactNode;
  className?: string;
};

type TableExpandIconProps = {
  expanded?: boolean;
  onClick: any;
};

type TableDataSlotProps = Omit<TableDataProps, 'align' | 'valign'>;

export function TableData({
  align = 'left',
  valign = 'middle',
  size,
  className,
  children,
  tableCellClassName,
  ...props
}: TableDataProps) {
  const alignmentClass = {
    left: 'gi-text-left',
    center: 'gi-text-center',
    right: 'gi-text-right',
  }[align];

  const verticalAlignmentClass = {
    top: 'gi-align-top',
    middle: 'gi-align-middle',
    bottom: 'gi-align-bottom',
  }[valign];

  const sizeClass = size ? `gi-table-td-${size}` : undefined;

  const ref = useRef<HTMLTableCellElement>(null);
  const [hasFormElement, setHasFormElement] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const inputs = ref.current.querySelectorAll('input, select, button');
    setHasFormElement(inputs.length > 0);
  }, []);

  return (
    <td
      ref={ref}
      className={cn(
        'gi-table-td',
        sizeClass,
        alignmentClass,
        verticalAlignmentClass,
        className,
      )}
      {...props}
    >
      {hasFormElement ? (
        children
      ) : (
        <TableCell className={tableCellClassName}>{children}</TableCell>
      )}
    </td>
  );
}

export const TableCell = ({ children, className }: TableCellProps) => (
  <div className={cn('gi-table-data-cell', className)}>{children}</div>
);
export const TableExpandIcon = ({
  expanded,
  onClick,
}: TableExpandIconProps) => {
  const [rowSize, setRowSize] = useState<'sm' | 'md' | 'lg'>('md');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const table = containerRef.current?.closest('.gi-table');
    const size = table?.getAttribute('data-row-size') as 'sm' | 'md' | 'lg';
    if (size) {
      setRowSize(size);
    }
  }, []);

  const sizeMap = {
    sm: 'medium',
    md: 'large',
    lg: 'extraLarge',
  } as const;

  return (
    <div ref={containerRef} className="gi-table-expand-icon-container">
      <IconButton
        variant="flat"
        appearance="dark"
        size={sizeMap[rowSize]}
        icon={{
          icon: expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down',
        }}
        aria-label={expanded ? 'Collapse row' : 'Expand row'}
        className="gi-cursor-pointer"
        onClick={(event) => {
          event.preventDefault();
          onClick();
        }}
      />
    </div>
  );
};

export const TableDataSlot = ({
  children,
  className,
  ...props
}: TableDataSlotProps) => {
  return (
    <td className="gi-table-td" {...props}>
      <div className={cn('gi-table-data-slot-container', className)}>
        {children}
      </div>
    </td>
  );
};
