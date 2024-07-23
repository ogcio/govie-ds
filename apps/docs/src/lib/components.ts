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

const htmlStorybookBaseUrl = 'https://storybook.design-system.ogcio.gov.ie/';

export function getComponents(): ComponentDetail[] {
  let components: ComponentDetail[] = [
    {
      id: 'button',
      name: 'Button',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/form-button-primary-button--docs',
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
            href: '?path=/docs/form-button-group--docs',
          },
        },
      ],
    },
    {
      id: 'character-count',
      name: 'Character Count',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/form-character-count--docs',
          },
        },
      ],
    },
    {
      id: 'checkbox',
      name: 'Checkbox',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/form-checkboxes--docs',
          },
        },
      ],
    },
    {
      id: 'date-input',
      name: 'Date Input',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/form-date-input--docs',
          },
        },
      ],
    },
    {
      id: 'file-upload',
      name: 'File Upload',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/form-file-upload--docs',
          },
        },
      ],
    },
    {
      id: 'icon-button',
      name: 'Icon Button',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/form-icon-button--docs',
          },
        },
        {
          platform: {
            id: 'react',
          },
          status: 'alpha',
        },
      ],
    },
    {
      id: 'text-input',
      name: 'Text Input',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/form-text-input--docs',
          },
        },
      ],
    },
    {
      id: 'radio-button',
      name: 'Radio Button',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/form-radio--docs',
          },
        },
      ],
    },
    {
      id: 'select',
      name: 'Select',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/form-select--docs',
          },
        },
      ],
    },
    {
      id: 'textarea',
      name: 'Textarea',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/form-textarea--docs',
          },
        },
      ],
    },
    {
      id: 'accordian',
      name: 'Accordian',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-accordion--docs',
          },
        },
      ],
    },
    {
      id: 'cookie-banner',
      name: 'Cookie Banner',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-cookie-banner--docs',
          },
        },
      ],
    },
    {
      id: 'details',
      name: 'Details',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-details--docs',
          },
        },
      ],
    },
    {
      id: 'error-summary',
      name: 'Error Summary',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-error-summary--docs',
          },
        },
      ],
    },
    {
      id: 'inset-text',
      name: 'Inset Text',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-inset-text--docs',
          },
        },
      ],
    },
    {
      id: 'Label',
      name: 'Label',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-label--docs',
          },
        },
      ],
    },
    {
      id: 'phase-banner',
      name: 'Phase Banner',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-phase-banner--docs',
          },
        },
      ],
    },
    {
      id: 'summary-list',
      name: 'Summary List',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-summary-list--docs',
          },
        },
      ],
    },
    {
      id: 'table',
      name: 'Table',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-table--docs',
          },
        },
      ],
    },
    {
      id: 'tag',
      name: 'Tag',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-tag--docs',
          },
        },
      ],
    },
    {
      id: 'task-list',
      name: 'Task List',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-task-list--docs',
          },
        },
      ],
    },
    {
      id: 'heading',
      name: 'Heading',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-heading--docs',
          },
        },
        {
          platform: {
            id: 'react',
          },
          status: 'alpha',
        },
      ],
    },
    {
      id: 'list',
      name: 'List',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-lists--docs',
          },
        },
      ],
    },
    {
      id: 'paragraph',
      name: 'Paragraph',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-paragraph--docs',
          },
        },
        {
          platform: {
            id: 'react',
          },
          status: 'alpha',
        },
      ],
    },
    {
      id: 'section-break',
      name: 'Section Break',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-section-break--docs',
          },
        },
      ],
    },
    {
      id: 'warning-text',
      name: 'Warning Text',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/typography-warning-text--docs',
          },
        },
      ],
    },
    {
      id: 'back-link',
      name: 'Back Link',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/navigation-back-link--docs',
          },
        },
      ],
    },
    {
      id: 'breadcrumbs',
      name: 'Breadcrumbs',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/navigation-breadcrumbs--docs',
          },
        },
      ],
    },
    {
      id: 'pagination',
      name: 'Pagination',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/navigation-pagination--docs',
          },
        },
      ],
    },
    {
      id: 'tabs',
      name: 'Tabs',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/navigation-tabs--docs',
          },
        },
      ],
    },
    {
      id: 'link',
      name: 'Link',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/navigation-link--docs',
          },
        },
        {
          platform: {
            id: 'react',
          },
          status: 'alpha',
        },
      ],
    },
    {
      id: 'icon',
      name: 'Icon',
      statuses: [
        {
          platform: {
            id: 'html',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'alpha',
        },
      ],
    },
    {
      id: 'footer',
      name: 'Footer',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/layout-footer--docs',
          },
        },
        {
          platform: {
            id: 'react',
          },
          status: 'alpha',
        },
      ],
    },
    {
      id: 'header',
      name: 'Header',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/layout-header--docs',
          },
        },
        {
          platform: {
            id: 'react',
          },
          status: 'alpha',
        },
      ],
    },
    {
      id: 'notification-panel',
      name: 'Notification Panel',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/layout-notification-panel--docs',
          },
        },
      ],
    },
    {
      id: 'panel',
      name: 'Panel',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/layout-panel--docs',
          },
        },
      ],
    },
    {
      id: 'step-by-step-navigation',
      name: 'Step by Step Navigation',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/layout-step-by-step-navigation--docs',
          },
        },
      ],
    },
    {
      id: 'super-header',
      name: 'Super Header',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/layout-superheader--docs',
          },
        },
      ],
    },
    {
      id: 'actions',
      name: 'Actions',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/application-actions--docs',
          },
        },
      ],
    },
    {
      id: 'modal',
      name: 'Modal',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/application-modal--docs',
          },
        },
      ],
    },
    {
      id: 'progress-stepper',
      name: 'Progress Stepper',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/application-progress-stepper--docs',
          },
        },
      ],
    },
    {
      id: 'tick',
      name: 'Tick',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/application-tick--docs',
          },
        },
      ],
    },
    {
      id: 'Tooltip',
      name: 'Tooltip',
      statuses: [
        {
          platform: {
            id: 'html',
            href: '?path=/docs/application-tooltip--docs',
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
        href: status.platform.href
          ? `${htmlStorybookBaseUrl}${status.platform.href}`
          : undefined,
      },
    })),
  }));

  return sortBy(components, 'name');
}
