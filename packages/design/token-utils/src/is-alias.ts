import { isObject } from './types.js';

export function isAlias(value: unknown) {
  const regex = /{([^}]+)}/g;

  if (typeof value === 'string') {
    return regex.test(value);
  }

  if (isObject(value)) {
    let hasAlias = false;

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        let alias = isAlias(element);

        if (alias) {
          hasAlias = true;
          break;
        }
      }
    }

    return hasAlias;
  }

  return false;
}
