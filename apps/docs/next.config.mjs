import { withContentlayer } from 'next-contentlayer';

const isGitHubPages = Boolean(process.env.GITHUB_PAGES);
const isNextExport = Boolean(process.env.NEXT_EXPORT);

const prefix = isGitHubPages ? '/govie-ds' : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  basePath: prefix,
  assetPrefix: prefix,
  output: isNextExport ? 'export' : 'standalone',
  images: {
    unoptimized: true, // TODO: review image optimisation
  },
};

export default withContentlayer(nextConfig);
