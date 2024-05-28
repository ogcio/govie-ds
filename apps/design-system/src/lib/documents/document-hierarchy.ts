import cloneDeepWith from "lodash.clonedeepwith";
import { getSegmentDetails } from "./document-details";

function sortHierarchyByOrder(hierarchy: DocumentHierarchy): DocumentHierarchy {
  hierarchy.children.sort((a, b) => a.order - b.order);
  hierarchy.children.forEach((child) => sortHierarchyByOrder(child));
  return hierarchy;
}

export type DocumentHierarchy = {
  id: string;
  order: number;
  slug: string;
  children: DocumentHierarchy[];
};

function getDocumentHierarchyInternal(paths: string[]): DocumentHierarchy {
  if (!paths || paths.length === 0) {
    throw new Error(`Invalid paths.`);
  }

  const hierarchy: DocumentHierarchy = {
    id: "",
    order: 0,
    slug: "",
    children: [],
  };

  for (const path of paths) {
    const parts = path.split("/").map((part) => getSegmentDetails(part));

    if (parts.length < 2 || parts.length > 3) {
      throw new Error(`Invalid path '${path}'.`);
    }

    let parent = hierarchy;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      const id = parent.id
        ? `${parent.id}/${part.order}-${part.id}`
        : `${part.order}-${part.id}`;

      const existing = parent.children.find((child) => child.id === id);

      if (existing) {
        parent = existing;
      } else {
        const child: DocumentHierarchy = {
          id,
          order: part.order,
          slug: parts
            .slice(0, i + 1)
            .map((p) => p.id)
            .join("/"),
          children: [],
        };

        parent.children.push(child);
        parent = child;
      }
    }
  }

  return sortHierarchyByOrder(hierarchy);
}

function isDocumentHierarchy(value: unknown): value is DocumentHierarchy {
  if (!value) {
    return false;
  }

  return typeof value === "object" && value.hasOwnProperty("slug");
}

function cleanSlugs(value: DocumentHierarchy): DocumentHierarchy {
  const slugParts = value.slug.split("/").filter((part) => part !== "index");

  return {
    ...value,
    slug:
      slugParts.length === 3
        ? `${slugParts[0]}/${slugParts[2]}`
        : slugParts.join("/"),
    children: value.children.map((child) => cleanSlugs(child)),
  };
}

export function getDocumentHierarchy(paths: string[]): DocumentHierarchy {
  const hierarchy = getDocumentHierarchyInternal(paths);

  return cloneDeepWith(hierarchy, (value) => {
    if (isDocumentHierarchy(value)) {
      return cleanSlugs(value);
    }

    return value;
  });
}
