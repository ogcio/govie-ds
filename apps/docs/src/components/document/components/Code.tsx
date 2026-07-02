export function Code({ children }: { children: any }) {
  return (
    <code className="bg-gray-50 border border-gray-200 rounded px-1 inline text-sm gi-not-prose">
      {children}
    </code>
  );
}
