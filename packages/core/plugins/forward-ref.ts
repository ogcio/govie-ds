/**
 * Fixes Mitosis forwardRef type generation issue.
 *
 * Mitosis generates incorrect TypeScript types for forwardRef when using
 * the prop-based ref pattern documented at:
 * https://mitosis.builder.io/docs/hooks/#forwardref-for-react
 *
 *
 * Generated:   forwardRef<ComponentProps['ref']>
 * Fixed:       forwardRef<any, ComponentProps>
 */

const fixForwardRef = () => {
  return {
    code: {
      post: (code: string) => {
        if (!code.includes("['ref']")) {
          return code;
        }
        code = code.replace(
          /forwardRef<(\w+)\['ref'\]>/g,
          'forwardRef<any, $1>',
        );

        return code;
      },
    },
  };
};

export default fixForwardRef;
