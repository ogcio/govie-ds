import { meta as govieMeta } from "@ogcio-ds/theme-govie";
import { meta as hseMeta } from "@ogcio-ds/theme-hse";
import { buildFigmaTokens } from "../src/figma-tokens.js";
import { buildFigmaTokensFlat } from "../src/figma-tokens-flat.js";

async function main() {
  // Build Figma tokens - primitive collection, and hybrid semantic/component collection
  await buildFigmaTokens({ outputFolder: "dist/tokens" });

  // Build Figma tokens flat - single collection with 4 modes (2 brands light/dark mode)
  await buildFigmaTokensFlat({
    outputFolder: "dist/tokens-flat",
    collections: {
      OGCIO: {
        modes: {
          Default: {
            tokens: govieMeta.light.unresolved,
            outputFilename: "govie-light.json",
          },
          "Default Dark": {
            tokens: govieMeta.dark.unresolved,
            outputFilename: "govie-dark.json",
          },
          Alternative: {
            tokens: hseMeta.light.unresolved,
            outputFilename: "hse-light.json",
          },
          "Alternative Dark": {
            tokens: hseMeta.dark.unresolved,
            outputFilename: "hse-dark.json",
          },
        },
      },
    },
  });
}

main();
