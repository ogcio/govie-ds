import React from 'react';

export function TableData(props: React.PropsWithChildren) {
  return <td className="gi-table-td">{props.children}</td>;
}
