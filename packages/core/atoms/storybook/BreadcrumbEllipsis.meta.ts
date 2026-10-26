import { boxMeta } from './Box.meta';
import type { Props } from '../breadcrumbs/BreadcrumbEllipsis.lite';
import type { Meta, Story } from './types';
import { iconsMeta } from './Icons.meta';

export const meta = {
  title: 'Navigation/Breadcrumbs/BreadcrumbEllipsis',
  args: {
    id: 'ellipsis-example',
  },
  argTypes: {
    id: boxMeta.argTypes.id,
    color: iconsMeta.argTypes.color,
    size: iconsMeta.argTypes.size,
    dataTestId: boxMeta.argTypes.dataTestId,
    label: iconsMeta.argTypes.label,
  },
  parameters: {
    docs: {
      description: {
        component:
          '`BreadcrumbEllipsis` stands in for omitted intermediate levels when a breadcrumb trail is too long to show in full. Nest it inside `Breadcrumbs` in place of the hidden `BreadcrumbLink`s, typically between the root page (for example Home) and the remaining visible levels nearest the current page. Collapse the path by not rendering those links. Without a `label` it is decorative and should be hidden from assistive technologies; provide a `label` if it needs to be announced.',
      },
    },
  },
} satisfies Meta<Props>;

export const Default = {} satisfies Story<Props>;
