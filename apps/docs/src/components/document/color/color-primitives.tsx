import { meta as govieMeta } from '@govie-ds/theme-govie';
import camelcase from 'camelcase';
import { objectKeys } from 'ts-extras';
import { SwatchSets } from './swatch-sets';

type Token = {
  $type: string;
  $value: string;
};

function dtcgToSet(
  set: Record<string, Token>,
): { name: number | string; value: string }[] {
  return Object.entries(set).map(([name, value]) => ({
    name: typeof name === 'string' ? name : Number(name),
    value: value.$value,
  }));
}

export function ColorPrimitives() {
  const sets = objectKeys(govieMeta.light.resolved.primitive.color).map(
    (key) => ({
      name: camelcase(key, { pascalCase: true }),
      set: dtcgToSet(govieMeta.light.resolved.primitive.color[key]),
    }),
  );

  return <SwatchSets sets={sets} />;
}
