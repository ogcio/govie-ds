export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-md py-xs text-gray-500 text-xs">
        <p>{title}</p>
      </div>
      <div className="p-lg">{children}</div>
    </div>
  );
}
