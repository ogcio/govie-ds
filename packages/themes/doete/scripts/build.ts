import { buildTheme } from '@ogcio/theme-builder';

async function main() {
  await buildTheme({
    themeId: 'doete',
    sourceFolder: 'packages/design/tokens',
    outputFolderCss: 'dist',
    outputFolderTypeScript: 'src/dist',
  });
}

main();
