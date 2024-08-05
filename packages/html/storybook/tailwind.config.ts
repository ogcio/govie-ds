import { Config } from "tailwindcss";
import { createTheme } from "@govie-ds/tailwind";

const config: Config = {
  content: ["../ds/src/**/*.html"],
  theme: createTheme(),
  plugins: [],
};

export default config;
