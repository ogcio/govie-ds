import { Table, Td } from './table';
import { TokenName } from '../color/token-name';
import { objectKeys } from 'ts-extras';

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
    <Table
      headers={['Token', 'Value', 'Example']}
      ids={objectKeys(tokens)}
      renderRow={(id) => {
        const { $value: value } = tokens[id];

        return (
          <tr key={id}>
            <Td className="whitespace-nowrap w-[1px] text-sm">
              <TokenName name={`${name}/${id}`} />
            </Td>
            <Td className="whitespace-nowrap w-[30%] text-sm">
              {renderValue(value)}
            </Td>
            <Td>{renderExample(value)}</Td>
          </tr>
        );
      }}
    />
  );
}
