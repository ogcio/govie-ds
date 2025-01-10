import type { MetadataRoute } from 'next';
import getConfig from 'next/config';
import { getAll } from '../lib/documents';

export const revalidate = 1;

const { publicRuntimeConfig } = getConfig();
const isGitHubPages = Boolean(process.env.GITHUB_PAGES);

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = isGitHubPages
    ? `https://ogcio.github.io/govie-ds/${publicRuntimeConfig.prefix}/`
    : `https://ds.blocks.gov.ie/`;

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
