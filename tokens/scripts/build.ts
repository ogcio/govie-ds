import { buildTokens } from "@ogcio-ds/tokens-builder";

async function main() {
  const prefix = "govie";

  await buildTokens({
    source: ["tokens/light/**/*.json"],
    platforms: {
      typeScript: {
        export: "metaLight",
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
        export: "metaLightUnresolved",
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
        export: "metaDark",
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
        export: "metaDarkUnresolved",
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
      cssVariableNames: {
        prefix,
        camelCase: true,
        outputFolder: "./src/dist",
        outputFilename: "variables.ts",
      },
    },
  });
}

main();
