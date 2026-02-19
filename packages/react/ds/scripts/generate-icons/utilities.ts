import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

// JavaScript reserved keywords that can't be used as identifiers
const RESERVED_KEYWORDS = new Set([
  'break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete',
  'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if',
  'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch', 'this',
  'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield',
  'class', 'const', 'enum', 'let', 'static', 'implements', 'interface',
  'package', 'private', 'protected', 'public',
]);

/**
 * Convert file name to PascalCase React component name
 * Adds 'Icon' suffix for reserved JavaScript keywords
 */
export function toPascalCase(string_: string): string {
  const name = string_
    .replace(/\.svg$/, '')
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');

  // Add 'Icon' suffix if the name is a reserved keyword
  if (RESERVED_KEYWORDS.has(name.toLowerCase())) {
    return `${name}Icon`;
  }

  return name;
}

export interface SvgFile {
  name: string;
  path: string;
  content: string;
}

/**
 * Get all SVG files from a directory
 */
export function getSvgFiles(direcotory: string, prefix = ''): SvgFile[] {
  const files: SvgFile[] = [];

  if (!existsSync(direcotory)) {
    return files;
  }

  const entries = readdirSync(direcotory);

  for (const entry of entries) {
    const fullPath = path.join(direcotory, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      const subFiles = getSvgFiles(fullPath, entry);
      files.push(...subFiles);
    } else if (entry.endsWith('.svg')) {
      const name = prefix
        ? `${prefix}-${entry.replace('.svg', '')}`
        : entry.replace('.svg', '');
      files.push({
        name,
        path: fullPath,
        content: readFileSync(fullPath, 'utf8'),
      });
    }
  }

  return files;
}
