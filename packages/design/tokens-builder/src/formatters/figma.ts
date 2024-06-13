import { minifyDictionary } from './minify-dictionary.js';
import { FormatFnArguments } from 'style-dictionary/types';
import { Tokens } from 'style-dictionary';
import { objectKeys } from 'ts-extras';
import flow from 'lodash/fp/flow.js';
import cloneDeepWith from 'lodash/cloneDeepWith.js';

type FigmaType = 'color' | 'number' | 'string' | 'boolean';

type TokenCollection = Record<string, unknown>; // TODO: type

// TODO: implement as style dictionary transform
function stripReferenceTiers(tokens: TokenCollection) {
  return cloneDeepWith(tokens, (value) => {
    if (typeof value === 'string' && value.startsWith('{')) {
      return value.replace(/{(primitive|semantic|component)\./g, '{');
    }

    return undefined;
  });
}

// TODO: investigate transforms changing $type
function toDimension(tokens: TokenCollection) {
  return cloneDeepWith(tokens, (value) => {
    if (value === 'fontWeight') {
      return 'dimension';
    }

    return undefined;
  });
}

function toString(tokens: TokenCollection) {
  return cloneDeepWith(tokens, (value) => {
    if (value === 'shadow' || value === 'fontFamily') {
      return 'string';
    }

    return undefined;
  });
}

function percentageToString(tokens: TokenCollection) {
  return cloneDeepWith(tokens, (value) => {
    if (value.$type === 'number') {
      const stringValue = value.$value.toString();

      if (stringValue.endsWith('%')) {
        return {
          $type: 'string',
          $value: value.$value,
        };
      }

      return value;
    }

    return undefined;
  });
}

// Convert composite JSON tokens to nested Figma groups
function toGroups(tokens: TokenCollection) {
  const types: Record<string, FigmaType> = {
    fontFamily: 'string',
    fontSize: 'number',
    fontWeight: 'number',
    lineHeight: 'string',
    offsetX: 'string',
    offsetY: 'string',
    blur: 'string',
    spread: 'string',
    color: 'string',
  };

  return cloneDeepWith(tokens, (value) => {
    if (typeof value.$value === 'object') {
      return objectKeys(value.$value).reduce((acc, key) => {
        if (!types[key]) {
          throw new Error(`No type defined composite value key '${key}'.`);
        }

        acc[key] = {
          $type: types[key],
          $value: value.$value[key],
        };

        return acc;
      }, {} as Tokens);
    }

    return undefined;
  });
}

export async function figmaFormatter({
  dictionary,
  platform,
  options,
  file,
}: FormatFnArguments) {
  const tokens = minifyDictionary({
    tokens: dictionary.tokens,
    outputReferences: options.outputReferences,
  });

  const cleanedTokens = flow([
    percentageToString,
    stripReferenceTiers,
    toDimension,
    toString,
    toGroups,
  ])(tokens);

  const lines = [JSON.stringify(cleanedTokens, null, 2), ''];

  return lines.join('\n');
}
