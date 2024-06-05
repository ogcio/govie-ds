import { TokenName } from '../color/token-name';
import { objectKeys } from 'ts-extras';
import { Fragment } from 'react';

export function List<TValue>({
  name,
  tokens,
  renderValue,
  renderExample,
}: {
  name: string;
  tokens: Record<string, { $value: TValue }>;
  renderValue: (value: TValue) => React.ReactNode;
  renderExample: (value: TValue) => React.ReactNode;
}) {
  return (
    <Fragment>
      {objectKeys(tokens).map((key) => {
        const { $value: value } = tokens[key];

        return (
          <div
            key={key}
            className="grid grid-cols-1 lg:grid-cols-2 gap-2xl border-y-xs border-gray-50 py-xl"
          >
            <div className="flex flex-col gap-md">
              <div className="flex">
                <TokenName name={`${name}/${key}`} />
              </div>
              <div className="text-gray-900 text-xs">{renderValue(value)}</div>
            </div>
            <div className="flex flex-col gap-md">
              <p className="text-gray-600 text-xs font-light">Sample</p>
              {renderExample(value)}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
