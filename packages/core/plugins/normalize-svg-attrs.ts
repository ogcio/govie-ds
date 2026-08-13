import type { MitosisPlugin } from '@builder.io/mitosis';

/**
 * Converts SVG kebab-case attributes to React camelCase equivalents.
 *
 * Mitosis preserves original SVG attribute names (e.g. clip-path, stroke-width,
 * fill-rule) in the generated React output. While valid in HTML, these kebab-case
 * attributes trigger console warnings in React/Next.js, which expects their
 * camelCase counterparts.
 *
 * This plugin runs a post-code transformation on the generated output,
 * replacing known SVG presentation attributes with their JSX equivalents.
 *
 * Generated:   <g clip-path="url(#clip0)" fill-rule="evenodd">
 * Fixed:       <g clipPath="url(#clip0)" fillRule="evenodd">
 */

const renameSvgAttrs: MitosisPlugin = () => ({
  code: {
    post: (code: string) =>
      code
        .replaceAll('clip-path=', 'clipPath=')
        .replaceAll('clip-rule=', 'clipRule=')
        .replaceAll('fill-rule=', 'fillRule=')
        .replaceAll('fill-opacity=', 'fillOpacity=')
        .replaceAll('stroke-width=', 'strokeWidth=')
        .replaceAll('stroke-linecap=', 'strokeLinecap=')
        .replaceAll('stroke-linejoin=', 'strokeLinejoin=')
        .replaceAll('stroke-opacity=', 'strokeOpacity='),
  },
});

export default renameSvgAttrs;
