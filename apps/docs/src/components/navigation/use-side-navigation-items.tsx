import camelcase from 'camelcase';
import { usePathname } from 'next/navigation';
import { SideNavigationItem } from '@/components/navigation/side-navigation';
import {
  DocumentHierarchy,
  DocumentHierarchyWithMeta,
  getDocumentHierarchy,
} from '@/lib/documents/document-hierarchy';
import * as documents from '@/lib/documents/documents';
import { Doc } from 'contentlayer/generated';

// TODO: generic solution for navigation titles for folders
function toCased(value: string): string {
  if (value === 'faqs') {
    return 'FAQs';
  }

  return camelcase(value, { pascalCase: true });
}

function getNameFromSlug(slug: string): string {
  const name = slug.split('/').pop();

  if (!name) {
    throw new Error('Invalid name from slug.');
  }

  const nameParts = name.split('-').filter(Boolean);
  return nameParts.map((part) => toCased(part)).join(' ');
}

function toSideNavigationItem({
  slug,
  item,
}: {
  slug: string[];
  item: DocumentHierarchyWithMeta;
}): SideNavigationItem | undefined {
  if (item.id.endsWith('index')) {
    return undefined;
  }

  // Check if meta object doesn't exist or is empty
  // if (!item.meta || Object.keys(item.meta).length === 0) {
  //   return undefined;
  // }

  const name: string = item.meta['title']
    ? item.meta['title'].toString()
    : getNameFromSlug(item.slug);

  return {
    id: item.id,
    name,
    href: item.children.length === 0 ? `/${item.slug}` : undefined,
    isActive: item.slug === slug.join('/'),
    children: item.children
      .map((child) => {
        let childId = child.id;
        if (Object.keys(child.meta).length === 0) {
          childId = child.children[0].id;
        }
        const childDocument = documents.getById({ id: childId });

        if (!childDocument) {
          throw new Error(`Document not found '${child.id}'.`);
        }

        return {
          id: child.id,
          name: childDocument.title,
          href: `/${child.slug}`,
          isActive: child.slug === slug.join('/'),
          children: [],
        };
      })
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      }),
  };
}

function toMeta({
  documents,
  documentHierarchy,
}: {
  documents: Doc[];
  documentHierarchy: DocumentHierarchy;
}): DocumentHierarchyWithMeta {
  const meta = documents.find(
    (document) => document.id === documentHierarchy.id,
  );

  const { id, _id, _raw, body, ...rest } = meta ?? {};

  return {
    ...documentHierarchy,
    meta: rest,
    children: documentHierarchy.children.map((child) =>
      toMeta({ documents, documentHierarchy: child }),
    ),
  };
}

export function useSideNavigationItems(): {
  items: SideNavigationItem[];
  activeItem?: SideNavigationItem;
} {
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean);

  if (slug.length === 0) {
    return { items: [] };
  }

  const allDocuments = documents.getAll();
  const documentHierarchy = getDocumentHierarchy(
    allDocuments.map((document) => document.id),
  );

  if (!documentHierarchy) {
    return { items: [] };
  }

  const documentHierarchyWithMeta: DocumentHierarchyWithMeta = toMeta({
    documents: allDocuments,
    documentHierarchy,
  });

  const topLevelHierarchy = documentHierarchyWithMeta.children.find(
    (child) => child.slug === slug[0],
  );

  if (!topLevelHierarchy) {
    return { items: [] };
  }

  const items: SideNavigationItem[] = topLevelHierarchy.children
    .map((item) => toSideNavigationItem({ slug, item }))
    .filter(Boolean) as SideNavigationItem[];

  const allItems = items.flatMap((item) => [item, ...(item.children ?? [])]);
  const activeItem = allItems.find((item) => item.isActive);

  return { items, activeItem };
}
