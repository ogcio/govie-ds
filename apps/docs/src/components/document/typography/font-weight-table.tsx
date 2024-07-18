import { meta } from '@govie-ds/theme-govie';
import { SampleList } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';
import { toSampleTokens } from '../common/sample-token';
import { TokenValue } from '../common/token-value';
import { SampleTable } from '../common/sample-table';

export function FontWeightTable() {
  return (
    <SampleTable<number>
      name="font-weight"
      tokens={toSampleTokens(meta.light.resolved.primitive.font.weight)}
      renderValue={({ value }) => {
        return <TokenValue value={value.toString()} />;
      }}
      renderSample={({ value }) => (
        <span style={{ fontWeight: value }}>{sampleTextShort}</span>
      )}
    />
  );
}
