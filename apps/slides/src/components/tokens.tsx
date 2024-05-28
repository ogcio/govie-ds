export type Token = {
  name: string;
  value: string;
};

export function TokenName({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center rounded bg-blue-200 shadow-sm px-lg py-md text-center text-sm text-gray-600 font-medium">
      {name}
    </div>
  );
}

export function TokenValue({ value }: { value: string }) {
  return (
    <div className="flex items-center justify-center rounded bg-blue-50 shadow-sm px-lg py-md text-center text-xs text-gray-600">
      {value}
    </div>
  );
}

export function Tokens({ tokens }: { tokens: Token[] }) {
  return (
    <div className="flex flex-col gap-md">
      {tokens.map(({ name, value }) => (
        <div key={name} className="grid grid-cols-2 gap-md">
          <TokenName name={name} />
          <TokenValue value={value} />
        </div>
      ))}
    </div>
  );
}

export function TokensStacked({ tokens }: { tokens: Token[] }) {
  return (
    <div className="flex flex-col gap-md">
      {tokens.map(({ name, value }) => (
        <div key={name}>
          <TokenName name={name} />
          <TokenValue value={value} />
        </div>
      ))}
    </div>
  );
}
