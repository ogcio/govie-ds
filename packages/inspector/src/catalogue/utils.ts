export type CatalogueEntry = {
  name: string;
  description: string;
  /** Selectors exactly as the library declares them: a tag (`gi-header`) or an attribute with or without one (`a[giLink]`, `[giGrid]`). */
  selectors: string[];
  /** Where "Documentation" leads, such as the framework's Storybook or the Design System website. */
  docsUrl?: string;
  /** Layout components nest deeply, so only the outermost one of its kind is inspected. */
  kind?: 'layout';
};

export type ComponentDescription = {
  name: string;
  /** How the component is written in a template: `gi-header` or `a[giLink]`. */
  selector: string;
  description?: string;
  docsUrl?: string;
};

/** The design page of a component on the Design System website. */
export function toDocs(slug: string): string {
  return `https://ds.services.gov.ie/components/library/${slug}/design/`;
}

/** Icons, logos and other `gi-*` tags missing from the catalogue, named after the tag itself. */
export function describeTag(tag: string): ComponentDescription {
  if (tag.startsWith('gi-logo-')) {
    return { name: 'Logo', selector: tag, description: 'An official Government of Ireland logo.' };
  }
  const name = sentenceCase(tag.replace(/^gi-/, ''));
  if (tag.endsWith('-icon')) {
    return {
      name,
      selector: tag,
      description: 'An icon from the Design System icon set.',
      docsUrl: toDocs('icon'),
    };
  }
  return { name, selector: tag };
}

/** `arrow-right-icon` → `Arrow right icon`. */
function sentenceCase(slug: string): string {
  const words = slug.replaceAll('-', ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}
