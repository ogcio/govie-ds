import cloneDeepWith from 'lodash.clonedeepwith';
import { minifyDictionary } from './minify-dictionary.js';
import { FormatFnArguments } from 'style-dictionary/types';

// TODO: implement as style dictionary transforms
// TODO: type
function stripReferenceTiers({ tokens }: any) {
  return cloneDeepWith(tokens, (value) => {
    if (typeof value === 'string' && value.startsWith('{')) {
      return value.replace(/{(primitive|semantic|component)\./g, '{');
    }

    return undefined;
  });
}

// TODO: implement as style dictionary transforms
// TODO: type
function toDimension({ tokens }: any) {
  return cloneDeepWith(tokens, (value) => {
    if (value === 'fontWeight') {
      return 'dimension';
    }

    return undefined;
  });
}

// TODO: implement as style dictionary transforms
// TODO: type
function toString({ tokens }: any) {
  return cloneDeepWith(tokens, (value) => {
    if (
      value === 'shadow' ||
      value === 'typography' ||
      value === 'fontFamily'
    ) {
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

  const cleanedTokens = toString({
    tokens: toDimension({
      tokens: stripReferenceTiers({ tokens }),
    }),
  });

  const lines = [JSON.stringify(cleanedTokens, null, 2), ''];

  return lines.join('\n');
}
