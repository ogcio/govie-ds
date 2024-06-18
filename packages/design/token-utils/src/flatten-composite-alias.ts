import { objectKeys } from 'ts-extras';
import { aliasJoin } from './alias-join.js';
import { CompositeToken, Token } from './types.js';

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
    (accumulator, key) => {
      const type = resolveType(key);

      if (type == null) {
        throw new Error(`No type defined composite value key '${key}'.`);
      }

      accumulator[key] = {
        $type: type,
        $value: aliasJoin(alias, key),
      };

      return accumulator;
    },
    {} as Record<string, Token>,
  );
}
