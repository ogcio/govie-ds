import { createTheme } from "@govie-ds/tailwind";
import { Config } from "tailwindcss";

const config: Config = {
  prefix: "gi-",
  content: ["../ds/src/**/*.html"],
  theme: createTheme(),
  plugins: [],
};

export default config;
