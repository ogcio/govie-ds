import React from 'react';

export function Table(props: React.PropsWithChildren) {
  return <table className="gi-table">{props.children}</table>;
}
