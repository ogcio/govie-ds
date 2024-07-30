import { objectKeys } from 'ts-extras';

// TODO: type
export function convertColors(colors: any) {
  const convertedColorObject: Record<string, Record<string, string>> = {};

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

// TODO: type
export function toFont({
  useVariables,
  variables,
  meta,
  fontSize,
  lineHeight,
}: {
  useVariables: boolean;
  variables: any;
  meta: any;
  fontSize: string;
  lineHeight: string;
}): [string, { lineHeight: string }] {
  return [
    useVariables
      ? variables.primitive.font.size[fontSize]
      : meta.light.resolved.primitive.font.size[fontSize].$value,
    {
      lineHeight: useVariables
        ? variables.primitive.font.lineHeight[lineHeight]
        : meta.light.resolved.primitive.font.lineHeight[
            lineHeight
          ].$value.toString(),
    },
  ];
}
