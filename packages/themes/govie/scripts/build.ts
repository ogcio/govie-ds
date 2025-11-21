import { buildTheme } from '@ogcio/theme-builder';

async function main() {
  await buildTheme({
    themeId: 'govie',
    sourceFolder: 'packages/design/tokens',
    outputFolderCss: 'dist',
    outputFolderTypeScript: 'src/dist',
  });
}

main();
