import { meta } from '@govie-ds/theme-govie';
import { SampleList } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';

export function FontSizeTable() {
  return (
    <SampleList<string>
      name="font-size"
      tokens={meta.light.resolved.primitive.font.size}
      renderValue={(value) => value}
      renderExample={(value) => (
        <span style={{ fontSize: value }}>{sampleTextShort}</span>
      )}
    />
  );
}
