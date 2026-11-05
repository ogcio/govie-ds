import type { CatalogueEntry } from './utils';
import { toDocs } from './utils';

/** The Design System components of the Angular library, with the selectors it declares and their documentation. */
export const ANGULAR_COMPONENTS: CatalogueEntry[] = [
  {
    name: 'Header',
    description: 'Site-wide header with the logo, service title and primary navigation.',
    selectors: ['gi-header'],
    docsUrl: toStorybook('layout-header-header'),
  },
  {
    name: 'Header logo',
    description: 'Logo slot of the header, linked to the home page.',
    selectors: ['gi-header-logo'],
    docsUrl: toStorybook('layout-header-headerlogo'),
  },
  {
    name: 'Header title',
    description: 'Service or department name next to the logo.',
    selectors: ['gi-header-title'],
    docsUrl: toStorybook('layout-header-headertitle'),
  },
  {
    name: 'Header navigation',
    description: 'Primary navigation inside the header.',
    selectors: ['gi-header-nav'],
    docsUrl: toStorybook('layout-header-headernav'),
  },
  {
    name: 'Header nav item',
    description: 'A list item of the header navigation.',
    selectors: ['li[giHeaderNavItem]'],
    docsUrl: toStorybook('layout-header-headernavitem'),
  },
  {
    name: 'Header nav link',
    description: 'A navigation link in the header that works with the Angular router.',
    selectors: ['gi-header-nav-item-link', 'a[giHeaderNavLink]'],
    docsUrl: toStorybook('layout-header-headernavitemlink'),
  },
  {
    name: 'Header nav button',
    description: 'A header action such as the mobile menu toggle.',
    selectors: ['gi-header-nav-item-button', 'button[giHeaderNavButton]'],
    docsUrl: toStorybook('layout-header-headernavitembutton'),
  },
  {
    name: 'Header nav separator',
    description: 'A divider between groups of header navigation items.',
    selectors: ['gi-header-nav-item-separator'],
    docsUrl: toStorybook('layout-header-headernavitemseparator'),
  },
  {
    name: 'Footer',
    description: 'Site-wide footer with secondary links, logo and legal information.',
    selectors: ['gi-footer'],
    docsUrl: toStorybook('layout-footer'),
  },
  {
    name: 'Footer logo',
    description: 'Logo slot of the footer.',
    selectors: ['gi-footer-logo'],
    docsUrl: toStorybook('layout-footer-footerlogo'),
  },
  {
    name: 'Side navigation',
    description: 'Navigation between the pages of a section.',
    selectors: ['gi-side-nav'],
    docsUrl: toDocs('side-nav'),
  },
  {
    name: 'Side nav item',
    description: 'A list item of the side navigation.',
    selectors: ['li[giSideNavItem]'],
    docsUrl: toDocs('side-nav'),
  },
  {
    name: 'Side nav link',
    description: 'A side navigation link that marks the current page.',
    selectors: ['a[giSideNavLink]'],
    docsUrl: toDocs('side-nav'),
  },
  {
    name: 'Breadcrumbs',
    description: 'Shows where the page sits in the site and links back up the hierarchy.',
    selectors: ['gi-breadcrumbs'],
    docsUrl: toStorybook('navigation-breadcrumbs-breadcrumbs'),
  },
  {
    name: 'Breadcrumb item',
    description: 'A step of the breadcrumb trail.',
    selectors: ['li[giBreadcrumbItem]'],
    docsUrl: toStorybook('navigation-breadcrumbs-breadcrumbitem'),
  },
  {
    name: 'Breadcrumb link',
    description: 'A link to a parent page, or the current page when marked as current.',
    selectors: ['gi-breadcrumb-item-link', 'a[giBreadcrumbLink]'],
    docsUrl: toStorybook('navigation-breadcrumbs-breadcrumbitemlink'),
  },
  {
    name: 'Breadcrumb ellipsis',
    description: 'Stands in for the collapsed middle of a long breadcrumb trail.',
    selectors: ['gi-breadcrumb-item-ellipsis'],
    docsUrl: toStorybook('navigation-breadcrumbs-breadcrumbitemellipsis'),
  },
  {
    name: 'Pagination',
    description: 'Moves between the pages of a long list of results.',
    selectors: ['gi-pagination'],
    docsUrl: toStorybook('navigation-pagination-pagination'),
  },
  {
    name: 'Pagination item',
    description: 'A list item of the pagination.',
    selectors: ['li[giPaginationItem]'],
    docsUrl: toStorybook('navigation-pagination-pagination'),
  },
  {
    name: 'Pagination link',
    description: 'A link to another page of results.',
    selectors: ['gi-pagination-item-link', 'a[giPaginationLink]'],
    docsUrl: toStorybook('navigation-pagination-paginationitemlink'),
  },
  {
    name: 'Pagination button',
    description: 'A button that moves to another page of results without a URL change.',
    selectors: ['gi-pagination-item-button', 'button[giPaginationButton]'],
    docsUrl: toStorybook('navigation-pagination-paginationitembutton'),
  },
  {
    name: 'Pagination ellipsis',
    description: 'Stands in for the pages skipped in a long range.',
    selectors: ['gi-pagination-item-ellipsis'],
    docsUrl: toStorybook('navigation-pagination-paginationitemellipsis'),
  },
  {
    name: 'Button',
    description: 'Primary and secondary actions.',
    selectors: ['gi-button', 'button[giButton]'],
    docsUrl: toStorybook('components-button'),
  },
  {
    name: 'Link',
    description: 'An inline or standalone text link.',
    selectors: ['gi-link', 'a[giLink]'],
    docsUrl: toStorybook('navigation-link'),
  },
  {
    name: 'Link button',
    description: 'A link styled as a button, for navigation that reads as an action.',
    selectors: ['gi-link-button', 'a[giButton]'],
    docsUrl: toStorybook('navigation-linkbutton'),
  },
  {
    name: 'Icon button',
    description: 'A compact action shown as an icon.',
    selectors: ['gi-icon-button', 'button[giIconButton]'],
    docsUrl: toStorybook('components-iconbutton'),
  },
  {
    name: 'Heading',
    description: 'Page and section headings on the type scale.',
    selectors: [
      'gi-h1',
      'gi-h2',
      'gi-h3',
      'gi-h4',
      'gi-h5',
      'gi-h6',
      'h1[giHeading]',
      'h2[giHeading]',
      'h3[giHeading]',
      'h4[giHeading]',
      'h5[giHeading]',
      'h6[giHeading]',
    ],
    docsUrl: toStorybook('typography-heading'),
  },
  {
    name: 'Paragraph',
    description: 'Body text with the standard size and spacing.',
    selectors: ['gi-paragraph', 'p[giParagraph]'],
    docsUrl: toStorybook('typography-paragraph'),
  },
  {
    name: 'Text',
    description: 'Inline or block text with typography presets.',
    selectors: ['gi-text', 'span[giText]'],
    docsUrl: toStorybook('typography-text'),
  },
  {
    name: 'Divider',
    description: 'Separates groups of content.',
    selectors: ['gi-divider', 'hr[giDivider]'],
    docsUrl: toStorybook('layout-divider'),
  },
  {
    name: 'Inset text',
    description: 'Highlights a piece of content the reader should notice.',
    selectors: ['gi-inset-text', 'blockquote[giInsetText]'],
    docsUrl: toStorybook('typography-insettext'),
  },
  {
    name: 'Container',
    description: 'Centres the content and limits its width.',
    selectors: ['gi-container', '[giContainer]'],
    docsUrl: toStorybook('layout-container'),
    kind: 'layout',
  },
  {
    name: 'Grid',
    description: 'Responsive column layout.',
    selectors: ['gi-grid', '[giGrid]'],
    docsUrl: toStorybook('layout-grid'),
    kind: 'layout',
  },
];

export const ANGULAR_SKIPPED_TAGS = ['gi-header-section', 'gi-footer-section', 'gi-stack', 'gi-box'];

/** A docs page of the Angular Storybook, which is only deployed to the development environment. */
function toStorybook(id: string): string {
  return `https://ds.dev.services.gov.ie/storybook-angular/?path=/docs/${id}--docs`;
}
