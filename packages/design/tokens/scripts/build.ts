import { buildTokens } from "@ogcio/design-system-tokens-builder";

async function main() {
  const prefix = "gieds";

  await buildTokens({
    source: ["tokens/light/**/*.json"],
    platforms: {
      typeScript: {
        exportName: "metaLight",
        outputFolder: "./src/dist",
        outputFilename: "meta-light.ts",
        outputReferences: false,
      },
    },
  });

  await buildTokens({
    source: ["tokens/light/**/*.json"],
    platforms: {
      typeScript: {
        exportName: "metaLightUnresolved",
        outputFolder: "./src/dist",
        outputFilename: "meta-light-unresolved.ts",
        outputReferences: true,
      },
      typeScriptConsts: {
        prefix,
        camelCase: true,
        outputFolder: "./src/dist",
        outputFilename: "tokens-light.ts",
      },
    },
  });

  await buildTokens({
    source: ["tokens/light/**/*.json", "tokens/dark/**/*.json"],
    platforms: {
      typeScript: {
        exportName: "metaDark",
        outputFolder: "./src/dist",
        outputFilename: "meta-dark.ts",
        outputReferences: false,
      },
    },
  });

  await buildTokens({
    source: ["tokens/light/**/*.json", "tokens/dark/**/*.json"],
    platforms: {
      typeScript: {
        exportName: "metaDarkUnresolved",
        outputFolder: "./src/dist",
        outputFilename: "meta-dark-unresolved.ts",
        outputReferences: true,
      },
      typeScriptConsts: {
        prefix,
        camelCase: true,
        outputFolder: "./src/dist",
        outputFilename: "tokens-dark.ts",
      },
    },
  });

  await buildTokens({
    source: ["tokens/light/**/*.json"],
    platforms: {
      cssVariableObject: {
        prefix,
        exportName: "variables",
        outputFolder: "./src/dist",
        outputFilename: "variables.ts",
      },
    },
  });
}

main();
