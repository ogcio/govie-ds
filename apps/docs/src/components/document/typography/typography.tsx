import { meta } from '@govie-ds/tokens';
import { SampleList } from '../common/sample-list';
import { Heading } from '@/components/typography/heading';
import { sampleTextLong } from '../common/sample-text';
import { TokenValue } from '../common/token-value';

function remToPx(remString: string) {
  return Number(remString.replace('rem', '')) * 16;
}

function lineHeightToPx({
  fontSize,
  lineHeight,
}: {
  fontSize: string;
  lineHeight: number;
}) {
  const unitless = Number(fontSize.replace('rem', '')) * lineHeight * 16;
  const pixels = Number.isInteger(unitless) ? unitless : unitless.toFixed(2);
  return `${pixels}px`;
}

function CellLabel({ label }: { label: string }) {
  return <p className="font-semibold">{label}:</p>;
}

function TypographyCell({
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
}: {
  fontFamily: string[];
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
}) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-x-md gap-y-md">
      <CellLabel label="Font family" />
      <p>{fontFamily.join(', ')}</p>
      <CellLabel label="Font size" />
      <TokenValue value={fontSize} converted={`${remToPx(fontSize)}px`} />
      <CellLabel label="Font weight" />
      <p>{fontWeight}</p>
      <CellLabel label="Line height" />
      <TokenValue
        value={lineHeight.toString()}
        converted={`e.g. ${lineHeightToPx({ fontSize, lineHeight })}`}
      />
    </div>
  );
}

type Font = {
  fontFamily: string[];
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
};

// TODO: type
function TypographyTable({
  name,
  tokens,
}: {
  name: string;
  tokens: Record<string, any>;
}) {
  return (
    <SampleList<Font>
      name={name}
      tokens={tokens}
      renderValue={(value) => <TypographyCell {...value} />}
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

export function Typography() {
  return (
    <div className="flex flex-col gap-2xl">
      <div className="flex flex-col gap-xl">
        <Heading as="h3">Heading</Heading>
        <TypographyTable
          name="heading/regular"
          tokens={meta.light.resolved.primitive.heading.regular}
        />
      </div>
      <div className="flex flex-col gap-xl">
        <Heading as="h3">Text</Heading>
        <TypographyTable
          name="text/regular"
          tokens={meta.light.resolved.primitive.text.regular}
        />
      </div>
    </div>
  );
}
