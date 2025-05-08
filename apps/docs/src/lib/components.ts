import { sortBy } from 'lodash';
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

export type ComponentDetail = {
  id: string;
  name: string;
  slug: string;
  statuses: ComponentPlatformStatus[];
  component: ComponentMetadata;
};

export type ComponentMetadata = {
  id: string;
  link?: string | undefined;
  status: 'N/A' | 'alpha' | 'beta' | 'stable';
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
};

const globalHtmlStorybookBaseUrl = '/storybook-html/';
const reactStorybookBaseUrl = '/storybook-react/';

export function getComponents(): ComponentDetail[] {
  const componentsDocuments = getAll().filter((document) => document.component);

  const components = componentsDocuments.map(
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
      }) as ComponentDetail,
  );

  return sortBy(components, 'name');
}
