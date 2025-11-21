import { buildTheme } from '@ogcio/theme-builder';

async function main() {
  await buildTheme({
    themeId: 'hse',
    sourceFolder: 'packages/design/tokens',
    outputFolderCss: 'dist',
    outputFolderTypeScript: 'src/dist',
  });
}

main();
