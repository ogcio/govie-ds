import { config } from '../config';
import { MetaDocument } from './types';
import { allDocs } from 'contentlayer/generated';

export function getAll() {
  if (!config.showDrafts) {
    return allDocs.filter((document) => document.status !== 'draft');
  }

  return allDocs;
}

export function getById({ id }: { id: string }) {
  const document = allDocs.find((document) => document.id === id);

  if (!config.showDrafts && document?.status === 'draft') {
    return;
  }

  return document;
}

export function getBySlug({ slug }: { slug: string[] }) {
  const document = allDocs.find((document) => document.slug === slug.join('/'));

  if (!config.showDrafts && document?.status === 'draft') {
    return;
  }

  return document;
}

export function getTitle(title: string) {
  const SUFFIX = 'Government of Ireland Design System';
  return `${title} - ${SUFFIX}`;
}

export function getMeta({ slug }: { slug: string[] }): MetaDocument {
  const document = getBySlug({ slug });

  if (!document) {
    return {
      title: getTitle('Page not found'),
      description: 'The requested URL was not found',
      hideToc: true,
    };
  }

  const { description, status, title, hideToc } = document;
  const titleWithSuffix = getTitle(title);

  return {
    title: titleWithSuffix,
    description,
    status,
    hideToc,
  };
}
