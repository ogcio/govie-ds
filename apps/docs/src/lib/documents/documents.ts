import { config } from '../config';
import { allDocs } from 'contentlayer/generated';

export function getAll() {
  if (!config.showDrafts()) {
    return allDocs.filter((document) => !document.draft);
  }

  return allDocs;
}

export function getById({ id }: { id: string }) {
  const document = allDocs.find((document) => document.id === id);

  if (!config.showDrafts() && document?.draft) {
    return;
  }

  return document;
}

export function getBySlug({ slug }: { slug: string[] }) {
  const document = allDocs.find((document) => document.slug === slug.join('/'));

  if (!config.showDrafts() && document?.draft) {
    return;
  }

  return document;
}

export function getMetadataTitle({ slug }: { slug: string[] }) {
  const suffix = 'Gov IE Design System';
  const title = getBySlug({ slug })?.title;

  return title ? `${title} - ${suffix}` : `Page not found - ${suffix}`;
}

export function getMetadataDescription({ slug }: { slug: string[] }) {
  return getBySlug({ slug })?.description || 'The requested URL was not found';
}
