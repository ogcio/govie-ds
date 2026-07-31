import pick from 'lodash/pick';
import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import { Size } from '../constants';
import { boxMeta } from './Box.meta';
import { checker, enumType } from './utilities';

export const headerNavItemMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Header/HeaderNavItem',
  args: {
    children: 'Search',
    id: 'header-nav-item-id',
    dataTestId: 'header-nav-item',
  },
  argTypes: {
    ...pick(boxMeta.argTypes, ['className', 'id', 'dataTestId', 'styles', 'children']),
    visible: {
      ...enumType(Size, {
        description:
          'Visibility: `true`/`false`, a breakpoint to show from (e.g. `"lg"`), or a per-breakpoint map like `{ base: false, lg: true }`.',
      }),
      control: 'select',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the button. Maps to `aria-label`.',
      table: { type: { summary: 'string' } },
    },
    ariaExpanded: {
      control: 'boolean',
      description: 'Indicates whether a related panel is expanded. Maps to `aria-expanded`.',
      table: { type: { summary: 'boolean' } },
    },
    ariaControls: {
      control: { disable: true },
      description: 'ID of the element controlled by this button. Maps to `aria-controls`.',
      table: { type: { summary: 'string' } },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the button.',
      table: { type: { summary: '(event) => void' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Button-style navigation item for header menus. Use for actions that open panels or drawers rather than navigating to a URL.',
      },
    },
  },
};

export const Default = {
  args: headerNavItemMeta.args,
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('button');
    await check.attributes({ id: args.id });
    await check.children();
  },
};
