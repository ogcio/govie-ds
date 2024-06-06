import { meta } from '@govie-ds/theme-govie';
import { SampleList, toSampleTokens } from '../common/sample-list';
import { TokenValue } from '../common/token-value';

export function BorderWidthTable() {
  return (
    <SampleList<string>
      name="border-width"
      tokens={toSampleTokens(meta.light.resolved.primitive.border.width)}
      renderValue={(value) => {
        return <TokenValue value={value} />;
      }}
      renderExample={(value) => {
        return (
          <div
            className="w-[200px] h-[16px] border-gold-200 border-solid"
            style={{ borderTopWidth: value }}
          />
        );
      }}
    />
  );
}
