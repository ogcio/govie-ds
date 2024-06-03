import { allDocs } from 'contentlayer/generated';
import { config } from '../config';

export function getAll() {
  if (!config.showDrafts()) {
    return allDocs.filter((doc) => !doc.draft);
  }

  return allDocs;
}

export function getById({ id }: { id: string }) {
  const doc = allDocs.find((doc) => doc.id === id);

  if (!config.showDrafts() && doc?.draft) {
    return undefined;
  }

  return doc;
}

export function getBySlug({ slug }: { slug: string[] }) {
  const doc = allDocs.find((doc) => doc.slug === slug.join('/'));

  if (!config.showDrafts() && doc?.draft) {
    return undefined;
  }

  return doc;
}
