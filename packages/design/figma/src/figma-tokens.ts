import { meta as govieMeta } from '@ogcio/theme-govie';
import { meta as hseMeta } from '@ogcio/theme-hse';
import { buildTokens } from '@ogcio/design-system-tokens-builder';
import { readJson, writeJson } from '../src/json.js';
import { createManifest } from '../src/manifest.js';

export async function buildFigmaTokens({
  outputFolder,
}: {
  outputFolder: string;
}) {
  await buildTokens({
    tokens: govieMeta.light.unresolved,
    platforms: {
      figma: {
        outputFolder,
        outputFilename: 'default.json',
      },
    },
  });

  const govieTokensLight = await readJson<any>(`${outputFolder}/default.json`);

  await writeJson({
    outputFolder,
    filename: 'default-primitive.json',
    data: govieTokensLight.primitive,
  });

  await writeJson({
    outputFolder,
    filename: 'default-hybrid.json',
    data: {
      ...govieTokensLight.semantic,
      ...govieTokensLight.component,
    },
  });

  await buildTokens({
    tokens: hseMeta.light.unresolved,
    platforms: {
      figma: {
        outputFolder,
        outputFilename: 'alternative.json',
      },
    },
  });

  const hseTokensLight = await readJson<any>(
    `${outputFolder}/alternative.json`,
  );

  await writeJson({
    outputFolder,
    filename: 'alternative-primitive.json',
    data: hseTokensLight.primitive,
  });

  await writeJson({
    outputFolder,
    filename: 'alternative-hybrid.json',
    data: {
      ...hseTokensLight.semantic,
      ...hseTokensLight.component,
    },
  });

  await createManifest({
    outputFolder,
    manifest: {
      name: 'web',
      collections: {
        primitive: {
          modes: {
            Default: ['default-primitive.json'],
            // Alternative: ["alternative-primitive.json"],
          },
        },
        semantic: {
          modes: {
            Default: ['default-hybrid.json'],
            Alternative: ['alternative-hybrid.json'],
          },
        },
      },
    },
  });
}
