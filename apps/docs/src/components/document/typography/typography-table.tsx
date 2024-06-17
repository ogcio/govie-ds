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

function TypographyTable({ type }: { type: 'heading' | 'text' }) {
  return (
    <SampleList<Font>
      name={`typography/${type}`}
      tokens={toSampleTokens(meta.light.resolved.primitive.typography[type])}
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

export function TypographyHeadingTable() {
  return <TypographyTable type="heading" />;
}

export function TypographyTextTable() {
  return <TypographyTable type="text" />;
}
