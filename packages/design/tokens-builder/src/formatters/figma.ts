import {
  isAlias,
  flattenComposite,
  flattenCompositeAlias,
  getValue,
  isCompositeToken,
  aliasToPath,
} from '@ogcio/design-system-token-utils';
import cloneDeepWith from 'lodash/cloneDeepWith.js';
import flow from 'lodash/fp/flow.js';
import { FormatFnArguments } from 'style-dictionary/types';
import { minifyDictionary } from './minify-dictionary.js';

type FigmaType = 'color' | 'number' | 'string' | 'boolean';

type TokenCollection = Record<string, unknown>; // TODO: type

// TODO: implement as style dictionary transform
function stripReferenceTiers(tokens: TokenCollection) {
  return cloneDeepWith(tokens, (value) => {
    if (typeof value === 'string' && value.startsWith('{')) {
      return value.replaceAll(/{(primitive|semantic|component)\./g, '{');
    }
  });
}

// TODO: investigate transforms changing $type
function toDimension(tokens: TokenCollection) {
  return cloneDeepWith(tokens, (value) => {
    if (value === 'fontWeight') {
      return 'dimension';
    }
  });
}

function toString(tokens: TokenCollection) {
  return cloneDeepWith(tokens, (value) => {
    if (
      value === 'shadow' ||
      value === 'fontFamily' ||
      value === 'typography'
    ) {
      return 'string';
    }
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
  });
}

function figmaTypeResolver(key: string): FigmaType | undefined {
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

  return types[key];
}

// Convert composite JSON tokens to nested Figma groups
function toGroups(tokens: TokenCollection) {
  return cloneDeepWith(tokens, (value) => {
    if (typeof value.$value === 'object') {
      return flattenComposite({
        value,
        resolveType: figmaTypeResolver,
      });
    }

    if (isAlias(value.$value)) {
      const aliasedValue = getValue({
        value: tokens,
        path: aliasToPath(value.$value),
      });

      if (isCompositeToken(aliasedValue)) {
        return flattenCompositeAlias({
          alias: value.$value,
          aliasedValue,
          resolveType: figmaTypeResolver,
        });
      }
    }
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
    toGroups,
    percentageToString,
    stripReferenceTiers,
    toDimension,
    toString,
  ])(tokens);

  const lines = [JSON.stringify(cleanedTokens, null, 2), ''];

  return lines.join('\n');
}
