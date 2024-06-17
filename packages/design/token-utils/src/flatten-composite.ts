import { objectKeys } from 'ts-extras';
import { CompositeToken, Token } from './types.js';

export function flattenComposite({
  value,
  resolveType,
}: {
  value: CompositeToken;
  resolveType: (key: string) => string | undefined;
}): Record<string, Token> {
  return objectKeys(value.$value).reduce(
    (acc, key) => {
      const type = resolveType(key);

      if (type == null) {
        throw new Error(`No type defined composite value key '${key}'.`);
      }

      acc[key] = {
        $type: type,
        $value: value.$value[key],
      };

      return acc;
    },
    {} as Record<string, Token>,
  );
}
