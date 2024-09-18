import React from 'react';

export function Column(props: React.PropsWithChildren) {
  return <col>{props.children}</col>;
}
