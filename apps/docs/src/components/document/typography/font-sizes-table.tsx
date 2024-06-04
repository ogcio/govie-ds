import { meta } from '@govie-ds/theme-govie';
import { objectKeys } from 'ts-extras';
import { TokenName } from '../color/token-name';
import { Table, Td } from './table';

export function FontSizesTable() {
  return (
    <Table
      headers={['Token', 'Value', 'Example']}
      ids={objectKeys(meta.light.resolved.primitive.font.size)}
      renderRow={(id) => {
        const { $value: value } = meta.light.resolved.primitive.font.size[id];

        return (
          <tr key={id}>
            <Td className="whitespace-nowrap w-[1px] text-sm">
              <TokenName name={`font-size/${id}`} />
            </Td>
            <Td className="text-sm">{value}</Td>
            <Td style={{ fontSize: value }}>Sample text</Td>
          </tr>
        );
      }}
    />
  );
}
