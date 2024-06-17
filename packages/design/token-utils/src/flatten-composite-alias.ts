import { objectKeys } from 'ts-extras';
import { CompositeToken, Token } from './types.js';
import { aliasJoin } from './alias-join.js';

export function flattenCompositeAlias({
  alias,
  aliasedValue,
  resolveType,
}: {
  alias: string;
  aliasedValue: CompositeToken;
  resolveType: (key: string) => string | undefined;
}): Record<string, Token> {
  return objectKeys(aliasedValue.$value).reduce(
    (acc, key) => {
      const type = resolveType(key);

      if (type == null) {
        throw new Error(`No type defined composite value key '${key}'.`);
      }

      acc[key] = {
        $type: type,
        $value: aliasJoin(alias, key),
      };

      return acc;
    },
    {} as Record<string, Token>,
  );
}
