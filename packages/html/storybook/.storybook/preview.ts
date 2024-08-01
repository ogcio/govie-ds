import type { Preview } from "@storybook/web-components";
import "@fontsource/lato";
import "./global.css";
import "../../ds/styles.css";

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
