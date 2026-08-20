# Government of Ireland Design System – Vue

The Government of Ireland Design System Vue component library.

## Styles

The stylesheet resolves its values against a theme, and the web fonts ship separately so an
application already serving Lato can leave them out:

```ts
import '@ogcio/design-system-vue/styles.css';
import '@ogcio/theme-govie/theme.css';
import '@ogcio/design-system-vue/fonts.css';
```

## Scripts

| Script                 | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `pnpm build`           | Build the library and stylesheet into `dist`.  |
| `pnpm build:styles`    | Recompile only the stylesheet step of `build`. |
| `pnpm typecheck`       | Type-check the sources.                        |
| `pnpm storybook:dev`   | Run Storybook on port 6006.                    |
| `pnpm storybook:build` | Build Storybook into `storybook-static`.       |
| `pnpm lint`            | Lint the package.                              |
