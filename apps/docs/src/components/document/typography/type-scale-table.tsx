import { meta } from '@ogcio/design-system-tokens';
import { SampleList } from '../common/sample-list';
import { sampleTextShort } from '../common/sample-text';
import { toSampleTokens } from '../common/sample-token';
import { TypographyValueComposite } from './typography-value-composite';

type Font = {
  fontFamily: string[];
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
};

function TypeScaleTable({
  name,
  tokens,
}: {
  name: string;
  tokens: Record<string, { $type: string; $value: Font }>;
}) {
  return (
    <SampleList<Font>
      name={name}
      tokens={toSampleTokens(tokens)}
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
          {sampleTextShort}
        </span>
      )}
    />
  );
}

export function TypeScaleHeadingTable() {
  return (
    <div className="flex flex-col gap-md">
      <TypeScaleTable
        name="type-scale/heading/regular"
        tokens={meta.light.resolved.primitive.typeScale.heading.regular}
      />
      <TypeScaleTable
        name="type-scale/heading/bold"
        tokens={meta.light.resolved.primitive.typeScale.heading.bold}
      />
    </div>
  );
}

export function TypeScaleTextTable() {
  return (
    <TypeScaleTable
      name="type-scale/text"
      tokens={meta.light.resolved.primitive.typeScale.text}
    />
  );
}
