import { Fragment } from 'react';

export type TokenValueProps = {
  value: string;
  converted?: string;
};

export function TokenValue({ value, converted }: TokenValueProps) {
  return (
    <p className="leading-none">
      <span className="text-gray-900 text-xs">{value}</span>
      {converted ? (
        <span className="text-2xs font-light"> ({converted})</span>
      ) : null}
    </p>
  );
}

export type TokenValueCompositeProps = {
  tokens: {
    name: string;
    value: string;
    converted?: string;
  }[];
};

function TokenValueNameComposite({ name }: { name: string }) {
  return (
    <p className="leading-none text-gray-900 text-xs font-semibold">{name}:</p>
  );
}

export function TokenValueComposite({ tokens }: TokenValueCompositeProps) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-x-md gap-y-md items-center">
      {tokens.map((token) => (
        <Fragment key={token.name}>
          <TokenValueNameComposite name={token.name} />
          <TokenValue value={token.value} converted={token.converted} />
        </Fragment>
      ))}
    </div>
  );
}
