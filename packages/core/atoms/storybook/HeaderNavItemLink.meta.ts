import pick from 'lodash/pick';
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
    href: '#',
    id: 'header-nav-item-link-id',
    dataTestId: 'header-nav-item-link',
  },
  argTypes: {
    ...pick(linkMeta.argTypes, [
      'children',
      'href',
      'external',
      'target',
      'rel',
      'ariaLabel',
      'ariaCurrent',
      'appearance',
      'visited',
      'underline',
      'variant',
      'className',
      'id',
      'dataTestId',
      'styles',
    ]),
    visible: {
      ...enumType(Size, {
        description:
          'Visibility: `true`/`false`, a breakpoint to show from (e.g. `"lg"`), or a per-breakpoint map like `{ base: false, lg: true }`.',
      }),
      control: 'select' as const,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Link-style navigation item for header menus. Wraps the Link atom in a list item with header-specific styling and visibility controls.',
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
