import { meta } from '@govie-ds/theme-govie';
import { List } from '../common/list';
import { sampleTextShort } from '../common/sample-text';

export function FontSizeTable() {
  return (
    <List<string>
      name="font-size"
      tokens={meta.light.resolved.primitive.font.size}
      renderValue={(value) => value}
      renderExample={(value) => (
        <span style={{ fontSize: value }}>{sampleTextShort}</span>
      )}
    />
  );
}
