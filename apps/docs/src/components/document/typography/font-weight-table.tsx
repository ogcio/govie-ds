import { meta } from '@govie-ds/theme-govie';
import { SampleList } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';

export function FontWeightTable() {
  return (
    <SampleList<number>
      name="font-weight"
      tokens={meta.light.resolved.primitive.font.weight}
      renderValue={(value) => value}
      renderExample={(value) => (
        <span style={{ fontWeight: value }}>{sampleTextShort}</span>
      )}
    />
  );
}
