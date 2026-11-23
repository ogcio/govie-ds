import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import type { Props } from '../sidenav/SideNavItemLink.lite';
import argTypes from './argTypes';
import { linkMeta } from './Link.meta';
import { checker } from './utilities';
import { sideNavItemButtonMeta } from './SideNavItemButton.meta';
import type { Meta, Story } from './types';

export const sideNavItemLinkMeta = {
  title: 'Navigation/SideNav/SideNavItemLink',
  args: {
    href: '#',
    selected: false,
    id: 'side-nav-item-link-id',
    dataTestId: 'side-nav-item-link',
  },
  argTypes: {
    selected: sideNavItemButtonMeta.argTypes.selected,
    id: argTypes.id,
    href: linkMeta.argTypes.href,
    external: linkMeta.argTypes.external,
    target: linkMeta.argTypes.target,
    rel: linkMeta.argTypes.rel,
    download: linkMeta.argTypes.download,
    ariaCurrent: sideNavItemButtonMeta.argTypes.ariaCurrent,
    ariaLabel: linkMeta.argTypes.ariaLabel,
    ariaLabelledBy: linkMeta.argTypes.ariaLabelledBy,
    ariaDescribedBy: linkMeta.argTypes.ariaDescribedBy,
    ariaHidden: {
      ...linkMeta.argTypes.ariaHidden,
      description:
        'Hides the item from assistive technology. Maps to `aria-hidden` on the link and its list item. Use only for duplicate or decorative links that are not the primary interactive path.',
      table: { type: { summary: "boolean | 'true' | 'false'" } },
    },
    tabIndex: linkMeta.argTypes.tabIndex,
    lang: linkMeta.argTypes.lang,
    dataTestId: linkMeta.argTypes.dataTestId,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Link-style item for the side navigation. Use for destinations that navigate to a URL. Place it directly in the side navigation or inside a group.',
      },
    },
  },
} satisfies Meta<Props>;

export const Default = {
  args: sideNavItemLinkMeta.args,
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('a');
    await check.attributes({ id: args.id, href: args.href });
    await check.children();
  },
} satisfies Story<Props>;
