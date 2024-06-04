import { meta } from '@govie-ds/tokens';
import { objectKeys } from 'ts-extras';
import { Table, Td } from './table';
import { TokenName } from '../color/token-name';
import { P } from 'vitest/dist/reporters-yx5ZTtEV.js';
import { FontTable } from './font-table';
import { Heading } from '@/components/typography/heading';

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
      <div className="grid grid-cols-[auto,1fr] gap-x-md">
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
    <FontTable<Font>
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
          The quick brown fox jumps over the lazy dog.
        </span>
      )}
    />
  );
}

export function Typography() {
  return (
    <div className="flex flex-col gap-2xl">
      <div>
        <Heading as="h3">Heading (Regular)</Heading>
        <TypographyTable
          name="heading/regular"
          tokens={meta.light.resolved.primitive.heading.regular}
        />
      </div>
      <div>
        <Heading as="h3">Heading (Bold)</Heading>
        <TypographyTable
          name="heading/bold"
          tokens={meta.light.resolved.primitive.heading.bold}
        />
      </div>
      <div>
        <Heading as="h3">Text (Regular)</Heading>
        <TypographyTable
          name="text/regular"
          tokens={meta.light.resolved.primitive.text.regular}
        />
      </div>
      <div>
        <Heading as="h3">Text (Bold)</Heading>
        <TypographyTable
          name="text/bold"
          tokens={meta.light.resolved.primitive.text.bold}
        />
      </div>
    </div>
  );
}
