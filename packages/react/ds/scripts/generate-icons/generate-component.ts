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

  // Determine default fill - use currentColor for inheritance
  const defaultFill = fill === 'none' ? 'currentColor' : 'currentColor';

  return `import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export interface ${componentName}Props extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const ${componentName} = forwardRef<SVGSVGElement, ${componentName}Props>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="${viewBox}"
      fill="${defaultFill}"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      ${jsxContent}
    </svg>
  ),
);

${componentName}.displayName = '${componentName}';
export default ${componentName};
`;
}
