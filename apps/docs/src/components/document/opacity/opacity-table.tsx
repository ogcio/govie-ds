import { meta } from '@govie-ds/theme-govie';
import { SampleList } from '../common/sample-list';
import { toSampleTokens } from '../common/sample-token';
import { TokenValue } from '../common/token-value';

export function OpacityTable() {
  return (
    <SampleList<number>
      name="opacity"
      tokens={toSampleTokens(meta.light.resolved.primitive.opacity)}
      renderValue={(value) => {
        return <TokenValue value={value.toString()} />;
      }}
      renderExample={(value) => {
        return (
          <div
            className="bg-gold-200 w-[200px] h-[32px]"
            style={{ opacity: value }}
          />
        );
      }}
    />
  );
}
