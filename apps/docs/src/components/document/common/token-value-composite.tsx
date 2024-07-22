import { Fragment } from 'react';
import { TokenValue } from './token-value';

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
    <div className="grid grid-cols-1 xl:grid-cols-[auto,1fr] gap-x-md gap-y-md items-center">
      {tokens.map((token) => (
        <Fragment key={token.name}>
          <TokenValueNameComposite name={token.name} />
          <TokenValue value={token.value} converted={token.converted} inline />
        </Fragment>
      ))}
    </div>
  );
}
