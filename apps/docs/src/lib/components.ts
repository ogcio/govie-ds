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
  statuses: ComponentPlatformStatus[];
};

const globalHtmlStorybookBaseUrl = '/storybook-html/';
const reactStorybookBaseUrl = '/storybook-react/';

export function getComponents(): ComponentDetail[] {
  const componentsDocument = getAll().filter((document) => document.libraries);

  const components = componentsDocument.map(
    (component) =>
      ({
        id: component.id,
        name: component.title,
        statuses:
          component.libraries?.map((status) => {
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
