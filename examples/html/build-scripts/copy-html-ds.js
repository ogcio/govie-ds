import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

(function copyHtmlToTemplate() {
  const currentPath = fileURLToPath(import.meta.url);
  const currentDirectory = path.dirname(currentPath);

  const sourceJsPath = path.resolve(
    currentDirectory,
    "../../../packages/html/ds/dist/govie-frontend.umd.js"
  );
  const destinationJsPath = path.resolve(
    currentDirectory,
    "../static/js/govie-frontend.umd.js"
  );

  const sourceCssPath = path.resolve(
    currentDirectory,
    "../../../packages/html/ds/dist/styles.css"
  );
  const destinationCssPath = path.resolve(
    currentDirectory,
    "../static/css/styles.css"
  );

  const sourceThemePath = path.resolve(
    currentDirectory,
    "../../../packages/themes/govie/dist/theme.css"
  );
  const destinationThemePath = path.resolve(
    currentDirectory,
    "../static/css/theme.css"
  );

  fs.copyFileSync(sourceJsPath, destinationJsPath);
  fs.copyFileSync(sourceCssPath, destinationCssPath);
  fs.copyFileSync(sourceThemePath, destinationThemePath);
})();
