import { meta } from '@ogcio/theme-govie';
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
      renderSample={({ value }) => {
        return (
          <div className="flex">
            <div className="border-y border-gold-200">
              <p style={{ lineHeight: value }}>{sampleTextShort}</p>
              <p style={{ lineHeight: value }}>{sampleTextShort}</p>
            </div>
          </div>
        );
      }}
    />
  );
}
