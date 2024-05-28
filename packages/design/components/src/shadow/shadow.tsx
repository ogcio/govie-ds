import { tokens } from "@ogcio-ds/theme-govie";

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
