import { withContentlayer } from "next-contentlayer";

const isCI = Boolean(process.env.CI);
const prefix = undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  basePath: prefix,
  assetPrefix: prefix,
  output: "standalone",
  images: {
    unoptimized: true, // TODO: review image optimisation
  },
};

export default withContentlayer(nextConfig);
