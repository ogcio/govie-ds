import { meta } from '@govie-ds/theme-govie';
import { FontTable } from './font-table';

export function FontFamilyTable() {
  return (
    <FontTable<string[]>
      name="font-family"
      tokens={meta.light.resolved.primitive.font.family}
      renderValue={(value) => value.join(', ')}
      renderExample={(value) => (
        <span style={{ fontFamily: value.join(', ') }}>Sample text</span>
      )}
    />
  );
}
