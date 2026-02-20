import { toPascalCase } from './utilities.js';
import type { SvgFile } from './utilities.js';

/**
 * Generate index.ts file that exports all components
 */
export function generateIndex(files: SvgFile[]): string {
  // Sort by PascalCase component name for consistent ordering
  const sortedFiles = [...files].sort((a, b) => {
    const nameA = toPascalCase(a.name);
    const nameB = toPascalCase(b.name);
    return nameA.localeCompare(nameB);
  });

  const exports = sortedFiles
    .map((file) => {
      const componentName = toPascalCase(file.name);
      // PascalCase filename matches component name
      return `export { ${componentName}, type ${componentName}Props } from './${componentName}.js';`;
    })
    .join('\n');

  return `${exports}
`;
}

/**
 * Generate a mapping of icon IDs to component names for ICON_REGISTRY
 */
export function generateRegistryMapping(files: SvgFile[]): string {
  // Sort by PascalCase component name for consistent ordering
  const sortedFiles = [...files].sort((a, b) => {
    const nameA = toPascalCase(a.name);
    const nameB = toPascalCase(b.name);
    return nameA.localeCompare(nameB);
  });

  const imports = sortedFiles
    .map((file) => {
      const componentName = toPascalCase(file.name);
      // PascalCase filename matches component name
      return `import { ${componentName} } from './${componentName}.js';`;
    })
    .join('\n');

  const registryEntries = sortedFiles
    .map((file) => {
      const componentName = toPascalCase(file.name);
      // Use original snake_case name as the icon ID
      const iconId = file.name;
      return `  '${iconId}': ${componentName},`;
    })
    .join('\n');

  return `${imports}

export const GENERATED_ICONS = {
${registryEntries}
} as const;

export type GeneratedIconId = keyof typeof GENERATED_ICONS;
`;
}
