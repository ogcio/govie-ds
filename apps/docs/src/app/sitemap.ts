import type { MetadataRoute } from 'next';
import { getAll } from '../lib/documents';

export const revalidate = 1;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? `https://ds.services.gov.ie/`
      : `https://ds.dev.services.gov.ie/`;

  const documents = getAll().map((document) => {
    return {
      url: baseUrl + document.slug,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: baseUrl + 'templates/basic-page.html',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...documents,
  ] as MetadataRoute.Sitemap;
}
