import { createTheme } from '@ogcio/design-system-tailwind';
import type { Config } from 'tailwindcss';

export default {
  prefix: 'gi-',
  // A size optimisation: the React library's own stylesheet is about 1 MB, so only the classes of the
  // inspector's markup and the DS components it renders (Heading, Paragraph and Link) are compiled.
  content: [
    './src/**/*.tsx',
    './node_modules/@ogcio/design-system-react/dist/{Heading,Link}.js',
    './node_modules/@ogcio/design-system-react/dist/paragraph/**/*.js',
    './node_modules/@ogcio/design-system-react/dist/atoms/{Paragraph,Text,Text.styles,Link,Link.styles}.js',
    './node_modules/@ogcio/design-system-react/dist/atoms/heading/**/*.js',
  ],
  theme: createTheme(),
} satisfies Config;
