import { isAlias } from './is-alias.js';
import { isPath } from './is-path.js';
import { aliasToPath, pathToAlias } from './alias-to-path.js';

export function aliasJoin(...parts: string[]): string {
  const paths = parts.map((part) => {
    if (isAlias(part)) {
      return aliasToPath(part);
    }

    if (isPath(part)) {
      return part;
    }

    throw new Error(`Invalid part '${part}'.`);
  });

  return pathToAlias(paths.join('.'));
}
