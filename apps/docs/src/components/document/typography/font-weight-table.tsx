import { meta } from '@govie-ds/theme-govie';
import { FontTable } from './font-table';

export function FontWeightTable() {
  return (
    <FontTable<string>
      name="font-weight"
      tokens={meta.light.resolved.primitive.font.size}
      renderValue={(value) => value}
      renderExample={(value) => (
        <span style={{ fontWeight: value }}>Sample text</span>
      )}
    />
  );
}
