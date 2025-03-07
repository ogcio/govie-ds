import { buildTheme } from '@govie-ds/theme-builder';

async function main() {
  await buildTheme({
    themeId: 'doete',
    sourceFolder: 'tokens',
    outputFolderCss: 'dist',
    outputFolderTypeScript: 'src/dist',
  });
}

main();
