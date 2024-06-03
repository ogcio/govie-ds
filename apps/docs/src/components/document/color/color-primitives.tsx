import { meta as govieMeta } from '@govie-ds/theme-govie';
import { objectKeys } from 'ts-extras';
import { SwatchSets } from './swatch-sets';
import camelcase from 'camelcase';

type Token = {
  $type: string;
  $value: string;
};

function dtcgToSet(
  set: Record<string, Token>,
): { name: number; value: string }[] {
  return Object.entries(set).map(([name, value]) => ({
    name: Number(name),
    value: value.$value,
  }));
}

export function ColorPrimitives({}) {
  const sets = objectKeys(govieMeta.light.resolved.primitive.color).map(
    (key) => ({
      name: camelcase(key, { pascalCase: true }),
      set: dtcgToSet(govieMeta.light.resolved.primitive.color[key]),
    }),
  );

  return <SwatchSets sets={sets} />;
}
