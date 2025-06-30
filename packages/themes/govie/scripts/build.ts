import { buildTheme } from '@ogcio/theme-builder';

async function main() {
  await buildTheme({
    themeId: 'govie',
    sourceFolder: 'tokens',
    outputFolderCss: 'dist',
    outputFolderTypeScript: 'src/dist',
  });
}

main();
