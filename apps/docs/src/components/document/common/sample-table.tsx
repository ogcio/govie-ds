import { HeadingSize, ParagraphSize } from '@govie-ds/react';
import { SampleToken } from './sample-token';
import { Table, Td, Tr } from './table';
import { TokenName } from './token-name';

export function SampleTable<TValue>({
  name,
  tokenColumnName = 'Token',
  tokens,
  renderValue,
  renderSample,
}: {
  name: string;
  tokenColumnName?: string;
  tokens: SampleToken<TValue>[];
  renderValue: ({ value }: { value: TValue }) => React.ReactNode;
  renderSample: (props: {
    id: string | ParagraphSize | HeadingSize;
    value: TValue;
  }) => React.ReactNode;
}) {
  return (
    <Table
      headers={[tokenColumnName, 'Value', 'Sample']}
      ids={tokens.map((token) => token.name)}
      renderRow={(id) => {
        const token = tokens.find((token) => token.name === id);

        if (!token) {
          throw new Error(`Token not found '${id}'.`);
        }

        return (
          <Tr key={id}>
            <Td>
              <div className="flex">
                <TokenName name={`${name}/${id}`} />
              </div>
            </Td>
            <Td>{renderValue({ value: token.value })}</Td>
            <Td>{renderSample({ id: token.name, value: token.value })}</Td>
          </Tr>
        );
      }}
    />
  );
}
