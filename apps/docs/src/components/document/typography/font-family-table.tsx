import { meta } from '@govie-ds/theme-govie';
import { SampleList, toSampleTokens } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';
import { TokenValue } from '../common/token-value';
import { Table, Td, Tr } from '../common/table';
import { TokenName } from '../common/token-name';
import { Text } from '@/components/typography/text';

export function FontFamilyTable() {
  // return (
  //   <SampleList<string[]>
  //     name="font-family"
  //     tokens={toSampleTokens(meta.light.resolved.primitive.font.family)}
  //     renderValue={(value) => {
  //       return <TokenValue value={value.join(', ')} />;
  //     }}
  //     renderExample={(value) => (
  //       <span style={{ fontFamily: value.join(', ') }}>{sampleTextShort}</span>
  //     )}
  //   />
  // );

  const tokens = toSampleTokens(meta.light.resolved.primitive.font.family);

  return (
    <Table
      headers={['Token', 'Value', 'Sample']}
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
                <TokenName name={`font-family/${id}`} />
              </div>
            </Td>
            <Td>
              <p>{token.value.join(', ')}</p>
            </Td>
            <Td>
              <p
                className="text-xl"
                style={{
                  fontFamily: token.value.join(', '),
                }}
              >
                {sampleTextShort}
              </p>
            </Td>
          </Tr>
        );
      }}
    />
  );
}
