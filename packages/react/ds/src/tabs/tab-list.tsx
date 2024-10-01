import React from 'react';

export function TabList({
  children,
  tabName,
}: {
  tabName?: string;
  children: React.ReactNode;
}) {
  const childrenWithName = React.Children.map(children, (element) => {
    if (React.isValidElement<{ tabName: string }>(element)) {
      return React.cloneElement<{ tabName: string }>(element, { tabName });
    }
    return element;
  });
  return (
    <div role="tablist" className="gi--mb-[1px]">
      {childrenWithName}
    </div>
  );
}
