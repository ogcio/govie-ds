import { meta } from '@govie-ds/theme-govie';
import { SampleList } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';

export function LineHeightTable() {
  return (
    <SampleList<number>
      name="line-height"
      tokens={meta.light.resolved.primitive.font.lineHeight}
      renderValue={(value) => value}
      renderExample={(value) => (
        <span style={{ lineHeight: value }}>{sampleTextShort}</span>
      )}
    />
  );
}
