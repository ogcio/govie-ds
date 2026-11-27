# Department of Engagement – Vue demo

A demonstration website for a fictional government department, built with the Vue library of the [Government of Ireland Design System](https://ds.services.gov.ie/). It follows the layout of the Design System website: header, primary navigation, section pages with side navigation and breadcrumbs, and footer.

Every Design System element comes from the public API of `@ogcio/design-system-vue`. The site loads the theme, the compiled library stylesheet and fonts, and builds its own page-level utilities with Tailwind and `createTheme()` from `@ogcio/design-system-tailwind`. The application utilities have no prefix, so they never collide with the library's `gi-` classes.

## Run locally

Build the workspace dependencies and start the development server from the repository root:

```bash
pnpm examples:vue
```

The site runs at `http://localhost:5173/`.

## Build

```bash
pnpm --filter "@ogcio/examples-vue^..." build && pnpm --filter @ogcio/examples-vue build
```

The static site is written to `dist`.

## Deploy

The site uses Vue Router with path-based URLs, so the web server must serve the site's `index.html` for any path under its base that does not match a file. With nginx, for a site built with `vite build --base /demo/`:

```nginx
location /demo/ {
  try_files $uri $uri/ /demo/index.html;
}
```

## Structure

| Path             | Contents                                                                          |
| ---------------- | --------------------------------------------------------------------------------- |
| `src/pages`      | Routed pages; each site section has its own folder                                |
| `src/components` | Site header and footer, page, page section, section layout and article components |
| `src/router.ts`  | Routes, page titles and scroll behaviour                                          |

Page text lives in the page templates. News articles are data in `src/pages/news/news.ts`.
