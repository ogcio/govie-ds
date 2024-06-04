import { meta } from '@govie-ds/tokens';
import { objectKeys } from 'ts-extras';
import { Table, Td } from './table';
import { TokenName } from '../color/token-name';
import { P } from 'vitest/dist/reporters-yx5ZTtEV.js';

function remToPx(remString: string) {
  return `${Number(remString.replace('rem', '')) * 16}px`;
}

function unitlessToPx(unitless: number) {
  return `${unitless * 16}px`;
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
    <Td className="text-sm">
      <div className="grid grid-cols-2">
        <CellLabel label="Font family" />
        <p>{fontFamily.join(', ')}</p>
        <CellLabel label="Font size" />
        <p>
          {fontSize} ({remToPx(fontSize)})
        </p>
        <CellLabel label="Font weight" />
        <p>{fontWeight}</p>
        <CellLabel label="Line height" />
        <p>
          {lineHeight} ({unitlessToPx(lineHeight)})
        </p>
      </div>
    </Td>
  );
}

// TODO: type
function TypographyTable({
  name,
  tokens,
}: {
  name: string;
  tokens: Record<string, { regular: any; bold: any }>;
}) {
  return (
    <Table
      headers={['Token', 'Regular', 'Bold']} // , 'Example']}
      ids={objectKeys(tokens)}
      renderRow={(id) => {
        const { $value: regularValue } = tokens[id].regular;

        const { $value: boldValue } = tokens[id].bold;

        const {
          fontFamily: fontFamilyRegular,
          fontSize: fontSizeRegular,
          fontWeight: fontWeightRegular,
          lineHeight: lineHeightRegular,
        } = regularValue;

        const {
          fontFamily: fontFamilyBold,
          fontSize: fontSizeBold,
          fontWeight: fontWeightBold,
          lineHeight: lineHeightBold,
        } = boldValue;

        return (
          <tr key={id}>
            <Td className="whitespace-nowrap w-[1px] text-sm">
              <TokenName name={`${name}/${id}`} />
            </Td>
            <TypographyCell
              fontFamily={fontFamilyRegular}
              fontSize={fontSizeRegular}
              fontWeight={fontWeightRegular}
              lineHeight={lineHeightRegular}
            />
            <TypographyCell
              fontFamily={fontFamilyBold}
              fontSize={fontSizeBold}
              fontWeight={fontWeightBold}
              lineHeight={lineHeightBold}
            />
          </tr>
        );
      }}
    />
  );
}

export function Typography() {
  return (
    <div className="flex flex-col gap-2xl">
      <TypographyTable
        name="heading"
        tokens={meta.light.resolved.primitive.heading}
      />
      <TypographyTable
        name="text"
        tokens={meta.light.resolved.primitive.text}
      />
    </div>
  );
}
