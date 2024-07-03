import { sortBy } from 'lodash';

export type ComponentStatus =
  | 'alpha'
  | 'beta'
  | 'stable'
  | 'under-review' // default status for HTML components
  | 'considering' // default status for Figma and React components
  | 'deprecated';

export type ComponentPlatformId = 'figma' | 'html' | 'react';

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
  // TODO: add required description
  statuses: ComponentPlatformStatus[];
};

const htmlStorybookBaseUrl = 'https://ogcio.github.io/ogcio-ds';

export function getComponents(): ComponentDetail[] {
  let components: ComponentDetail[] = [
    {
      id: 'button',
      name: 'Button',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '/?path=/docs/form-button-primary-button--docs',
          },
        },
      ],
    },
    {
      id: 'button-group',
      name: 'Button Group',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '/?path=/docs/form-button-group--docs',
          },
        },
      ],
    },
  ];

  components = components.map((component) => ({
    ...component,
    statuses: component.statuses.map((status) => ({
      ...status,
      platform: {
        ...status.platform,
        href: `${htmlStorybookBaseUrl}${status.platform.href}`,
      },
    })),
  }));

  return sortBy(components, 'name');
}
