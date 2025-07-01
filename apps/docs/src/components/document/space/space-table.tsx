import { meta } from '@ogcio/theme-govie';
import { orderBy } from 'lodash';
import { objectKeys } from 'ts-extras';
import { SampleList } from '../common/sample-list';
import { SampleToken } from '../common/sample-token';
import { TokenValue } from '../common/token-value';

function sortSpaces(
  spaces: Record<string, { $type: string; $value: string }>,
): SampleToken<number>[] {
  const spaceNumbers = objectKeys(spaces).map((key) => ({
    name: key,
    value: Number(spaces[key].$value.replace('px', '')),
  }));

  return orderBy(spaceNumbers, ['value'], ['asc']);
}

export function SpaceTable() {
  return (
    <SampleList<number>
      name="space"
      tokens={sortSpaces(meta.light.resolved.primitive.space)}
      renderValue={(value) => {
        return <TokenValue value={`${value}px`} />;
      }}
      renderExample={(value) => {
        return (
          <div
            className="bg-gold-200"
            style={{ width: value, height: '12px' }}
          />
        );
      }}
    />
  );
}
