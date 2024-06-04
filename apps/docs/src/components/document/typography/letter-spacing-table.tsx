import { meta } from '@govie-ds/theme-govie';
import { FontTable } from './font-table';

function remToEm(value: string) {
  return value.replace('rem', 'em');
}

export function LetterSpacingTable() {
  return (
    <FontTable<string>
      name="letter-spacing"
      tokens={meta.light.resolved.primitive.font.letterSpacing}
      renderValue={(value) => remToEm(value)}
      renderExample={(value) => (
        <span style={{ letterSpacing: remToEm(value) }}>Sample text</span>
      )}
    />
  );
}
