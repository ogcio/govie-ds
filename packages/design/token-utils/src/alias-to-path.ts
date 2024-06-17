import { isAlias } from './is-alias.js';

export function pathToAlias(path: string) {
  return `{${path}}`;
}

export function aliasToPath(alias: string) {
  if (!isAlias(alias)) {
    throw new Error(`Invalid alias '${alias}'.`);
  }

  return alias.replace('{', '').replace('}', '');
}
