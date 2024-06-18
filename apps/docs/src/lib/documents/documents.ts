import { allDocs } from 'contentlayer/generated';
import { config } from '../config';

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
