import { Fragment } from 'react';

export type TokenValueProps = {
  value: string;
  converted?: string;
};

export function TokenValue({ value, converted }: TokenValueProps) {
  return (
    <div>
      {value}
      {converted ? (
        <span className="text-2xs font-light"> ({converted})</span>
      ) : null}
    </div>
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
  return <p className="font-semibold">{name}:</p>;
}

export function TokenValueComposite({ tokens }: TokenValueCompositeProps) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-x-md gap-y-md">
      {tokens.map((token) => (
        <Fragment key={token.name}>
          <TokenValueNameComposite name={token.name} />
          <TokenValue value={token.value} converted={token.converted} />
        </Fragment>
      ))}
    </div>
  );
}
