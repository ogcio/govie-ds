import { sortBy } from 'lodash';
import { getAll } from './documents';

export type ComponentStatus =
  | 'alpha'
  | 'beta'
  | 'stable'
  | 'considering'
  | 'not-available'
  | 'deprecated';

export type ComponentPlatformId = 'figma' | 'local' | 'global' | 'react';

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

const isDevelopmentEnvironment = process.env.DEPLOY_ENV === 'dev';

const globalHtmlStorybookBaseUrl = isDevelopmentEnvironment
  ? 'https://ds.dev.services.gov.ie/storybook-html/'
  : 'https://storybook-html.design-system.blocks.gov.ie/';

const reactStorybookBaseUrl = isDevelopmentEnvironment
  ? 'https://ds.dev.services.gov.ie/storybook-react/'
  : 'https://storybook-react.design-system.blocks.gov.ie/';

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
