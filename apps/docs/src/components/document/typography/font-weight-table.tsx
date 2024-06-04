import { meta } from '@govie-ds/theme-govie';
import { FontTable } from './font-table';

export function FontWeightTable() {
  return (
    <FontTable<number>
      name="font-weight"
      tokens={meta.light.resolved.primitive.font.weight}
      renderValue={(value) => value}
      renderExample={(value) => (
        <span style={{ fontWeight: value }}>Sample text</span>
      )}
    />
  );
}
