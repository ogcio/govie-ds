'use client';

export function ComponentPreview({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex w-full h-32 border border-gray-200 shadow-sm shadow-gray-200 p-2 items-center justify-center">
      {children}
    </li>
  );
}

export function ComponentPreviewItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li className="flex w-32 h-32 border border-gray-200 shadow-sm shadow-gray-200 p-2 items-center justify-center">
      {children}
    </li>
  );
}

export function ComponentPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ul className="flex flex-wrap gap-2 p-0 gi-not-prose">{children}</ul>;
}
