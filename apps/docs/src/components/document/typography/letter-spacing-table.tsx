import { meta } from '@govie-ds/theme-govie';
import { List } from '../common/list';
import { sampleTextShort } from '../common/sample-text';

function remToEm(value: string) {
  return value.replace('rem', 'em');
}

export function LetterSpacingTable() {
  return (
    <List<string>
      name="letter-spacing"
      tokens={meta.light.resolved.primitive.font.letterSpacing}
      renderValue={(value) => remToEm(value)}
      renderExample={(value) => (
        <span style={{ letterSpacing: remToEm(value) }}>{sampleTextShort}</span>
      )}
    />
  );
}
