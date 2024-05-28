import { buildTokens } from "@govie-ds/tokens-builder";
import { createManifest } from "./manifest.js";
import {
  FigmaManifestCollection,
  FigmaTokenCollections,
  FigmaTokenModes,
} from "./figma-types.js";

export async function buildFigmaModes({
  modes,
  outputFolder,
}: {
  modes: FigmaTokenModes;
  outputFolder: string;
}) {
  for await (const modeKey of Object.keys(modes)) {
    const mode = modes[modeKey];
    await buildTokens({
      tokens: mode.tokens,
      platforms: {
        dtcg: {
          outputFolder,
          outputFilename: mode.outputFilename,
        },
      },
    });
  }
}

export async function buildFigmaTokensFlat({
  outputFolder,
  collections,
}: {
  outputFolder: string;
  collections: FigmaTokenCollections;
}) {
  for await (const collectionKey of Object.keys(collections)) {
    const collection = collections[collectionKey];
    await buildFigmaModes({ modes: collection.modes, outputFolder });
  }

  await createManifest({
    outputFolder,
    manifest: {
      name: "web",
      collections: Object.keys(collections).reduce((acc, collectionKey) => {
        const collection = collections[collectionKey];
        acc[collectionKey] = {
          modes: Object.keys(collection.modes).reduce(
            (acc, modeKey) => {
              acc[modeKey] = [collection.modes[modeKey].outputFilename];
              return acc;
            },
            {} as { [key: string]: string[] }
          ),
        };
        return acc;
      }, {} as FigmaManifestCollection),
    },
  });
}
