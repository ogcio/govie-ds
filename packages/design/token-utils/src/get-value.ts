import get from 'lodash/get.js';

export function getValue<T>(
  object: Record<string, unknown>,
  path: string,
  defaultValue?: T,
): T {
  return get(object, path, defaultValue) as T;
}
