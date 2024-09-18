import React from 'react';

export function ColumnGroup(props: React.PropsWithChildren) {
  return <colgroup>{props.children}</colgroup>;
}
