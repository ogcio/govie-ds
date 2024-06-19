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

function TypescaleTable({ type }: { type: 'heading' | 'text' }) {
  return (
    <SampleList<Font>
      name={`typescale/${type}`}
      tokens={toSampleTokens(meta.light.resolved.primitive.typescale[type])}
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

export function TypescaleHeadingTable() {
  return <TypescaleTable type="heading" />;
}

export function TypescaleTextTable() {
  return <TypescaleTable type="text" />;
}
