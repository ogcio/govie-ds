import { objectKeys } from 'ts-extras';

export type Token = {
  $type: string;
  $value: unknown;
};

export type CompositeToken = {
  $type: string;
  $value: Record<string, unknown>;
};

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
