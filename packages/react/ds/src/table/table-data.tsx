'use client';

import {
  TdHTMLAttributes,
  ReactNode,
  useRef,
  useEffect,
  useState,
} from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import { TableAlign, VerticalAlign } from './table.js';

interface TableDataProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
  valign?: VerticalAlign;
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
  className,
  children,
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

  const ref = useRef<HTMLTableCellElement>(null);
  const [hasFormElement, setHasFormElement] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const inputs = ref.current.querySelectorAll('input, select');
    setHasFormElement(inputs.length > 0);
  }, []);

  return (
    <td
      ref={ref}
      className={cn(
        alignmentClass,
        verticalAlignmentClass,
        'gi-table-td',
        className,
      )}
      {...props}
    >
      {hasFormElement || children?.componentType === 'TableExpandIcon' ? (
        children
      ) : (
        <TableCell>{children}</TableCell>
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
  return (
    <div className="gi-table-expand-icon-container">
      <Icon
        size="md"
        icon={expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
        className="gi-cursor-pointer"
        onClick={(event) => {
          event?.preventDefault();
          onClick();
        }}
      />
    </div>
  );
};
Object.defineProperty(TableExpandIcon, 'componentType', {
  value: 'TableExpandIcon',
  writable: false,
  enumerable: false,
});

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
