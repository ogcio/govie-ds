import { TokenValueComposite } from '../common/token-value';

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

export function TypographyValueComposite({
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
}: {
  fontFamily?: string[];
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: number;
}) {
  return (
    <TokenValueComposite
      tokens={[
        ...(fontFamily
          ? [
              {
                name: 'Font family',
                value: fontFamily.join(', '),
              },
            ]
          : []),
        ...(fontSize
          ? [
              {
                name: 'Font size',
                value: fontSize as string,
                converted: `e.g. ${remToPx(fontSize)}px`,
              },
            ]
          : []),
        ...(fontWeight
          ? [
              {
                name: 'Font weight',
                value: fontWeight.toString(),
              },
            ]
          : []),
        ...(lineHeight && fontSize
          ? [
              {
                name: 'Line height',
                value: lineHeight.toString(),
                converted: `e.g. ${lineHeightToPx({ fontSize, lineHeight })}`,
              },
            ]
          : []),
      ]}
    />
  );
}
