import { meta } from '@govie-ds/theme-govie';
import { SampleList } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';
import { toSampleTokens } from '../common/sample-token';
import { TokenValue } from '../common/token-value';

export function FontSizeTable() {
  return (
    <SampleList<string>
      name="font-size"
      tokens={toSampleTokens(meta.light.resolved.primitive.font.size)}
      renderValue={(value) => {
        const rem = Number(value.replace('rem', ''));
        return (
          <TokenValue value={`${rem}rem`} converted={`e.g. ${rem * 16}px`} />
        );
      }}
      renderExample={(value) => (
        <span style={{ fontSize: value }}>{sampleTextShort}</span>
      )}
    />
  );
}
