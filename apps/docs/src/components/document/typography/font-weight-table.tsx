import { meta } from '@govie-ds/theme-govie';
import { List } from '../common/list';
import { sampleTextShort } from '../common/sample-text';

export function FontWeightTable() {
  return (
    <List<number>
      name="font-weight"
      tokens={meta.light.resolved.primitive.font.weight}
      renderValue={(value) => value}
      renderExample={(value) => (
        <span style={{ fontWeight: value }}>{sampleTextShort}</span>
      )}
    />
  );
}
