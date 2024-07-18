import { meta } from '@govie-ds/theme-govie';
import { SampleList } from '../common/sample-list';
import { SampleTable } from '../common/sample-table';
import { sampleTextShort } from '../common/sample-text';
import { toSampleTokens } from '../common/sample-token';
import { TokenValue } from '../common/token-value';

export function LineHeightTable() {
  return (
    <SampleTable<number>
      name="line-height"
      tokens={toSampleTokens(meta.light.resolved.primitive.font.lineHeight)}
      renderValue={({ value }) => {
        return (
          <TokenValue
            value={value.toString()}
            converted={`e.g. ${value * 16}px`}
          />
        );
      }}
      renderSample={({ value }) => (
        <span style={{ lineHeight: value }}>{sampleTextShort}</span>
      )}
    />
  );
}
