// Adapted from https://github.com/amzn/style-dictionary/blob/main/lib/common/formatHelpers/minifyDictionary.js

import { OutputReferences } from "style-dictionary/types";

// TODO: type
export function minifyDictionary({
  tokens,
  outputReferences,
}: {
  tokens: Record<string, any>;
  outputReferences?: OutputReferences;
}) {
  if (outputReferences && typeof outputReferences !== "boolean") {
    throw new Error("outputReferences must be a boolean.");
  }

  if (typeof tokens !== "object" || Array.isArray(tokens)) {
    return tokens;
  }

  const result: Record<string, unknown> = {};

  if (tokens.hasOwnProperty("original")) {
    if (outputReferences) {
      return {
        $type: tokens.original.$type, // TODO: review standards for type placement
        $value: tokens.original.$value,
      };
    }

    return {
      $type: tokens.$type,
      $value: tokens.$value,
    };
  }

  for (let name in tokens) {
    if (tokens.hasOwnProperty(name)) {
      result[name] = minifyDictionary({
        tokens: tokens[name],
        outputReferences,
      });
    }
  }

  return result;
}
