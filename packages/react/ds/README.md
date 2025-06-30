# govie-react

**This library should only be imported for departments actively working with the core design system team during its development. Do not use this library if you are not part of this development process, and contact the design system team instead if you interested in its use.**

Welcome to the GOV IE React component library, a collection of reusable React components designed to help you build modern React web applications utilising the GOV IE design system.

**Status: Alpha**

> Important Note: This library is currently in the **alpha** stage. As we continue to develop and improve the components, **frequent breaking changes are to be expected**. We appreciate your understanding and patience as we work towards a stable version 1.0.

## Getting Started

To install the library, use the following command:

```
npm install @ogcio/design-system-react @ogcio/theme-govie
```

### Pinning packages

We **strongly recommend** that you pin the GOV IE design system packages, so that any regressions are not automatically introduced during development. Regressions that will only be discoverable at runtime.

**Upgrades should be explicit version updates** in the `package.json` and then your application should be regression tested:

```diff
"dependencies": {
-  "@ogcio/theme-govie": "^0.1.2",
+  "@ogcio/theme-govie": "0.1.2",
-  "@ogcio/design-system-react": "^0.1.6",
+  "@ogcio/design-system-react": "0.1.6"
```

### Usage

Import the GOV IE `theme.css` from the `@ogcio/theme-govie` theme package at the entry point of your application, for example:

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

The `@ogcio/design-system-react` package contains `Heading` and `Paragraph` components that implement the GOV IE design system responsive text guidelines:

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

The GOV IE design system uses the [Lato](https://fonts.google.com/specimen/Lato) Google font. The font should be added to your application, e.g. via [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts), [Fontsource](https://fontsource.org/docs/getting-started/install) or embed code.

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

## Contribution

We welcome contributions! If you have suggestions for improvements, please feel free to open an issue or submit a pull request.

## Feedback

Your feedback is invaluable to us. Please share your thoughts and experiences to help us make this library better.

## Roadmap

- Alpha: Frequent updates with breaking changes.
- Beta: Stabilizing the API and focusing on bug fixes.
- 1.0: Stable release with a solid API.
