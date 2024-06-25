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
  key,
}: {
  useVariables: boolean;
  variables: any;
  meta: any;
  key: string;
}): [string, { lineHeight: string }] {
  return [
    useVariables
      ? variables.primitive.font.size[key]
      : meta.light.resolved.primitive.font.size[key].$value,
    {
      lineHeight: useVariables
        ? variables.primitive.font.lineHeight[key]
        : meta.light.resolved.primitive.font.lineHeight[key].$value.toString(),
    },
  ];
}
