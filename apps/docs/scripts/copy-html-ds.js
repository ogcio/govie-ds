import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

(function copyHtmlToTemplate() {
  const docsDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
  const destDir = path.join(docsDir, 'public/templates');

  fs.copyFileSync(
    require.resolve('@ogcio/design-system-html'),
    path.join(destDir, 'govie-frontend.umd.js'),
  );
  fs.copyFileSync(
    require.resolve('@ogcio/design-system-html/styles.css'),
    path.join(destDir, 'styles.css'),
  );
  fs.copyFileSync(
    require.resolve('@ogcio/theme-govie/theme.css'),
    path.join(destDir, 'theme.css'),
  );
})();
