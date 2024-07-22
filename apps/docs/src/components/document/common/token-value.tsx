export type TokenValueProps = {
  value: string;
  converted?: string;
  inline?: boolean;
};

export function TokenValue({
  value,
  converted,
  inline = false,
}: TokenValueProps) {
  if (inline) {
    return (
      <p className="leading-none">
        <span className="text-gray-900 text-xs">{value}</span>
        {converted ? (
          <span className="text-2xs font-light hidden lg:inline">
            {' '}
            ({converted})
          </span>
        ) : null}
      </p>
    );
  }

  return (
    <div>
      <p className="leading-none text-gray-900 text-xs">{value}</p>
      {converted ? (
        <p className="text-2xs font-light hidden lg:inline">({converted})</p>
      ) : null}
    </div>
  );
}
