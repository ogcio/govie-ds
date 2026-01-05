import { objectKeys } from 'ts-extras';

type ColorToken = {
  $type: 'color';
  $value: string;
};

type ColorShades = Record<string, ColorToken>;
type ColorOutput = Record<string, Record<string, string>>;

export function convertColors(
  colors: Record<string, ColorShades>,
): ColorOutput {
  const convertedColorObject: ColorOutput = {};

  for (const colorKey of objectKeys(colors)) {
    const colorShades = colors[colorKey];
    const convertedShades: Record<string, string> = {};

    for (const shadeKey of objectKeys(colorShades)) {
      const shadeValue = colorShades[shadeKey].$value;
      convertedShades[shadeKey] = shadeValue;
    }

    convertedColorObject[colorKey] = convertedShades;
  }

  return convertedColorObject;
}

export function toFont({
  valueResolver,
  fontSize,
  lineHeight,
}: {
  valueResolver: (props: { property: string; index: string }) => string;
  fontSize: string;
  lineHeight: string;
}): [string, { lineHeight: string }] {
  return [
    valueResolver({ property: 'size', index: fontSize }),
    {
      lineHeight: valueResolver({ property: 'lineHeight', index: lineHeight }),
    },
  ];
}
