import { MitosisPlugin } from '@builder.io/mitosis';

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
        .replace(/clip-path=/g, 'clipPath=')
        .replace(/clip-rule=/g, 'clipRule=')
        .replace(/fill-rule=/g, 'fillRule=')
        .replace(/fill-opacity=/g, 'fillOpacity=')
        .replace(/stroke-width=/g, 'strokeWidth=')
        .replace(/stroke-linecap=/g, 'strokeLinecap=')
        .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
        .replace(/stroke-opacity=/g, 'strokeOpacity='),
  },
});

export default renameSvgAttrs;
