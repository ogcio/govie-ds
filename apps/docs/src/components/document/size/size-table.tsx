import { meta } from '@govie-ds/theme-govie';
import { SampleList } from '../common/sample-list';
import { toSampleTokens } from '../common/sample-token';
import { TokenValue } from '../common/token-value';

export function SizeTable() {
  return (
    <SampleList<string>
      name="size"
      tokens={toSampleTokens(meta.light.resolved.primitive.size)}
      renderValue={(value) => {
        return <TokenValue value={value} />;
      }}
      renderExample={(value) => {
        return (
          <div
            className="bg-gold-200"
            style={{ width: value, height: value }}
          />
        );
      }}
    />
  );
}
