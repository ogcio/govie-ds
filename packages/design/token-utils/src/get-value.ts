import get from 'lodash/get.js';

export function getValue<T>({
  value,
  path,
  defaultValue,
}: {
  value: Record<string, unknown>;
  path: string;
  defaultValue?: T;
}): T {
  return get(value, path, defaultValue) as T;
}
