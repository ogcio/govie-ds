import React from 'react';

interface TableFootProps
  extends React.TableHTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
  colSpans?: {
    start?: number;
    center?: number;
    end?: number;
  };
  totalColumns: number; // total number of visible columns in the table
}

export function TableFoot({
  children,
  colSpans = {},
  totalColumns,
  ...props
}: TableFootProps) {
  let start: React.ReactNode = null;
  let center: React.ReactNode = null;
  let end: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return;
    }

    if (child.type === TableFootStart) {
      start = child;
    } else if (child.type === TableFootCenter) {
      center = child;
    } else if (child.type === TableFootEnd) {
      end = child;
    }
  });

  if (!(start && center && end)) {
    return <tfoot {...props}>{children}</tfoot>;
  }

  const activeSlots = [
    { key: 'start', content: start, colSpan: colSpans.start },
    { key: 'center', content: center, colSpan: colSpans.center },
    { key: 'end', content: end, colSpan: colSpans.end },
  ].filter((slot) => slot.content !== null);

  return (
    <tfoot {...props}>
      <tr>
        {activeSlots.map(({ key, content, colSpan }) => {
          // If only one slot and no colSpan, assign a smart default
          if (activeSlots.length === 1 && colSpan == null) {
            const defaultColSpan =
              key === 'start' || key === 'center' || key === 'end'
                ? totalColumns // occupy full row if it's the only cell
                : 1;

            return (
              <td key={key} className="gi-py-2" colSpan={defaultColSpan}>
                {content}
              </td>
            );
          }

          return (
            <td key={key} className="gi-py-2" colSpan={colSpan ?? 1}>
              {content}
            </td>
          );
        })}
      </tr>
    </tfoot>
  );
}

export function TableFootStart({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function TableFootCenter({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function TableFootEnd({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
