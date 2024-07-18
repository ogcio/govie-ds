import { Fragment } from 'react';
import { SampleToken } from './sample-token';
import { TokenName } from './token-name';

export function SampleList<TValue>({
  name,
  tokens,
  renderValue,
  renderExample,
}: {
  name: string;
  tokens: SampleToken<TValue>[];
  renderValue: (value: TValue) => React.ReactNode;
  renderExample: (value: TValue) => React.ReactNode;
}) {
  return (
    <Fragment>
      {tokens.map((token) => {
        return (
          <div
            key={token.name}
            className="grid grid-cols-1 lg:grid-cols-2 gap-2xl border-y-xs border-gray-50 py-xl"
          >
            <div className="flex flex-col gap-lg">
              <div className="flex">
                <TokenName name={`${name}/${token.name}`} />
              </div>
              <div className="px-md">{renderValue(token.value)}</div>
            </div>
            <div className="flex flex-col gap-md">
              <p className="text-gray-600 text-2xs font-light">Sample</p>
              <div className="flex justify-center lg:justify-start text-center lg:text-start">
                {renderExample(token.value)}
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
