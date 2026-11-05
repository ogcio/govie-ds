import { CATALOGUE, SKIPPED_TAGS, describeTag } from './catalogue';
import type { CatalogueEntry, ComponentDescription } from './catalogue';
import { measure } from './utils';

/** The catalogue key the element matched, in lower case, and its entry. */
type Match = [key: string, entry: CatalogueEntry];

/** The closest visible Design System component at or above the given element. */
export function findComponent(target: Element | null): Element | null {
  for (let element = target; element; element = parentOf(element)) {
    if (isComponent(element) && measure(element)) {
      return element;
    }
  }
  return null;
}

/** Design System components the element is nested in, outermost first. */
export function componentAncestors(element: Element): Element[] {
  const ancestors: Element[] = [];
  for (let parent = parentOf(element); parent; parent = parentOf(parent)) {
    if (isComponent(parent)) {
      ancestors.unshift(parent);
    }
  }
  return ancestors;
}

/** The catalogue entry the element matches, or a name derived from its tag. */
export function describeComponent(element: Element): ComponentDescription {
  const match = matchCatalogue(element);
  if (!match) {
    return describeTag(element.localName);
  }
  const [key, entry] = match;
  // Shown as the library declares it, in its original case.
  const selector = entry.selectors.find((candidate) => candidate.toLowerCase() === key) ?? key;
  return { name: entry.name, selector, description: entry.description, docsUrl: entry.docsUrl };
}

/** A catalogued component, or any other `gi-*` element such as an icon or a logo. */
function isComponent(element: Element): boolean {
  if (SKIPPED_TAGS.has(element.localName)) {
    return false;
  }
  const match = matchCatalogue(element);
  if (!match) {
    return element.localName.startsWith('gi-');
  }
  const [, { kind, selectors }] = match;
  return kind !== 'layout' || !element.parentElement?.closest(selectors.join(', '));
}

/** Looks the element up by its tag, then by each attribute with and without the tag: `gi-grid`, `a[gilink]`, `[gigrid]`. */
function matchCatalogue(element: Element): Match | null {
  const tag = element.localName;
  const keys = [tag, ...element.getAttributeNames().flatMap((name) => [`${tag}[${name}]`, `[${name}]`])];
  const key = keys.find((candidate) => CATALOGUE.has(candidate));
  return key === undefined ? null : [key, CATALOGUE.get(key) as CatalogueEntry];
}

/** The parent element, stepping out of an open shadow root to its host. */
function parentOf(element: Element): Element | null {
  const root = element.getRootNode();
  return element.parentElement ?? (root instanceof ShadowRoot ? root.host : null);
}
