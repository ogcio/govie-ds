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

function getNameFromSlug(slug: string): string {
  const name = slug.split('/').pop();

  if (!name) {
    throw new Error('Invalid name from slug.');
  }

  const nameParts = name.split('-').filter(Boolean);

  return nameParts
    .map((part) => camelcase(part, { pascalCase: true }))
    .join(' ');
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

  const name: string = item.meta['navigation']
    ? item.meta['navigation'].toString()
    : getNameFromSlug(item.slug);

  return {
    id: item.id,
    name,
    href: item.children.length === 0 ? `/${item.slug}` : undefined,
    isActive: item.slug === slug.join('/'),
    children: item.children.map((child) => {
      const childDocument = documents.getById({ id: child.id });

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, _id, _raw, body, ...rest } = meta ?? {};

  return {
    ...documentHierarchy,
    meta: rest,
    children: documentHierarchy.children.map((child) =>
      toMeta({ documents, documentHierarchy: child }),
    ),
  };
}

export function useSideNavigationItems() {
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean);

  if (slug.length === 0) {
    return [];
  }

  const allDocuments = documents.getAll();
  const documentHierarchy = getDocumentHierarchy(
    allDocuments.map((document) => document.id),
  );

  if (!documentHierarchy) {
    return [];
  }

  const documentHierarchyWithMeta: DocumentHierarchyWithMeta = toMeta({
    documents: allDocuments,
    documentHierarchy,
  });

  const topLevelHierarchy = documentHierarchyWithMeta.children.find(
    (child) => child.slug === slug[0],
  );

  if (!topLevelHierarchy) {
    return [];
  }

  const items: SideNavigationItem[] = topLevelHierarchy.children
    .map((item) => toSideNavigationItem({ slug, item }))
    .filter(Boolean) as SideNavigationItem[]; // TODO: ts filter

  return items;
}
