import type { ArgTypes } from 'storybook/internal/types';
import type { Props } from '../breadcrumbs/BreadcrumbEllipsis.lite';

export const breadcrumbEllipsisMeta = {
  title: 'Navigation/Breadcrumbs',
  args: {
    id: 'ellipsis-example',
  },
  argTypes: {
    className: {
      control: { disable: true },
      description: 'CSS classes to apply. Use `gi-*` Tailwind utilities for spacing, backgrounds, sizing, etc.',
      table: { type: { summary: 'string' } },
    },
    color: {
      description: 'Controls the colour of the ellipsis. Defaults to `currentColor`',
      table: { type: { summary: 'string' } },
    },
    size: {
      description: 'Controls the size of the ellipsis icon. Defaults to `24px`.',
      table: { type: { summary: 'string' } },
    },
    id: {
      control: { disable: true },
      description: 'Optional id for linking/targeting and aria references.',
      table: { type: { summary: 'string' } },
    },
    dataTestId: {
      control: { disable: true },
      description: 'Test id for targeting the element in automated tests.',
      table: { type: { summary: 'string' } },
    },
  } satisfies ArgTypes<Props>,
  parameters: {
    docs: {
      description: {
        component:
          '`BreadcrumbEllipsis` stands in for omitted intermediate levels when a breadcrumb trail is too long to show in full. Nest it inside `Breadcrumbs` in place of the hidden `BreadcrumbLink`s, typically between the root page (for example Home) and the remaining visible levels nearest the current page. It is decorative only - collapse the path by not rendering those links - and is hidden from assistive technologies.',
      },
    },
  },
};

export const Default = {
  args: {
    ...breadcrumbEllipsisMeta.args,
  },
};
