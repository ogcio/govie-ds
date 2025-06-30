import { meta } from '@ogcio/theme-govie';
import { SampleList } from '../common/sample-list';
import { toSampleTokens } from '../common/sample-token';
import { TokenValue } from '../common/token-value';

export function ScreenSizeTable() {
  return (
    <SampleList<string>
      name="screen"
      tokens={toSampleTokens(meta.light.resolved.primitive.screen)}
      renderValue={(value) => {
        return <TokenValue value={value} />;
      }}
      renderExample={(value) => {
        const screenWidth = Number(value.replace('px', ''));
        const percent = screenWidth / 1800;
        const sampleWidth = 200;
        const sampleHeight = 60;

        return (
          <div
            className="bg-gray-50 flex justify-center"
            style={{
              width: sampleWidth,
              height: sampleHeight,
            }}
          >
            <div
              className="bg-gold-200 h-full"
              style={{ width: percent * sampleWidth }}
            />
          </div>
        );
      }}
    />
  );
}
