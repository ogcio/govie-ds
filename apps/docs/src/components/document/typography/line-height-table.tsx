import { meta } from '@govie-ds/theme-govie';
import { SampleList, toSampleTokens } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';
import { TokenValue } from '../common/token-value';

export function LineHeightTable() {
  return (
    <SampleList<number>
      name="line-height"
      tokens={toSampleTokens(meta.light.resolved.primitive.font.lineHeight)}
      renderValue={(value) => {
        return (
          <TokenValue
            value={value.toString()}
            converted={`e.g. ${value * 16}px`}
          />
        );
      }}
      renderExample={(value) => (
        <span style={{ lineHeight: value }}>{sampleTextShort}</span>
      )}
    />
  );
}
