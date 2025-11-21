import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  sourcemap: true,
  minify: true,
  clean: true,
  dts: true,
});
