import { buildTokens } from '@ogcio/design-system-tokens-builder';
import {
  FigmaManifestCollection,
  FigmaTokenCollections,
  FigmaTokenModes,
} from './figma-types.js';
import { createManifest } from './manifest.js';

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
      name: 'web',
      collections: Object.keys(collections).reduce(
        (accumulator, collectionKey) => {
          const collection = collections[collectionKey];
          accumulator[collectionKey] = {
            modes: Object.keys(collection.modes).reduce(
              (accumulator_, modeKey) => {
                accumulator_[modeKey] = [
                  collection.modes[modeKey].outputFilename,
                ];
                return accumulator_;
              },
              {} as { [key: string]: string[] },
            ),
          };
          return accumulator;
        },
        {} as FigmaManifestCollection,
      ),
    },
  });
}
