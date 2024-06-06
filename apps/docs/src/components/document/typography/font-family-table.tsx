import { meta } from '@govie-ds/theme-govie';
import { SampleList, toSampleTokens } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';

export function FontFamilyTable() {
  return (
    <SampleList<string[]>
      name="font-family"
      tokens={toSampleTokens(meta.light.resolved.primitive.font.family)}
      renderValue={(value) => value.join(', ')}
      renderExample={(value) => (
        <span style={{ fontFamily: value.join(', ') }}>{sampleTextShort}</span>
      )}
    />
  );
}
