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

function TypeScaleTable({ type }: { type: 'heading' | 'text' }) {
  return (
    <SampleList<Font>
      name={`type-scale/${type}`}
      tokens={toSampleTokens(meta.light.resolved.primitive.typeScale[type])}
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

export function TypeScaleHeadingTable() {
  return <TypeScaleTable type="heading" />;
}

export function TypeScaleTextTable() {
  return <TypeScaleTable type="text" />;
}
