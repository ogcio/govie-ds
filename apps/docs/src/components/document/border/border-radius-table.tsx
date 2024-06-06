import { meta } from '@govie-ds/theme-govie';
import { SampleList, toSampleTokens } from '../common/sample-list';
import { TokenValue } from '../common/token-value';

export function BorderRadiusTable() {
  return (
    <SampleList<string>
      name="border-radius"
      tokens={toSampleTokens(meta.light.resolved.primitive.border.radius)}
      renderValue={(value) => {
        return <TokenValue value={value} />;
      }}
      renderExample={(value) => {
        return (
          <div
            className="w-[200px] h-[32px] border-gold-200 border-solid border-sm"
            style={{ borderRadius: value }}
          />
        );
      }}
    />
  );
}
