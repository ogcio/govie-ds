import React from 'react';

export function TableHeader(props: React.PropsWithChildren) {
  return <th className="gi-table-th">{props.children}</th>;
}
