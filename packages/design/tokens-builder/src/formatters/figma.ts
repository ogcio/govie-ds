import cloneDeepWith from "lodash.clonedeepwith";
import { minifyDictionary } from "./minify-dictionary.js";
import { FormatFnArguments } from "style-dictionary/types";
import { toShadowString } from "../utils/shadow.js";

// TODO: type
function stripReferenceTiers({ tokens }: any) {
  return cloneDeepWith(tokens, (value) => {
    if (typeof value === "string" && value.startsWith("{")) {
      return value.replace(/{(primitive|semantic|component)\./g, "{");
    }

    return undefined;
  });
}

// TODO: type
function fontWeightToDimension({ tokens }: any) {
  return cloneDeepWith(tokens, (value) => {
    if (value === "fontWeight") {
      return "dimension";
    }

    return undefined;
  });
}

// TODO: type
function shadowToString({ tokens }: any) {
  return cloneDeepWith(tokens, (value) => {
    if (value?.$type === "shadow") {
      return {
        $type: "string",
        $value: toShadowString(value.$value),
      };
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

  const cleanedTokens = shadowToString({
    tokens: fontWeightToDimension({
      tokens: stripReferenceTiers({ tokens }),
    }),
  });

  const lines = [JSON.stringify(cleanedTokens, null, 2), ""];

  return lines.join("\n");
}
