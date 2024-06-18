import camelcase from 'camelcase';
import { usePathname } from 'next/navigation';
import { SideNavigationItem } from '@/components/navigation/side-navigation';
import {
  DocumentHierarchy,
  getDocumentHierarchy,
} from '@/lib/documents/document-hierarchy';
import * as documents from '@/lib/documents/documents';

function toSideNavigationItem({
  slug,
  item,
}: {
  slug: string[];
  item: DocumentHierarchy;
}): SideNavigationItem | undefined {
  if (item.id.endsWith('index')) {
    return undefined;
  }

  const name = item.slug.split('/').pop();

  if (!name) {
    throw new Error('Invalid name from slug.');
  }

  const nameParts = name.split('-').filter(Boolean);

  return {
    id: item.id,
    name: nameParts
      .map((part) => camelcase(part, { pascalCase: true }))
      .join(' '),
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

export function useSideNavigationItems() {
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean);

  if (slug.length === 0) {
    return [];
  }

  const allDocumentIds = documents.getAll().map((document) => document.id);
  const documentHierarchy = getDocumentHierarchy(allDocumentIds);

  if (!documentHierarchy) {
    return [];
  }

  const topLevelHierarchy = documentHierarchy.children.find(
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
