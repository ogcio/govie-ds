import { meta } from '@govie-ds/theme-govie';
import { objectKeys } from 'ts-extras';
import { TokenName } from '../color/token-name';
import { Table, Td } from './table';

export function FontFamilyTable() {
  return (
    <Table
      headers={['Token', 'Value', 'Example']}
      ids={objectKeys(meta.light.resolved.primitive.font.family)}
      renderRow={(id) => {
        const { $value: value } = meta.light.resolved.primitive.font.family[id];

        return (
          <tr key={id}>
            <Td className="whitespace-nowrap w-[1px] text-sm">
              <TokenName name={`font-family/${id}`} />
            </Td>
            <Td className="text-sm">{value.join(', ')}</Td>
            <Td style={{ fontFamily: value.join(', ') }}>Sample text</Td>
          </tr>
        );
      }}
    />
  );
}
