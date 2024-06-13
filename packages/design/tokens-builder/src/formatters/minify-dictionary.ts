import { Token } from 'style-dictionary';
import { OutputReferences } from 'style-dictionary/types';
import { usesReferences } from 'style-dictionary/utils';

// Adapted from https://github.com/amzn/style-dictionary/blob/main/lib/common/formatHelpers/minifyDictionary.js
export function minifyDictionary({
  tokens,
  outputReferences,
}: {
  tokens: Record<string, Token>;
  outputReferences?: OutputReferences;
}) {
  if (outputReferences && typeof outputReferences !== 'boolean') {
    throw new Error('outputReferences must be a boolean.');
  }

  if (typeof tokens !== 'object' || Array.isArray(tokens)) {
    return tokens;
  }

  const result: Record<string, unknown> = {};

  if (tokens.hasOwnProperty('original')) {
    if (outputReferences && usesReferences(tokens.original.$value)) {
      return {
        $type: tokens.original.$type,
        $value: tokens.original.$value,
      };
    }

    return {
      $type: tokens.$type,
      $value: tokens.$value,
    };
  }

  for (const name in tokens) {
    if (tokens.hasOwnProperty(name)) {
      result[name] = minifyDictionary({
        tokens: tokens[name],
        outputReferences,
      });
    }
  }

  return result;
}
