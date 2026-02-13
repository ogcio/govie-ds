import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');
const SVG_DIR = join(ROOT_DIR, 'svgs');
const SRC_DIR = join(ROOT_DIR, 'src');

// Convert file name to PascalCase component name
function toPascalCase(str: string): string {
  return str
    .replace(/\.svg$/, '')
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

// Convert file name to camelCase
function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

// Get all SVG files from a directory (recursive)
function getSvgFiles(dir: string, prefix = ''): { name: string; path: string; content: string }[] {
  const files: { name: string; path: string; content: string }[] = [];

  if (!existsSync(dir)) {
    return files;
  }

  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively get files from subdirectories with prefix
      const subFiles = getSvgFiles(fullPath, entry);
      files.push(...subFiles);
    } else if (entry.endsWith('.svg')) {
      const name = prefix ? `${prefix}-${entry.replace('.svg', '')}` : entry.replace('.svg', '');
      files.push({
        name,
        path: fullPath,
        content: readFileSync(fullPath, 'utf-8'),
      });
    }
  }

  return files;
}

// Extract SVG attributes and content
function parseSvg(content: string): {
  viewBox: string;
  width: string;
  height: string;
  fill: string;
  innerContent: string;
} {
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
  const widthMatch = content.match(/width="([^"]+)"/);
  const heightMatch = content.match(/height="([^"]+)"/);
  const fillMatch = content.match(/<svg[^>]*fill="([^"]+)"/);

  // Extract inner content (between <svg> and </svg>)
  const innerMatch = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  const innerContent = innerMatch ? innerMatch[1].trim() : '';

  return {
    viewBox: viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24',
    width: widthMatch ? widthMatch[1] : '24',
    height: heightMatch ? heightMatch[1] : '24',
    fill: fillMatch ? fillMatch[1] : 'none',
    innerContent,
  };
}

// Generate React component for an SVG
function generateReactComponent(
  name: string,
  content: string,
): string {
  const componentName = toPascalCase(name);
  const { viewBox, innerContent, fill } = parseSvg(content);

  // Clean up inner content - fix JSX attributes
  const jsxContent = innerContent
    .replace(/clip-path=/g, 'clipPath=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/stroke-opacity=/g, 'strokeOpacity=')
    .replace(/stop-color=/g, 'stopColor=')
    .replace(/stop-opacity=/g, 'stopOpacity=')
    .replace(/xlink:href=/g, 'xlinkHref=')
    .replace(/xml:space=/g, 'xmlSpace=')
    .replace(/xmlns:xlink=/g, 'xmlnsXlink=');

  // Determine default fill based on SVG content
  const defaultFill = fill === 'none' ? 'currentColor' : fill;

  return `import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ${componentName}Props extends SVGProps<SVGSVGElement> {
  size?: string | number;
  title?: string;
}

export const ${componentName} = forwardRef<SVGSVGElement, ${componentName}Props>(
  ({ size = 24, title, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="${viewBox}"
      fill="${defaultFill}"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      ${jsxContent}
    </svg>
  ),
);

${componentName}.displayName = '${componentName}';
export default ${componentName};
`;
}

// Generate index file for React components
function generateReactIndex(category: string, files: { name: string }[]): string {
  const exports = files
    .map((file) => {
      const componentName = toPascalCase(file.name);
      return `export { ${componentName}, type ${componentName}Props } from './${componentName}.js';`;
    })
    .join('\n');

  return exports;
}

// Generate names.ts file
function generateNamesFile(category: string, files: { name: string }[]): string {
  const names = files.map((file) => file.name);
  const constName = `${category.toUpperCase()}_NAMES`;
  const typeName = `${category.charAt(0).toUpperCase() + category.slice(1, -1)}Name`;

  return `export const ${constName} = [
${names.map((n) => `  '${n}',`).join('\n')}
] as const;

export type ${typeName} = (typeof ${constName})[number];
`;
}

// Generate HTML string exports
function generateHtmlExports(category: string, files: { name: string; content: string }[]): string {
  const constName = `${category.toUpperCase()}_MAP`;
  const namesConstName = `${category.toUpperCase()}_NAMES`;
  const typeName = `${category.charAt(0).toUpperCase() + category.slice(1, -1)}Name`;
  const getFnName = `get${category.charAt(0).toUpperCase() + category.slice(1, -1)}Svg`;

  const mapEntries = files
    .map((file) => {
      // Escape backticks and ${} in SVG content
      const escapedContent = file.content
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$\{/g, '\\${')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return `  '${file.name}': \`${escapedContent}\`,`;
    })
    .join('\n');

  return `import { ${namesConstName}, type ${typeName} } from './names.js';
import type { GetSvgOptions } from '../types.js';

export { ${namesConstName}, type ${typeName} };

const ${constName}: Record<${typeName}, string> = {
${mapEntries}
};

export function ${getFnName}(name: ${typeName}, options?: GetSvgOptions): string {
  const svg = ${constName}[name];
  if (!svg) return '';

  const { size = 24, className, fill, ariaLabel, ariaHidden } = options || {};

  let result = svg
    .replace(/width="[^"]*"/, \`width="\${size}"\`)
    .replace(/height="[^"]*"/, \`height="\${size}"\`);

  if (className) {
    result = result.replace('<svg', \`<svg class="\${className}"\`);
  }

  if (fill) {
    // Replace fill in svg tag and paths
    result = result.replace(/fill="(?!none)[^"]*"/g, \`fill="\${fill}"\`);
  }

  if (ariaLabel) {
    result = result.replace('<svg', \`<svg aria-label="\${ariaLabel}" role="img"\`);
  } else if (ariaHidden) {
    result = result.replace('<svg', '<svg aria-hidden="true"');
  }

  return result;
}

export { ${constName} };
`;
}

// Main generation function
function generate() {
  console.log('Generating SVG components and exports...');

  const categories = ['icons', 'logos', 'favicons'];

  for (const category of categories) {
    const svgDir = join(SVG_DIR, category);
    const files = getSvgFiles(svgDir);

    if (files.length === 0) {
      console.log(`No SVG files found in ${category}`);
      continue;
    }

    console.log(`Processing ${files.length} ${category}...`);

    // Create React components directory
    const reactDir = join(SRC_DIR, 'react', category);
    mkdirSync(reactDir, { recursive: true });

    // Generate React components
    for (const file of files) {
      const componentName = toPascalCase(file.name);
      const componentContent = generateReactComponent(file.name, file.content);
      const componentPath = join(reactDir, `${componentName}.tsx`);
      writeFileSync(componentPath, componentContent);
    }

    // Generate React index
    const reactIndexContent = generateReactIndex(category, files);
    writeFileSync(join(reactDir, 'index.ts'), reactIndexContent);

    // Create HTML exports directory
    const htmlDir = join(SRC_DIR, category);
    mkdirSync(htmlDir, { recursive: true });

    // Generate names file
    const namesContent = generateNamesFile(category, files);
    writeFileSync(join(htmlDir, 'names.ts'), namesContent);

    // Generate HTML exports
    const htmlExportsContent = generateHtmlExports(category, files);
    writeFileSync(join(htmlDir, 'index.ts'), htmlExportsContent);
  }

  // Generate main React index
  const reactMainIndex = `export * from './icons/index.js';
export * from './logos/index.js';
export * from './favicons/index.js';
`;
  writeFileSync(join(SRC_DIR, 'react', 'index.ts'), reactMainIndex);

  console.log('Generation complete!');
}

generate();
