import React from 'react';

export function TableHead(props: React.PropsWithChildren) {
  return <thead>{props.children}</thead>;
}
