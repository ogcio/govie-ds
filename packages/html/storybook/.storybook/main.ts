import type { StorybookConfig } from "@storybook/web-components-vite";
import path from "node:path";

const config: StorybookConfig = {
  stories: ["../../ds/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import("vite");

    if (configType === "PRODUCTION") {
      return config;
    }

    return mergeConfig(config, {
      server: {
        watch: {
          usePolling: true,
          interval: 1000,
        },
      },
      resolve: {
        alias: {
          "@govie-frontend/ds": path.resolve(
            __dirname,
            "../../ds/src/index.ts"
          ),
        },
      },
    });
  },
};

export default config;
