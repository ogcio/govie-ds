export function Shadow({
  name,
  boxShadow,
}: {
  name: string;
  boxShadow: string;
}) {
  return (
    <div
      className="p-lg"
      style={{
        boxShadow,
      }}
    >
      {name}
    </div>
  );
}
