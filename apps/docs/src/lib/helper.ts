import { sortBy, groupBy } from 'lodash';
import { getAll } from './documents';

export type ComponentStatus =
  | 'alpha'
  | 'beta'
  | 'stable'
  | 'considering'
  | 'not-available'
  | 'deprecated';

export type ComponentPlatformId = 'figma' | 'global' | 'react';

export type ComponentPlatform = {
  id: ComponentPlatformId;
  href?: string;
};

export type ComponentPlatformStatus = {
  platform: ComponentPlatform;
  status?: ComponentStatus;
  designReviewed?: boolean;
  accessibilityReviewed?: boolean;
};

export type ComponentsDocument = {
  id: string;
  name: string;
  slug: string;
  statuses: ComponentPlatformStatus[];
  component: ComponentMetadata;
};

export type ComponentMetadata = {
  id: string;
  link?: string | undefined;
  status: 'not-available' | 'alpha' | 'beta' | 'stable';
  properties?: {
    name: string;
    fields: {
      name: string;
      ofType: string;
      description: string;
      defaultValue?: string | undefined;
      required: boolean;
    }[];
  }[];
  stories?: {
    name: string;
    url: string;
  }[];
};

const globalHtmlStorybookBaseUrl = '/storybook-html/';
const reactStorybookBaseUrl = '/storybook-react/';

function extractBaseIdAndPlatform(id: string): {
  baseId: string;
  platform?: string;
} {
  const parts = id.split('/');
  if (parts.length > 3) {
    const platform = parts[parts.length - 1];
    if (['design', 'html', 'react'].includes(platform)) {
      const baseId = parts.slice(0, -1).join('/');
      return { baseId, platform };
    }
  }
  return { baseId: id };
}

function mapPlatformName(platform: string): ComponentPlatformId {
  switch (platform) {
    case 'design':
      return 'figma';
    case 'html':
      return 'global';
    case 'react':
      return 'react';
    default:
      return platform as ComponentPlatformId;
  }
}

/**
 * @function getComponents
 * @description
 * Temporary utility function to fetch and normalize component metadata
 * from mixed-format documents. It merges legacy documents (without explicit
 * libraries) and newer documents (with `libraries` field), associating them
 * with appropriate platforms (`figma`, `react`, `global`) and statuses.
 *
 * The function generates a standardized list of ComponentsDocument objects,
 * each including platform-specific statuses and links to Storybook previews.
 *
 * ⚠️ This function will be removed once all component documents are migrated
 * to the new file format structure (design, react, html).
 *
 * @returns {ComponentsDocument[]} Sorted list of normalized component metadata.
 */

export function getComponents(): ComponentsDocument[] {
  const componentsDocuments = getAll().filter(
    (document) => document.component && document.slug.includes('components/'),
  );

  const componentWithLibraries = componentsDocuments.filter(
    (component) => component.libraries,
  );

  const componentWithoutLibraries = componentsDocuments.filter(
    (cd) => !cd.libraries,
  );

  const groupedComponentsWithoutLibraries = groupBy(
    componentWithoutLibraries,
    (component) => extractBaseIdAndPlatform(component.id).baseId,
  );

  const mergedComponentsFromWithoutLibraries: ComponentsDocument[] =
    Object.entries(groupedComponentsWithoutLibraries).map(
      ([baseId, components]) => {
        const baseComponent = components[0];
        const libraries = components.map((comp) => {
          const { platform } = extractBaseIdAndPlatform(comp.id);
          const mappedPlatform = platform ? mapPlatformName(platform) : 'figma';

          return {
            link: comp.component?.link,
            platform: mappedPlatform,
            status: comp.component?.status,
            type: '__UNNAMED__',
          };
        });

        const mergedComponent = {
          ...baseComponent,
          id: baseId,
          libraries,
        };

        return {
          id: baseId,
          name: mergedComponent.title,
          slug: mergedComponent.slug,
          component: mergedComponent.component,
          statuses: libraries.map((library) => {
            let baseUrl = '';
            switch (library.platform) {
              case 'react': {
                baseUrl = reactStorybookBaseUrl;
                break;
              }
              case 'global': {
                baseUrl = globalHtmlStorybookBaseUrl;
                break;
              }
            }
            return {
              status: library.status,
              platform: {
                id: library.platform,
                href: library.link ? `${baseUrl}${library.link}` : undefined,
              },
            } as ComponentPlatformStatus;
          }),
        } as ComponentsDocument;
      },
    );

  const processedComponentsWithLibraries = componentWithLibraries.map(
    (componentsDocument) =>
      ({
        id: componentsDocument.id,
        name: componentsDocument.title,
        slug: componentsDocument.slug,
        component: componentsDocument.component,
        statuses:
          componentsDocument.libraries?.map((status) => {
            let baseUrl = '';
            switch (status.platform) {
              case 'react': {
                baseUrl = reactStorybookBaseUrl;
                break;
              }
              case 'global': {
                baseUrl = globalHtmlStorybookBaseUrl;
                break;
              }
            }
            return {
              status: status.status,
              platform: {
                id: status.platform,
                href: status.link ? `${baseUrl}${status.link}` : undefined,
              },
            } as ComponentPlatformStatus;
          }) || [],
      }) as ComponentsDocument,
  );

  const allComponents = [
    ...processedComponentsWithLibraries,
    ...mergedComponentsFromWithoutLibraries,
  ];

  return sortBy(allComponents, 'name');
}
