import { meta } from '@govie-ds/theme-govie';
import { SampleList } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';

export function FontFamilyTable() {
  return (
    <SampleList<string[]>
      name="font-family"
      tokens={meta.light.resolved.primitive.font.family}
      renderValue={(value) => value.join(', ')}
      renderExample={(value) => (
        <span style={{ fontFamily: value.join(', ') }}>{sampleTextShort}</span>
      )}
    />
  );
}
