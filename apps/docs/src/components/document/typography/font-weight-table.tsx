import { meta } from '@govie-ds/theme-govie';
import { SampleList, toSampleTokens } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';

export function FontWeightTable() {
  return (
    <SampleList<number>
      name="font-weight"
      tokens={toSampleTokens(meta.light.resolved.primitive.font.weight)}
      renderValue={(value) => value}
      renderExample={(value) => (
        <span style={{ fontWeight: value }}>{sampleTextShort}</span>
      )}
    />
  );
}
