import { ANGULAR_COMPONENTS, ANGULAR_SKIPPED_TAGS } from './angular';
import { REACT_COMPONENTS, REACT_SKIPPED_TAGS } from './react';
import type { CatalogueEntry } from './utils';
import { VUE_COMPONENTS, VUE_SKIPPED_TAGS } from './vue';

export type { CatalogueEntry, ComponentDescription } from './utils';
export { describeTag } from './utils';

/**
 * Every framework's components keyed by selector in lower case, as the browser reports tags and attributes,
 * so an element is looked up directly instead of being tested against each selector.
 */
export const CATALOGUE = new Map<string, CatalogueEntry>(
  [...ANGULAR_COMPONENTS, ...REACT_COMPONENTS, ...VUE_COMPONENTS].flatMap((entry) =>
    entry.selectors.map((selector) => [selector.toLowerCase(), entry] as const),
  ),
);

/** Tags of internal parts and spacing primitives, skipped so the nesting chain stays readable. */
export const SKIPPED_TAGS = new Set([...ANGULAR_SKIPPED_TAGS, ...REACT_SKIPPED_TAGS, ...VUE_SKIPPED_TAGS]);
