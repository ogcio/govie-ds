import { meta } from '@govie-ds/theme-govie';
import { SampleList, toSampleTokens } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';
import { TokenValue } from '../common/token-value';

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

  return <SampleTable />;
}

function SampleTable({ tokenName = 'Token' }: { tokenName?: string }) {
  const headers = [tokenName, 'Value', 'Sample'];

  return (
    <ul className="grid grid-cols-3">
      {headers.map((header) => (
        <li>{header}</li>
      ))}
    </ul>
  );
}
