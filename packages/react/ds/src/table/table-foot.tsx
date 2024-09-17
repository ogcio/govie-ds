import React from 'react';

export function TableFoot(props: React.PropsWithChildren) {
  return <tfoot>{props.children}</tfoot>;
}
