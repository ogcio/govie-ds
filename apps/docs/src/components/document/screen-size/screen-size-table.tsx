import { meta } from '@govie-ds/theme-govie';
import { List } from '../common/list';
import { sampleTextShort } from '../common/sample-text';

export function ScreenSizeTable() {
  return (
    <List<string>
      name="screen"
      tokens={meta.light.resolved.primitive.screen}
      renderValue={(value) => value}
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
