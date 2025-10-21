import { isValidElement, ReactNode } from 'react';

/**
 * Returns a safe for url string representation.
 *
 * @param value - The string to be transformed
 * @returns A string that can be used as slug
 *
 */
export function slugify(value?: string) {
  if (!value) {
    return value;
  }

  let slug = value.replaceAll(/^\s+|\s+$/g, '');
  slug = slug.toLowerCase();
  slug = slug
    .replaceAll(/[^\d a-z-]/g, '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-');
  return slug;
}

export function generateRandomId() {
  return Math.random().toString(36).slice(2, 11);
}

export function getSpecialComponentType(child: ReactNode): string | null {
  if (!isValidElement(child)) {
    return null;
  }

  return (
    (child.type as any)?.componentType || (child.props as any)?.__type || null
  );
}

export function isSpecialComponent(
  child: ReactNode,
  componentList: Array<string> = [],
): boolean {
  return componentList.includes(getSpecialComponentType(child) ?? '');
}
