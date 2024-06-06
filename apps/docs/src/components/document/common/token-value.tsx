export function TokenValue({
  value,
  converted,
}: {
  value: string;
  converted?: string;
}) {
  return (
    <div>
      {value}
      {converted ? (
        <span className="text-2xs font-light"> ({converted})</span>
      ) : null}
    </div>
  );
}
