import { withContentlayer } from 'next-contentlayer2';

const isNextExport = Boolean(process.env.NEXT_EXPORT);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: isNextExport ? 'export' : 'standalone',
  images: {
    unoptimized: true, // TODO: review image optimisation
  },
  turbopack: {},
};

export default withContentlayer(nextConfig);
