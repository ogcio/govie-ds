import { meta } from '@govie-ds/tokens';
import { SampleList, toSampleTokens } from '../common/sample-list';
import { sampleTextLong } from '../common/sample-text';
import { TypographyValueComposite } from './typography-value-composite';

type Font = {
  fontFamily: string[];
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
};

export function TypographyTable() {
  return (
    <SampleList<Font>
      name="typography"
      tokens={toSampleTokens(meta.light.resolved.primitive.typography.regular)}
      renderValue={(value) => <TypographyValueComposite {...value} />}
      renderExample={(value) => (
        <span
          style={{
            fontFamily: value.fontFamily.join(', '),
            fontSize: value.fontSize,
            fontWeight: value.fontWeight,
            lineHeight: value.lineHeight,
          }}
        >
          {sampleTextLong}
        </span>
      )}
    />
  );
}
