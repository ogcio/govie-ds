export interface ParsedSvg {
  viewBox: string;
  width: string;
  height: string;
  fill: string;
  innerContent: string;
}

/**
 * Extract SVG attributes and inner content
 */
export function parseSvg(content: string): ParsedSvg {
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

/**
 * Convert SVG attributes to JSX-compatible format
 */
export function convertToJsxAttributes(content: string): string {
  return content
    .replaceAll('clip-path=', 'clipPath=')
    .replaceAll('fill-rule=', 'fillRule=')
    .replaceAll('clip-rule=', 'clipRule=')
    .replaceAll('stroke-width=', 'strokeWidth=')
    .replaceAll('stroke-linecap=', 'strokeLinecap=')
    .replaceAll('stroke-linejoin=', 'strokeLinejoin=')
    .replaceAll('stroke-miterlimit=', 'strokeMiterlimit=')
    .replaceAll('fill-opacity=', 'fillOpacity=')
    .replaceAll('stroke-opacity=', 'strokeOpacity=')
    .replaceAll('stop-color=', 'stopColor=')
    .replaceAll('stop-opacity=', 'stopOpacity=')
    .replaceAll('xlink:href=', 'xlinkHref=')
    .replaceAll('xml:space=', 'xmlSpace=')
    .replaceAll('xmlns:xlink=', 'xmlnsXlink=');
}

/**
 * Replace hardcoded colors with currentColor for fill and stroke
 */
export function normalizeColors(content: string): string {
  return content
    // Replace hardcoded fill colors with currentColor
    .replaceAll(/fill="#[0-9a-fA-F]{3,6}"/g, 'fill="currentColor"')
    // Replace hardcoded stroke colors with currentColor
    .replaceAll(/stroke="#[0-9a-fA-F]{3,6}"/g, 'stroke="currentColor"');
}
