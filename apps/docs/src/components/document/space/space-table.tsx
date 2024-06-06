import { meta } from '@govie-ds/theme-govie';
import { SampleList, SampleToken } from '../common/sample-list';
import { TokenValue } from '../common/token-value';
import { orderBy } from 'lodash';
import { objectKeys } from 'ts-extras';

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
        return <TokenValue value={value.toString()} />;
      }}
      renderExample={(value) => {
        return 'foo';
        // const screenWidth = Number(value.replace('px', ''));
        // const percent = screenWidth / 1800;
        // const sampleWidth = 200;
        // const sampleHeight = 60;

        // return (
        //   <div
        //     className="bg-gray-50 flex justify-center"
        //     style={{
        //       width: sampleWidth,
        //       height: sampleHeight,
        //     }}
        //   >
        //     <div
        //       className="bg-gold-200 h-full"
        //       style={{ width: percent * sampleWidth }}
        //     />
        //   </div>
        // );
      }}
    />
  );
}
