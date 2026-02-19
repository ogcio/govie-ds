import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateComponent } from './generate-component.js';
import { generateIndex, generateRegistryMapping } from './generate-index.js';
import { getSvgFiles, toPascalCase } from './utilities.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to SVG source assets (via devDependency)
const SVG_ASSETS_DIR = path.join(
  __dirname,
  '../../../../design/svgs/assets/icons',
);

// Output directory for generated components
const OUTPUT_DIR = path.join(__dirname, '../../src/icon/generated');

function generate() {
  console.log('Generating icon components from SVG assets...');
  console.log(`  Source: ${SVG_ASSETS_DIR}`);
  console.log(`  Output: ${OUTPUT_DIR}`);

  // Get all SVG files
  const files = getSvgFiles(SVG_ASSETS_DIR);

  if (files.length === 0) {
    throw new Error(`No SVG files found in ${SVG_ASSETS_DIR}`);
  }

  console.log(`  Found ${files.length} SVG files`);

  // Clean and recreate output directory
  if (existsSync(OUTPUT_DIR)) {
    rmSync(OUTPUT_DIR, { recursive: true });
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Generate individual components
  for (const file of files) {
    // Use PascalCase for filenames (matches component name, avoids reserved keyword issues)
    const componentName = toPascalCase(file.name);
    const componentContent = generateComponent(file.name, file.content);
    const componentPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);
    writeFileSync(componentPath, componentContent);
  }

  // Generate index.ts with all exports
  const indexContent = generateIndex(files);
  writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);

  // Generate registry.ts for ICON_REGISTRY mapping
  const registryContent = generateRegistryMapping(files);
  writeFileSync(path.join(OUTPUT_DIR, 'registry.ts'), registryContent);

  console.log(`  Generated ${files.length} components`);
  console.log('Generation complete!');
}

generate();
