# Government of Ireland Design System – Angular

Build government websites and digital services with Angular using the [Government of Ireland Design System](https://ds.services.gov.ie/). This library brings together reusable UI components and shared styles to help teams create consistent interfaces across public services. Use it to give your application a familiar look and feel, with less time spent building common interface elements from scratch.

> **Beta:** The Angular library currently includes a subset of the design system components. More components are being added.

## Installation

Requires Angular 19, 20 or 21.

```bash
npm install @ogcio/design-system-angular @ogcio/theme-govie
```

The package lists `@angular/common`, `@angular/core` and `lodash` as peer dependencies.

### Styles

The stylesheet uses values from the theme. Add the theme, component styles and fonts to your application’s build `styles` array in `angular.json` (`projects.<app-name>.architect.build.options.styles`). Keep any existing application styles after these entries:

```json
{
  "styles": [
    "@ogcio/theme-govie/theme.css",
    "@ogcio/design-system-angular/styles.css",
    "@ogcio/design-system-angular/fonts.css"
  ]
}
```

If your application already loads Lato, you can leave out `fonts.css`.

The package includes a compiled stylesheet, so you do not need to configure Tailwind in your application. The stylesheet includes Tailwind Preflight, which resets default browser styles across the whole application, including elements outside the design system.

## Usage

All components are standalone and use the `gi-` selector prefix. Import them by name, add them to your component’s `imports` array and use their selectors in your template. For example, import `Container`, `H1` and `Paragraph`:

```ts
import { Component } from '@angular/core';
import { Container, H1, Paragraph } from '@ogcio/design-system-angular';

@Component({
  selector: 'app-root',
  imports: [Container, H1, Paragraph],
  template: `
    <gi-container>
      <gi-h1>Apply for a passport</gi-h1>
      <gi-paragraph>Check what you need before you start.</gi-paragraph>
    </gi-container>
  `,
})
export class AppComponent {}
```

The package currently exports the layout primitives (`Box`, `Container`, `Grid`, `Stack`, `Divider`) and the typography components (`Text`, `Paragraph`, `InsetText`, `H1`–`H6`). Interactive and composite components are built but not yet exported while their Angular API is settled.

### Icons

Icons ship from the `/icons` subpath and are used like any other component. For example, import `SearchIcon` and use `<gi-search-icon>`:

```ts
import { SearchIcon } from '@ogcio/design-system-angular/icons';
```

Each icon accepts inputs including `size`, `color`, `className` and `label`. Set `label` to give the icon an accessible name; without a label, it is hidden from assistive technology. The full set of icons is catalogued on the [icons page](https://ds.services.gov.ie/resources/icons/).

## Documentation

See the [design system documentation](https://ds.services.gov.ie/components/) for component guidance and accessibility notes. For Angular examples and component inputs, [run Storybook locally](#storybook). Some components shown in Storybook are not yet exported by the package. Check the package’s type declarations for available exports and inputs.

## Local development

This package is part of the `govie-ds` monorepo. Use Node.js 24 or later and the pnpm version specified in the root `package.json`. Install the dependencies and build it from the repository root:

```bash
pnpm install
pnpm --filter '@ogcio/design-system-angular^...' build
pnpm --filter @ogcio/design-system-angular build
```

The first build command builds the library’s dependencies; the second builds the Angular library.

### Storybook

From the repository root, run:

```bash
pnpm storybook:angular
```

This builds the dependencies and starts Storybook on port 6006.

### Scripts

Run from `packages/angular`:

| Script                 | Description                                   |
| ---------------------- | --------------------------------------------- |
| `pnpm build`           | Build the library and stylesheet into `dist`. |
| `pnpm build:styles`    | Rebuild the stylesheet.                       |
| `pnpm typecheck`       | Type-check the sources.                       |
| `pnpm storybook:dev`   | Run Storybook on port 6006.                   |
| `pnpm storybook:build` | Build Storybook into `storybook-static`.      |
| `pnpm lint`            | Lint the package.                             |
| `pnpm format`          | Format the package with Prettier.             |
| `pnpm format:check`    | Check formatting without changing files.      |

### Build output

The build uses `ng-packagr` in partial compilation mode, then compiles the Tailwind stylesheet. Both outputs go into `dist`.

To include additional assets in the build, add them to `assets` in `ng-package.json`. `ng-packagr` copies `README.md` and `LICENSE` automatically. The Tailwind step replaces the copy of `styles.css` with the compiled stylesheet.

### Generated sources

The Angular, React and Vue libraries share component sources in `@ogcio/design-system-core`. Mitosis generates the files in `src/atoms` from `packages/core/atoms`. Regenerating them overwrites local changes, so edit the shared source first, then regenerate the Angular components:

```bash
pnpm --filter @ogcio/design-system-core build:angular
```

You can edit the Angular stories in `src/stories`, the package configuration and this README directly. See [`packages/core/README.md`](https://github.com/ogcio/govie-ds/blob/main/packages/core/README.md) for guidance on writing Mitosis components, including patterns that work in React but fail in Angular.

### Tailwind safelist

Tailwind cannot detect class names assembled at runtime. Components such as `Grid`, `Stack` and `HeaderNavItem` use this pattern, so their generated class names are covered by the `safelist` in `tailwind.config.ts`. If you add a component that builds class names this way, update the safelist too. Otherwise, those styles will be missing from the compiled stylesheet.

## Licence

[MIT](https://github.com/ogcio/govie-ds/blob/main/packages/angular/LICENSE) © OGCIO (PER).
