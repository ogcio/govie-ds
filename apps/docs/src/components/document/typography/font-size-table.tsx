import { meta } from '@govie-ds/theme-govie';
import { FontTable } from './font-table';

export function FontSizeTable() {
  return (
    <FontTable<string>
      name="font-size"
      tokens={meta.light.resolved.primitive.font.size}
      renderValue={(value) => value}
      renderExample={(value) => (
        <span style={{ fontSize: value }}>Sample text</span>
      )}
    />
  );
}
