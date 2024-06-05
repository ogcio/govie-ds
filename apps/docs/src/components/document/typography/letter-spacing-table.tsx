import { meta } from '@govie-ds/theme-govie';
import { FontTable } from './font-table';
import { sampleText } from './sample-text';

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
        <span style={{ letterSpacing: remToEm(value) }}>{sampleText}</span>
      )}
    />
  );
}
