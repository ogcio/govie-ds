import { Table, Td } from './table';
import { TokenName } from '../color/token-name';
import { objectKeys } from 'ts-extras';
import { Fragment } from 'react';

export function FontTable<TValue>({
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2xl">
      {objectKeys(tokens).map((key) => {
        const { $value: value } = tokens[key];

        return (
          <Fragment key={key}>
            <div className="flex flex-col gap-md">
              <div className="flex">
                <TokenName name={`${name}/${key}`} />
              </div>
              <div className="text-gray-900 text-xs">{renderValue(value)}</div>
            </div>
            <div className="flex flex-col gap-md">
              <p className="text-gray-400 text-xs">Sample</p>
              {renderExample(value)}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
