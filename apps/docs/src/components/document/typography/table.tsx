import { Fragment } from 'react';
import { cn } from '@/lib/cn';

export function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-md py-sm text-left text-lg text-gray-700">{children}</th>
  );
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
    <td className={cn('px-md py-lg text-gray-700', className)} style={style}>
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
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          {headers.map((header) => (
            <Fragment key={header}>
              <Th key={header}>{header}</Th>
            </Fragment>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">{ids.map((id) => renderRow(id))}</tbody>
    </table>
  );
}
