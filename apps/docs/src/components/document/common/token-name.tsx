export function TokenName({ name }: { name: string }) {
  return (
    <div className="rounded bg-gray-50 border-gray-100 border-xs px-md py-xs text-center text-sm text-gray-600 font-medium">
      {name}
    </div>
  );
}
