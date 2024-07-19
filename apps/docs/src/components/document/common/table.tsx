import { Fragment } from 'react';
import { cn } from '@/lib/cn';

export function Tr({ children }: { children: React.ReactNode }) {
  return <tr>{children}</tr>;
}

export function Th({ children }: { children: React.ReactNode }) {
  return <th className="p-xl text-left text-sm text-gray-600">{children}</th>;
}

export function Td({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <td className={cn('p-xl text-gray-700', className)} style={style}>
      {children}
    </td>
  );
}

// TODO: review react table
export function Table<TId>({
  headers,
  ids,
  renderRow,
}: {
  headers: string[];
  ids: TId[];
  renderRow: (id: TId) => React.ReactNode;
}) {
  // TODO: review shadow ring-1 ring-black ring-opacity-5
  return (
    <div className="overflow-hidden sm:rounded-lg">
      <table className="w-full border border-gray-50 table-fixed">
        <thead className="bg-gray-50">
          <Tr>
            {headers.map((header) => (
              <Fragment key={header}>
                <Th key={header}>{header}</Th>
              </Fragment>
            ))}
          </Tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {ids.map((id) => renderRow(id))}
        </tbody>
      </table>
    </div>
  );
}
