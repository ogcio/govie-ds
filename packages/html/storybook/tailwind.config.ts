import { Config } from "tailwindcss";
import { createTheme } from "@govie-ds/tailwind";

const config: Config = {
  prefix: "gi-",
  content: ["../ds/src/**/*.html"],
  theme: createTheme(),
  plugins: [],
};

export default config;
