import { sortBy } from 'lodash';

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
  // TODO: add required description
  statuses: ComponentPlatformStatus[];
};

const globalHtmlStorybookBaseUrl =
  'https://storybook-html.design-system.blocks.gov.ie/';

const reactStorybookBaseUrl =
  'https://storybook-react.design-system.blocks.gov.ie/';

const localHtmlStorybookBaseUrl =
  'https://storybook.design-system.ogcio.gov.ie/';

export function getComponents(): ComponentDetail[] {
  let components: ComponentDetail[] = [
    {
      id: 'button',
      name: 'Button',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/form-button-primary-button--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/form-button--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/form-button--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'button-group',
      name: 'Button Group',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/form-button-group--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'card',
      name: 'Card',
      statuses: [
        {
          platform: {
            id: 'local',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/components-card--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/components-card--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'combo-box',
      name: 'ComboBox',
      statuses: [
        {
          platform: {
            id: 'local',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/navigation-combobox--docs',
          },
          status: 'alpha',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/navigation-combobox--docs',
          },
          status: 'alpha',
        },
      ],
    },
    {
      id: 'checkbox',
      name: 'Checkbox',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/form-checkboxes--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/form-checkboxes--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/form-checkboxes--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'chip',
      name: 'Chip',
      statuses: [
        {
          platform: {
            id: 'global',
            href: '?path=/docs/components-chip--docs',
          },
          status: 'alpha',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/components-chip--docs',
          },
          status: 'alpha',
        },
      ],
    },
    {
      id: 'file-upload',
      name: 'File Upload',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/form-file-upload--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/form-fileupload--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/form-fileupload--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'icon-button',
      name: 'Icon Button',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/form-icon-button--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/form-iconbutton--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/form-iconbutton--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'text-input',
      name: 'Text Input',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/form-text-input--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/form-textinput--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/form-textinput--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'radio-button',
      name: 'Radio Button',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/form-radio--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/form-radios--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/form-radios--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'select',
      name: 'Select',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/form-select--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/form-select--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/form-select--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'textarea',
      name: 'Textarea',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/form-textarea--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/form-textarea--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/form-textarea--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'accordion',
      name: 'Accordion',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-accordion--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'cookie-banner',
      name: 'Cookie Banner',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-cookie-banner--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/typography-cookiebanner--docs',
          },
          status: 'alpha',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/typography-cookiebanner--docs',
          },
          status: 'alpha',
        },
      ],
    },
    {
      id: 'container',
      name: 'Container',
      statuses: [
        {
          platform: {
            id: 'local',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/layout-container--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/layout-container--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'details',
      name: 'Details',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-details--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'error-summary',
      name: 'Error Summary',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-error-summary--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'blockquote',
      name: 'Blockquote',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-inset-text--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/typography-blockquote--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/typography-blockquote--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'label',
      name: 'Label',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-label--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=docs/typography-label--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=docs/typography-label--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'phase-banner',
      name: 'Phase Banner',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-phase-banner--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/typography-phasebanner--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/typography-phasebanner--docs',
          },
          status: 'stable',
        },
      ],
    },
    {
      id: 'summary-list',
      name: 'Summary List',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-summary-list--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'table',
      name: 'Table',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-table--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'tag',
      name: 'Tag',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-tag--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/typography-tag--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/typography-tag--docs',
          },
          status: 'stable',
        },
      ],
    },
    {
      id: 'task-list',
      name: 'Task List',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-task-list--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'heading',
      name: 'Heading',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-heading--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/typography-heading--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/typography-heading--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'list',
      name: 'List',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-lists--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/typography-list--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/typography-list--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'paragraph',
      name: 'Paragraph',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-paragraph--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/typography-paragraph--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/typography-paragraph--docs',
          },
          status: 'stable',
        },
      ],
    },
    {
      id: 'section-break',
      name: 'Section Break',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-section-break--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/typography-sectionbreak--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/typography-sectionbreak--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'warning-text',
      name: 'Warning Text',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/typography-warning-text--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'back-link',
      name: 'Back Link',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/navigation-back-link--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'breadcrumbs',
      name: 'Breadcrumbs',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/navigation-breadcrumbs--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'pagination',
      name: 'Pagination',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/navigation-pagination--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/navigation-pagination--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'tabs',
      name: 'Tabs',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/navigation-tabs--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/navigation-tabs--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/navigation-tabs--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'link',
      name: 'Link',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/navigation-link--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/navigation-link--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/navigation-link--docs',
          },
          status: 'stable',
        },
      ],
    },
    {
      id: 'icon',
      name: 'Icon',
      statuses: [
        {
          platform: {
            id: 'local',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/components-icon--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/components-icon--docs',
          },
          status: 'stable',
        },
      ],
    },
    {
      id: 'footer',
      name: 'Footer',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/layout-footer--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/layout-footer--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/layout-footer--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'header',
      name: 'Header',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/layout-header--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/layout-header--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/layout-header--docs',
          },
          status: 'beta',
        },
      ],
    },
    {
      id: 'notification-panel',
      name: 'Notification Panel',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/layout-notification-panel--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'panel',
      name: 'Panel',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/layout-panel--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'step-by-step-navigation',
      name: 'Step by Step Navigation',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/layout-step-by-step-navigation--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'actions',
      name: 'Actions',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/application-actions--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'modal',
      name: 'Modal',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/application-modal--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/application-modal--docs',
          },
          status: 'alpha',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/application-modal--docs',
          },
          status: 'alpha',
        },
      ],
    },
    {
      id: 'progress-stepper',
      name: 'Progress Stepper',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/application-progress-stepper--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'tick',
      name: 'Tick',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/application-tick--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'tooltip',
      name: 'Tooltip',
      statuses: [
        {
          platform: {
            id: 'local',
            href: '?path=/docs/application-tooltip--docs',
          },
          status: 'stable',
        },
        {
          platform: {
            id: 'global',
          },
          status: 'considering',
        },
        {
          platform: {
            id: 'react',
          },
          status: 'considering',
        },
      ],
    },
    {
      id: 'spinner',
      name: 'Spinner',
      statuses: [
        {
          platform: {
            id: 'local',
          },
          status: 'not-available',
        },
        {
          platform: {
            id: 'global',
            href: '?path=/docs/indicators-spinner--docs',
          },
          status: 'beta',
        },
        {
          platform: {
            id: 'react',
            href: '?path=/docs/indicators-spinner--docs',
          },
          status: 'beta',
        },
      ],
    },
  ];

  components = components.map((component) => ({
    ...component,
    statuses: component.statuses.map((status) => {
      let baseUrl = globalHtmlStorybookBaseUrl;
      if (status.platform.id === 'local') {
        baseUrl = localHtmlStorybookBaseUrl;
      } else if (status.platform.id === 'react') {
        baseUrl = reactStorybookBaseUrl;
      }
      return {
        ...status,
        platform: {
          ...status.platform,
          href: status.platform.href
            ? `${baseUrl}${status.platform.href}`
            : undefined,
        },
      };
    }),
  }));

  return sortBy(components, 'name');
}
