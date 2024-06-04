import { meta } from '@govie-ds/theme-govie';
import { FontTable } from './font-table';

export function LetterSpacingTable() {
  return (
    <FontTable<string>
      name="letter-spacing"
      tokens={meta.light.resolved.primitive.font.letterSpacing}
      renderValue={(value) => value}
      renderExample={(value) => (
        <span style={{ letterSpacing: value }}>Sample text</span>
      )}
    />
  );
}
