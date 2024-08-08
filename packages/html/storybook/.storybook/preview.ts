import type { Preview } from "@storybook/web-components";
import "@fontsource/lato";
import "@govie-ds/theme-govie/theme.css";
import "./global.css";
import "../../ds/styles.css";
import { destroyGovIe, initGovIe } from "@govie-frontend/ds";

// DOMContentLoaded fires for each story on the Docs page
// so we need to destroy and re-initialise the components each time
document.addEventListener("DOMContentLoaded", () => {
  destroyGovIe();
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
