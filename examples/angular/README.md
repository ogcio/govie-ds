# Department of Engagement – Angular demo

A demonstration website for a fictional government department, built with the Angular library of the [Government of Ireland Design System](https://ds.services.gov.ie/).

Every Design System element comes from the public API of `@ogcio/design-system-angular`. The site loads the theme, the compiled library stylesheet and fonts, and builds its own page-level utilities with Tailwind and `createTheme()` from `@ogcio/design-system-tailwind`. The application utilities have no prefix, so they never collide with the library's `gi-` classes.

## Run locally

Build the workspace dependencies and start the development server from the repository root:

```bash
pnpm examples:angular
```

The site runs at `http://localhost:4200/`.

## Build

```bash
pnpm --filter "@ogcio/examples-angular^..." build && pnpm --filter @ogcio/examples-angular build
```

The static site is written to `dist/ogcio-demo/browser`.
