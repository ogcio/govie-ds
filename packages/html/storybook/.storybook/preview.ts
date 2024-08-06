import type { Preview } from "@storybook/web-components";
import "@fontsource/lato";
import "@govie-ds/theme-govie/theme.css";
import "./global.css";
import "../../ds/styles.css";
import "@govie-frontend/ds";

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
