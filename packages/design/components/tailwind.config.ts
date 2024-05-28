import type { Config } from "tailwindcss";
import { createTheme } from "./src/theme.js";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: createTheme(),
  plugins: [require("@tailwindcss/typography")],
};

export default config;
