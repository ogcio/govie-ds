import { sortBy } from 'lodash';
import { getAll } from './documents';

export type ComponentStatus =
  | 'alpha'
  | 'beta'
  | 'stable'
  | 'under-review' // default status for HTML components
  | 'considering' // default status for Figma and React components
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

const globalHtmlStorybookBaseUrl =
  'https://storybook-html.design-system.blocks.gov.ie/';

const reactStorybookBaseUrl =
  'https://storybook-react.design-system.blocks.gov.ie/';

const localHtmlStorybookBaseUrl =
  'https://storybook.design-system.ogcio.gov.ie/';

export function getComponents(): ComponentDetail[] {
  const componentsDocument = getAll().filter((document) => document.libraries);

  const components = componentsDocument.map((component) => ({
    id: component.id,
    name: component.title,
    statuses:
      component.libraries?.map((status) => {
        let baseUrl = globalHtmlStorybookBaseUrl;
        if (status.platform === 'local') {
          baseUrl = localHtmlStorybookBaseUrl;
        } else if (status.platform === 'react') {
          baseUrl = reactStorybookBaseUrl;
        }
        return {
          status: status.status,
          platform: {
            id: status.platform,
            href: status.link ? `${baseUrl}${status.link}` : undefined,
          },
        };
      }) || [],
  }));

  return sortBy(components, 'name');
}
