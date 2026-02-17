# Government of Ireland Design System – React

Welcome to the Government of Ireland Design System React component library, a collection of reusable React components designed to help you build modern React web applications utilising the Government of Ireland Design System.

## Getting Started

To install the library, use the following command:

```
npm install @ogcio/design-system-react @ogcio/theme-govie
```

### Usage

Import the Government of Ireland `theme.css` from the `@ogcio/theme-govie` theme package at the entry point of your application, for example:

```diff
+import '@ogcio/theme-govie/theme.css'

export function App() {
  return (
    ...
  );
}
```

> Note that you should typically run some form of CSS reset or normalisation of styles as part of your application entry point, depending on your application styling solution. For example Tailwind includes [preflight](https://tailwindcss.com/docs/preflight), an optinionated set of base styles.

Use components within your application from the `@ogcio/design-system-react` component package:

```jsx
import { Header } from '@ogcio/design-system-react';

export function MyComponent() {
  return (
    <>
      <Header serviceName="My Service" />
    </>
  );
}
```

### Typography

The `@ogcio/design-system-react` package contains `Heading` and `Paragraph` components that implement the Government of Ireland Design System responsive text guidelines:

```jsx
import { Heading, Paragraph } from '@ogcio/design-system-react';

function MyComponent() {
  return (
    <>
      <Heading>Heading</Heading>
      <Paragraph>This is a paragraph</Paragraph>
    </>
  );
}
```

#### Font Loading

The Government of Ireland Design System uses the [Lato](https://fonts.google.com/specimen/Lato) font family via [`@fontsource/lato`](https://fontsource.org/fonts/lato). Lato fonts are included in `styles.css` — no additional font import is needed.

Your bundler (Vite, webpack, etc.) resolves the `@fontsource/lato` imports and bundles the font files automatically.

A standalone `fonts.css` is also available if you need to import fonts separately:

```jsx
import '@ogcio/design-system-react/fonts.css';
```

**Next.js:** We recommend using [`next/font/google`](https://nextjs.org/docs/app/getting-started/fonts) to load the Lato font family for optimal performance.


```tsx
// app/layout.tsx (App Router)
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lato.className}>
      <body>{children}</body>
    </html>
  );
}
```

### Internationalization (i18n) Guidelines

To support multiple languages across your application, we use the `initI18n` utility provided by `@ogcio/design-system-react`. This ensures consistency, accessibility, and localization across all components.

Before rendering your app, make sure to initialize i18n with your language resources:

```js
import { initI18n } from '@ogcio/design-system-react';

initI18n({
  resources: {
    en: {
      translation: {
        // Component namespaces go here
      },
    },
    fr: {
      translation: {
        // Component namespaces go here
      },
    },
    ar: {
      translation: {
        // Component namespaces go here
      },
    },
  },
  lng: 'en', // Default language
});
```

#### Example Localisation of Pagination

The pagination component uses the following i18n keys:

```js
resources: {
  en: {
    translation: {
      pagination: {
        previous: 'Previous',
        next: 'Next',
        page: 'Page {{currentPage}} of {{totalPages}}',
        goToPage: 'Go to page {{page}}',
        goToPrevious: 'Go to previous page',
        goToNext: 'Go to next page',
      },
    },
  },
  fr: {
    translation: {
      pagination: {
        previous: 'Précédent:,
        next: 'Suivant',
        page: 'Page {{currentPage}} sur {{totalPages}}',
        goToPage: 'Aller à la page {{page}}',
        goToPrevious: 'Aller à la page précédente',
        goToNext: 'Aller à la page suivante',
      },
    },
  },
}
```

Note: Each component in the design system documents its relevant i18n keys under an **i18n Keys** heading, if available, for example [Pagination i18n Keys](http://ds.blocks.gov.ie/components/library/pagination/#i18n-keys). Be sure to refer to this section when using or implementing a component to ensure all necessary translations are provided.

