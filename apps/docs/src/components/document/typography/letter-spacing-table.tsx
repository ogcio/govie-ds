import { meta } from '@govie-ds/theme-govie';
import { SampleList } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';
import { toSampleTokens } from '../common/sample-token';
import { TokenValue } from '../common/token-value';

function remToEm(value: string) {
  return value.replace('rem', 'em');
}

export function LetterSpacingTable() {
  return (
    <SampleList<string>
      name="letter-spacing"
      tokens={toSampleTokens(meta.light.resolved.primitive.font.letterSpacing)}
      renderValue={(value) => {
        const em = Number(value.replace('rem', ''));
        return <TokenValue value={`${em}em`} converted={`e.g. ${em * 16}px`} />;
      }}
      renderExample={(value) => (
        <span style={{ letterSpacing: remToEm(value) }}>{sampleTextShort}</span>
      )}
    />
  );
}
