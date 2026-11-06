import type { MitosisPlugin } from '@builder.io/mitosis';

/**
 * Binds `style` with Angular's native `[style]` instead of `[ngStyle]`.
 *
 * `ngStyle` only accepts objects, so a consumer's `style="margin-top: 4px"` throws `NG0901`.
 * `[style]` accepts strings and objects, so the `styles` prop is widened to match.
 */
const styleBinding: MitosisPlugin = () => ({
  code: {
    post: (code, json) => {
      const result = code
        .replaceAll('[ngStyle]=', '[style]=')
        // Angular-only widening: the shared core keeps an object type because Mitosis JSX and React reject style strings.
        .replaceAll(
          /(\bstyles\??: )Record<string, string>/g,
          '$1string | Record<string, string | number | null | undefined>',
        );

      // The replacements match Mitosis output verbatim: fail the build rather than silently ship `ngStyle` again if a Mitosis upgrade changes it.
      if (/\bngStyle\b|\bstyles\??: Record</.test(result)) {
        throw new Error(`style-binding: unhandled \`ngStyle\` binding or \`styles\` type in ${json.name}`);
      }

      return result;
    },
  },
});

export default styleBinding;
