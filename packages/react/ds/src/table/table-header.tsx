import React from 'react';

export function TableHeader(props: React.PropsWithChildren) {
  return <th>{props.children}</th>;
}
