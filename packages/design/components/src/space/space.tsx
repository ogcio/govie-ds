import { Fragment } from 'react/jsx-runtime';
import orderBy from 'lodash.orderby';
import { objectKeys } from 'ts-extras';
import { TokenName } from '../token/token-name.js';

export type Space = {
  name: string;
  value: string;
};

export type SpaceProps = {
  spaces: Space[];
};

export function sortSpaces(
  spaces: Record<string, { $type: string; $value: string }>,
) {
  return orderBy(
    objectKeys(spaces).map((key) => ({
      name: `space/${key}`,
      value: Number(spaces[key].$value.replace('px', '')),
    })),
    ['value'],
    ['asc'],
  );
}

export function Space({ spaces }: SpaceProps) {
  return (
    <div className="grid grid-cols-[auto,auto,1fr] gap-sm items-center">
      {spaces.map((space) => (
        <Fragment key={space.name}>
          <div>
            <TokenName name={space.name} />
          </div>
          <div>
            <p className="text-gray-600">{space.value}</p>
          </div>
          <div
            key={space.name}
            className="bg-blue-200"
            style={{ width: space.value, height: '12px' }}
          />
        </Fragment>
      ))}
    </div>
  );
}
