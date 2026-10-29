# Department of Engagement – Angular demo

A demonstration website for a fictional government department, built with the Angular library of the [Government of Ireland Design System](https://ds.services.gov.ie/). It follows the layout of the Design System website: header, primary navigation, section pages with side navigation and breadcrumbs, and footer.

Every Design System element comes from the public API of `@ogcio/design-system-angular`. The side navigation comes from the `@ogcio/design-system-angular/preview` entry point until its curated wrappers ship. The site loads the theme, the compiled library stylesheet and fonts, and builds its own page-level utilities with Tailwind and `createTheme()` from `@ogcio/design-system-tailwind`. The application utilities have no prefix, so they never collide with the library's `gi-` classes.

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

## Deploy

The site uses the Angular router with path-based URLs, so the web server must serve the site's `index.html` for any path under its base href that does not match a file. With nginx, for a site built with `ng build --base-href /demo/`:

```nginx
location /demo/ {
  try_files $uri $uri/ /demo/index.html;
}
```

## Structure

The application follows the structure of the Angular Material documentation site: routed screens live in `pages`, reusable components in `shared`, and file and class names follow the Angular CLI without suffixes.

| Path             | Contents                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| `src/app/pages`  | Routed pages; each site section has its own folder with a layout that adds the side navigation          |
| `src/app/shared` | Site header and footer, page, page section, section layout, side navigation link and article components |

Page text lives in the page templates.
