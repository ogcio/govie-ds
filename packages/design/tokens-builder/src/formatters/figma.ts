import cloneDeepWith from 'lodash.clonedeepwith';
import { minifyDictionary } from './minify-dictionary.js';
import { FormatFnArguments } from 'style-dictionary/types';
import { Tokens } from 'style-dictionary';
import { objectKeys } from 'ts-extras';

type FigmaType = 'color' | 'number' | 'string' | 'boolean';

type TokensTransformer = {
  tokens: Record<string, unknown>; // TODO: type
};

// TODO: implement as style dictionary transforms
function stripReferenceTiers({ tokens }: TokensTransformer) {
  return cloneDeepWith(tokens, (value) => {
    if (typeof value === 'string' && value.startsWith('{')) {
      return value.replace(/{(primitive|semantic|component)\./g, '{');
    }

    return undefined;
  });
}

// TODO: implement as style dictionary transforms
function toDimension({ tokens }: TokensTransformer) {
  return cloneDeepWith(tokens, (value) => {
    if (value === 'fontWeight') {
      return 'dimension';
    }

    return undefined;
  });
}

// Convert composite JSON tokens to nested Figma groups
function toGroups({ tokens }: TokensTransformer) {
  const types: Record<string, FigmaType> = {
    fontFamily: 'string',
    fontSize: 'number',
    fontWeight: 'number',
    lineHeight: 'number',
  };

  return cloneDeepWith(tokens, (value) => {
    if (value.$type === 'typography') {
      return objectKeys(value.$value).reduce((acc, key) => {
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

function percentageToString({ tokens }: TokensTransformer) {
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

// TODO: implement as style dictionary transforms
function toString({ tokens }: TokensTransformer) {
  return cloneDeepWith(tokens, (value) => {
    if (value === 'shadow' || value === 'fontFamily') {
      return 'string';
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

  const cleanedTokens = toGroups({
    tokens: toString({
      tokens: toDimension({
        tokens: stripReferenceTiers({ tokens: percentageToString({ tokens }) }),
      }),
    }),
  });

  const lines = [JSON.stringify(cleanedTokens, null, 2), ''];

  return lines.join('\n');
}
