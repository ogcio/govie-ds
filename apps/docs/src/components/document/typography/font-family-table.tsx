import { meta } from '@govie-ds/theme-govie';
import { List } from '../common/list';
import { sampleTextShort } from '../common/sample-text';

export function FontFamilyTable() {
  return (
    <List<string[]>
      name="font-family"
      tokens={meta.light.resolved.primitive.font.family}
      renderValue={(value) => value.join(', ')}
      renderExample={(value) => (
        <span style={{ fontFamily: value.join(', ') }}>{sampleTextShort}</span>
      )}
    />
  );
}
