import type { Config } from "tailwindcss";
import { createTheme } from "@ogcio-ds/design-components";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/@ogcio-ds/design-components/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: createTheme(),
  plugins: [],
};

export default config;
