import { boxMeta } from './Box.meta';
import type { Props } from '../breadcrumbs/BreadcrumbEllipsis.lite';
import type { Meta, Story } from './types';

export const meta = {
  title: 'Navigation/Breadcrumbs/BreadcrumbEllipsis',
  args: {
    id: 'ellipsis-example',
  },
  argTypes: {
    id: boxMeta.argTypes.id,
    className: boxMeta.argTypes.className,
    styles: {
      control: { disable: true },
      description:
        'Inline styles applied directly to the <li> element. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'Record<string, string>' } },
    },
    color: {
      description: 'Controls the colour of the ellipsis. Defaults to `currentColor`',
      table: { type: { summary: 'string' } },
    },
    size: {
      description: 'Controls the size of the ellipsis icon. Defaults to `24px`.',
      table: { type: { summary: 'string' } },
    },
    dataTestId: boxMeta.argTypes.dataTestId,
  },
  parameters: {
    docs: {
      description: {
        component:
          '`BreadcrumbEllipsis` stands in for omitted intermediate levels when a breadcrumb trail is too long to show in full. Nest it inside `Breadcrumbs` in place of the hidden `BreadcrumbLink`s, typically between the root page (for example Home) and the remaining visible levels nearest the current page. It is decorative only - collapse the path by not rendering those links - and is hidden from assistive technologies.',
      },
    },
  },
} satisfies Meta<Props>;

export const Default = {} satisfies Story<Props>;
