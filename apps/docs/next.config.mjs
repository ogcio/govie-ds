import { withContentlayer } from "next-contentlayer";

const isCI = Boolean(process.env.CI);
const isExport = Boolean(process.env.OUTPUT_EXPORT);
const prefix = undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  basePath: prefix,
  assetPrefix: prefix,
  output: isExport ? "export" : "standalone",
  images: {
    unoptimized: true, // TODO: review image optimisation
  },
};

export default withContentlayer(nextConfig);
