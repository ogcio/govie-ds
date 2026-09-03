import { defineConfig } from 'eslint/config';
import mitosis from '@builder.io/eslint-plugin-mitosis';
import baseConfig, { restrictedSyntax } from '../../eslint.config.mjs';

// Attribute values and children become template expressions; event handlers become method bodies.
const templateExpression =
  ':matches(JSXAttribute:not([name.name=/^on[A-Z]/]), JSXElement, JSXFragment) > JSXExpressionContainer';

export default defineConfig([
  ...baseConfig,
  {
    basePath: import.meta.dirname,
    files: ['atoms/**/*.lite.tsx'],
    plugins: { mitosis },
    rules: {
      'mitosis/no-conditional-logic-in-component-render': 'error',
      'mitosis/no-state-destructuring': 'error',
      'mitosis/no-var-declaration-or-assignment-in-component': 'error',
      'mitosis/use-state-var-declarator': 'error',
      // Constraints of the generator rather than of JavaScript: each one compiles for React and
      // breaks another target.
      'no-restricted-syntax': [
        'error',
        ...restrictedSyntax,
        {
          selector: `${templateExpression} ArrowFunctionExpression`,
          message:
            'This expression is copied into the Angular template as-is, and its parser has no `=>` syntax — the component fails to mount. Move the logic into a top-level function and call it here.',
        },
        {
          selector: `${templateExpression} TemplateLiteral`,
          message:
            'This expression is copied into the Angular template as-is, and its parser has no backtick syntax — the component fails to mount. Build the string in a top-level function and call it here.',
        },
        {
          selector: `${templateExpression} MemberExpression[object.name=/^[A-Z][a-z]/]`,
          message:
            'Angular evaluates this against the component instance, and Mitosis never binds PascalCase imports or globals onto it — the value is silently `undefined`. Do the lookup inside a top-level lowercase helper.',
        },
        {
          selector: 'JSXSpreadAttribute',
          message:
            'The Angular output declares one `@Input` per prop, so a spread cannot be expanded. Pass each prop explicitly.',
        },
        {
          selector: 'ExportDefaultDeclaration > FunctionDeclaration > ObjectPattern',
          message:
            'Mitosis recognises props only as `props.<name>` accesses; a destructured name loses the link to its prop. Keep the single `props` parameter.',
        },
        {
          selector: "JSXOpeningElement[name.name=/^[A-Z]/] > JSXAttribute[name.name='class']",
          message:
            '`class` on a component styles its host tag, which is `display: contents` and paints nothing — the classes silently disappear. Use the `className` prop; it reaches the element inside.',
        },
        {
          selector: "JSXOpeningElement[name.name=/^[a-z]/] > JSXAttribute[name.name='className']",
          message:
            'Write `class` on native elements — the canonical Mitosis spelling. `className` is the prop name of Gi* components.',
        },
      ],
    },
  },
  {
    // The generator copies every non-component file under `atoms/` into each target verbatim.
    basePath: import.meta.dirname,
    files: ['atoms/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['react', 'react-dom', 'react/*', 'vue', '@vue/*', '@angular/*'],
              message:
                'Everything under `atoms/` is copied into every target package, so a framework import breaks the other targets.',
            },
          ],
        },
      ],
    },
  },
  {
    // `children` and event objects have no type that holds across React, Angular and Vue.
    basePath: import.meta.dirname,
    files: ['atoms/**/*.lite.tsx', 'atoms/**/types.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
