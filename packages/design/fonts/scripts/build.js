/**
 * Build Script for @ogcio/design-system-fonts
 *
 * PURPOSE:
 * This script creates a distributable fonts package that bundles the Lato font family
 * with @font-face declarations. It enables framework-agnostic font loading by providing
 * a standalone fonts.css file that can be imported in any web project.
 *
 * WHY THIS SCRIPT IS NEEDED:
 * - The @fontsource/lato package provides fonts as separate CSS modules designed for
 *   bundler-based imports (e.g., `import '@fontsource/lato'`). This works well with
 *   modern bundlers but doesn't provide a single standalone CSS file.
 *
 * - For framework-agnostic usage (plain HTML, Angular, non-Next React), consumers need
 *   a single CSS file with @font-face declarations and the font files in a predictable
 *   location relative to that CSS.
 *
 * - This script bridges that gap by:
 *   1. Copying our custom fonts.css (which contains all @font-face declarations) to dist/
 *   2. Copying the actual font files from @fontsource/lato to dist/files/
 *
 * WHAT IT PRODUCES:
 * dist/
 * ├── fonts.css          # @font-face declarations referencing ./files/*
 * └── files/             # Lato font files (woff2 and woff formats)
 *     ├── lato-latin-100-normal.woff2
 *     ├── lato-latin-100-normal.woff
 *     ├── lato-latin-100-italic.woff2
 *     ├── ... (all weights: 100, 300, 400, 700, 900)
 *     └── ... (all styles: normal, italic)
 *
 * USAGE:
 * After build, consumers can import the fonts via:
 *   - npm/bundler: import '@ogcio/design-system-fonts/fonts/fonts.css'
 *   - HTML: <link rel="stylesheet" href="path/to/fonts.css">
 */

import { copyFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");
const distFilesDir = join(distDir, "files");
const srcDir = join(rootDir, "src");
const fontsourceDir = join(
  rootDir,
  "node_modules",
  "@fontsource",
  "lato",
  "files",
);

// Clean dist directory to ensure fresh build
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true });
}

// Create dist directories
mkdirSync(distDir, { recursive: true });
mkdirSync(distFilesDir, { recursive: true });

// Copy fonts.css to dist
copyFileSync(join(srcDir, "fonts.css"), join(distDir, "fonts.css"));
console.log("✓ Copied fonts.css");

// Copy font files from @fontsource/lato
// We only copy the specific combinations we need to minimize bundle size:
// - Subsets: latin, latin-ext (covers most European languages)
// - Weights: 100, 300, 400, 700, 900 (matches design system requirements)
// - Styles: normal, italic
// - Formats: woff2 (modern browsers), woff (legacy fallback)
const weights = ["100", "300", "400", "700", "900"];
const styles = ["normal", "italic"];
const subsets = ["latin", "latin-ext"];
const formats = ["woff2", "woff"];

let copiedCount = 0;
for (const subset of subsets) {
  for (const weight of weights) {
    for (const style of styles) {
      for (const format of formats) {
        const filename = `lato-${subset}-${weight}-${style}.${format}`;
        const srcPath = join(fontsourceDir, filename);
        const destPath = join(distFilesDir, filename);

        if (existsSync(srcPath)) {
          copyFileSync(srcPath, destPath);
          copiedCount++;
        } else {
          console.warn(`⚠ Font file not found: ${filename}`);
        }
      }
    }
  }
}

console.log(`✓ Copied ${copiedCount} font files`);
console.log("✓ Build complete");
