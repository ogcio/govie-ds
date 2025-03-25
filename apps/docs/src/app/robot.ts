import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.BASE_URL;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: baseUrl + 'sitemap.xml',
  };
}
