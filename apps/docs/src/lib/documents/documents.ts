import { config } from '../config';
import { allDocuments } from 'contentlayer/generated';

export function getAll() {
  if (!config.showDrafts()) {
    return allDocuments.filter((document) => !document.draft);
  }

  return allDocuments;
}

export function getById({ id }: { id: string }) {
  const document = allDocuments.find((document) => document.id === id);

  if (!config.showDrafts() && document?.draft) {
    return;
  }

  return document;
}

export function getBySlug({ slug }: { slug: string[] }) {
  const document = allDocuments.find(
    (document) => document.slug === slug.join('/'),
  );

  if (!config.showDrafts() && document?.draft) {
    return;
  }

  return document;
}
