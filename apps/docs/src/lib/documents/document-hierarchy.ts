import cloneDeepWith from 'lodash/cloneDeepWith.js';
import { getSegmentDetails } from './document-details';

function sortHierarchyByOrder(hierarchy: DocumentHierarchy): DocumentHierarchy {
  hierarchy.children.sort((a, b) => a.order - b.order);

  for (const child of hierarchy.children) {
    sortHierarchyByOrder(child);
  }

  return hierarchy;
}

export type DocumentHierarchy = {
  id: string;
  order: number;
  slug: string;
  children: DocumentHierarchy[];
};

export type DocumentHierarchyWithMeta = {
  id: string;
  order: number;
  slug: string;
  meta: Record<string, string>;
  children: DocumentHierarchyWithMeta[];
};

function getDocumentHierarchyInternal(
  paths: string[],
): DocumentHierarchy | undefined {
  if (!paths || paths.length === 0) {
    return;
  }

  const hierarchy: DocumentHierarchy = {
    id: '',
    order: 0,
    slug: '',
    children: [],
  };

  for (const path of paths) {
    const parts = path.split('/').map((part) => getSegmentDetails(part));

    if (parts.length < 2 || parts.length > 3) {
      throw new Error(`Invalid path '${path}'.`);
    }

    let parent = hierarchy;
    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];

      const id = parent.id
        ? `${parent.id}/${part.order}-${part.id}`
        : `${part.order}-${part.id}`;

      const existing = parent.children.find((child) => child.id === id);

      if (existing) {
        parent = existing;
        continue;
      }

      const child: DocumentHierarchy = {
        id,
        order: part.order,
        slug: parts
          .slice(0, index + 1)
          .map((p) => p.id)
          .join('/'),
        children: [],
      };

      parent.children.push(child);
      parent = child;
    }
  }

  return sortHierarchyByOrder(hierarchy);
}

function isDocumentHierarchy(value: unknown): value is DocumentHierarchy {
  if (!value) {
    return false;
  }

  return (
    typeof value === 'object' &&
    Object.prototype.hasOwnProperty.call(value, 'slug')
  );
}

function cleanSlugs(value: DocumentHierarchy): DocumentHierarchy {
  const slugParts = value.slug.split('/').filter((part) => part !== 'index');

  return {
    ...value,
    slug: slugParts.join('/'),
    children: value.children.map((child) => cleanSlugs(child)),
  };
}

export function getDocumentHierarchy(
  paths: string[],
): DocumentHierarchy | undefined {
  const hierarchy = getDocumentHierarchyInternal(paths);

  if (!hierarchy) {
    return;
  }

  return cloneDeepWith(hierarchy, (value) => {
    if (isDocumentHierarchy(value)) {
      return cleanSlugs(value);
    }

    return value;
  });
}
