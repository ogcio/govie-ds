/**
 * Fixes Mitosis forwardRef type generation issue.
 *
 * Mitosis generates incorrect TypeScript types for forwardRef when using
 * the prop-based ref pattern documented at:
 * https://mitosis.builder.io/docs/hooks/#forwardref-for-react
 *
 *
 * Generated:   forwardRef<ComponentProps['ref']>
 * Fixed:       forwardRef<ComponentProps['ref'], ComponentProps>
 */

const fixForwardRef = () => ({
  code: {
    post: (code: string) =>
      code.replace(
        /forwardRef<([^[]+)\[['"]([^'"]+)['"]]>/g,
        "forwardRef<$1['$2'], $1>",
      ),
  },
});

export default fixForwardRef;
