import { MitosisPlugin } from '@builder.io/mitosis';

/**
 * Removes matching prop lines from generated Props type definition.
 * Matches lines like `onClick?: (event: any) => void;` or `click: (event: any) => void;`
 */
function stripPropsFromType(code: string, propNames: string[]): string {
  for (const prop of propNames) {
    code = code.replace(new RegExp(`^\\s*${prop}\\??\\s*:.*?;\\s*$`, 'gm'), '');
  }
  return code;
}

/**
 * Removes React-style callback props (`onClick`, `onFocus`, `onBlur`, `onKeyDown`, `onKeyUp`)
 * from the generated Angular output's Props type.
 *
 * These props exist in the shared Mitosis source for the React target (via `useTarget`)
 * and are not used by Angular components.
 */
export const cleanPropsAngular: MitosisPlugin = () => ({
  code: {
    post: (code: string) => stripPropsFromType(code, ['onClick', 'onFocus', 'onBlur', 'onKeyDown', 'onKeyUp']),
  },
});

/**
 * Removes Angular-style event props (`click`, `focus`, `blur`, `keyDown`, `keyUp`)
 * from the generated React output's Props type.
 *
 * These props exist in the shared Mitosis source for the Angular target (via `useTarget`)
 * and are not used by React components.
 */
export const cleanPropsReact: MitosisPlugin = () => ({
  code: {
    post: (code: string) => stripPropsFromType(code, ['click', 'focus', 'blur', 'keyDown', 'keyUp']),
  },
});
