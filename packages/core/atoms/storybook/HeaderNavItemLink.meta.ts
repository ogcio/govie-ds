import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import { Size } from '../constants';
import { linkMeta } from './Link.meta';
import { checker, enumType } from './utilities';

export const headerNavItemLinkMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Header/HeaderNavItemLink',
  args: {
    children: 'Departments',
    visible: undefined,
    id: 'header-nav-item-link-id',
    href: '#',
    className: undefined,
    external: undefined,
    target: undefined,
    rel: undefined,
    download: undefined,
    ariaCurrent: undefined,
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    ariaDescribedBy: undefined,
    ariaHidden: undefined,
    tabIndex: undefined,
    lang: undefined,
    styles: undefined,
    dataTestId: 'header-nav-item-link',
    onClick: undefined,
    onKeyDown: undefined,
    onKeyUp: undefined,
  },
  argTypes: {
    visible: {
      ...enumType(Size, {
        description:
          'Visibility: `true`/`false`, a breakpoint to show from (e.g. `"lg"`), or a per-breakpoint map like `{ base: false, lg: true }`.',
      }),
      control: 'select' as const,
    },
    id: linkMeta.argTypes.id,
    href: linkMeta.argTypes.href,
    className: linkMeta.argTypes.className,
    external: linkMeta.argTypes.external,
    target: linkMeta.argTypes.target,
    rel: linkMeta.argTypes.rel,
    download: linkMeta.argTypes.download,
    ariaCurrent: linkMeta.argTypes.ariaCurrent,
    ariaLabel: linkMeta.argTypes.ariaLabel,
    ariaLabelledBy: linkMeta.argTypes.ariaLabelledBy,
    ariaDescribedBy: linkMeta.argTypes.ariaDescribedBy,
    ariaHidden: linkMeta.argTypes.ariaHidden,
    tabIndex: linkMeta.argTypes.tabIndex,
    lang: linkMeta.argTypes.lang,
    styles: linkMeta.argTypes.styles,
    dataTestId: linkMeta.argTypes.dataTestId,
    onClick: {
      action: 'clicked',
      description: 'Click handler for the link.',
      table: { type: { summary: '(event) => void' } },
    },
    onKeyDown: {
      action: 'keydown',
      description: 'Key down handler for the link.',
      table: { type: { summary: '(event) => void' } },
    },
    onKeyUp: {
      action: 'keyup',
      description: 'Key up handler for the link.',
      table: { type: { summary: '(event) => void' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Link-style navigation item for header menus. Renders an anchor in a list item with header-specific styling and visibility controls.',
      },
    },
  },
};

export const Default = {
  args: headerNavItemLinkMeta.args,
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('a');
    await check.attributes({ id: args.id, href: args.href });
    await check.children();
  },
};
