import {
  parseSvg,
  convertToJsxAttributes,
  normalizeColors,
} from './parse-svg.js';
import { toPascalCase } from './utilities.js';

/**
 * Generate a React component for an SVG icon
 */
export function generateComponent(name: string, content: string): string {
  const componentName = toPascalCase(name);
  const { viewBox, innerContent, fill } = parseSvg(content);

  // Process inner content for JSX compatibility
  let jsxContent = convertToJsxAttributes(innerContent);

  // Normalize colors to currentColor for reusability
  jsxContent = normalizeColors(jsxContent);

  const defaultFill = 'currentColor';

  return `import type { SVGProps } from 'react';

export interface ${componentName}Props extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ${componentName}({ size = 24, ...props }: ${componentName}Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="${viewBox}"
      fill="${defaultFill}"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      ${jsxContent}
    </svg>
  );
}

export default ${componentName};
`;
}
