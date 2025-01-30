import React from 'react';

type TableProps = {
  ariaRowCount?: number;
  ariaColCount?: number;
};

export function Table({
  ariaRowCount,
  ariaColCount,
  children,
}: React.PropsWithChildren<TableProps>) {
  return (
    <table
      className="gi-table"
      role="table"
      aria-label="Table"
      aria-rowcount={ariaRowCount}
      aria-colcount={ariaColCount}
    >
      {children}
    </table>
  );
}
