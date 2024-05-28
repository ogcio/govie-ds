import type { Preview } from "@storybook/react";
import "@ogcio-ds/theme-govie/theme.css";
import "../styles/tailwind.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
