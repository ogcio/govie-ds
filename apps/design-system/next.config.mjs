import { withContentlayer } from "next-contentlayer";

const isCI = Boolean(process.env.GITHUB_PAGES);
const prefix = isCI ? "/ogcio-ds-poc" : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  basePath: prefix,
  assetPrefix: prefix,
  output: isCI ? "export" : undefined, // TODO: see https://github.com/vercel/next.js/issues/56253
  images: {
    unoptimized: true, // TODO: review image optimisation
  },
};

export default withContentlayer(nextConfig);
