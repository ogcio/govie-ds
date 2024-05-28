import { buildTheme } from "@ogcio-ds/theme-builder";

async function main() {
  await buildTheme({
    themeId: "hse",
    sourceFolder: "tokens",
    outputFolderCss: "dist",
    outputFolderTypeScript: "src/dist",
  });
}

main();
