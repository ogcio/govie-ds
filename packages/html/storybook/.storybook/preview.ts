import type { Preview } from "@storybook/web-components";
import "@fontsource/lato";
import "@govie-ds/theme-govie/theme.css";
import "./global.css";
import "../../ds/styles.css";
import { initGovIe } from "@govie-frontend/ds";

document.addEventListener("DOMContentLoaded", function (event) {
  initGovIe();
});

const preview: Preview = {
  tags: ["autodocs"],
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
