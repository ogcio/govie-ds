import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import type { Props } from '../sidenav/SideNavItem.lite';
import { boxMeta } from './Box.meta';
import { linkMeta } from './Link.meta';
import { checker } from './utilities';

export const sideNavItemMeta = {
  tags: ['autodocs'] as string[],
  title: 'Navigation/SideNav/SideNavItem',
  args: {
    children: 'Overview',
    selected: false,
    disabled: false,
    id: 'side-nav-item-id',
    dataTestId: 'side-nav-item',
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Marks the item as the current selection. Applies the selected accent treatment.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the item button and prevents interaction.',
      table: { type: { summary: 'boolean' } },
    },
    actions: {
      control: { disable: true },
      description: 'Trailing action slot rendered beside the item (for example an IconButton).',
      table: { type: { summary: 'ReactNode' } },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the item button.',
      table: { type: { summary: '(event) => void' } },
    },
    className: boxMeta.argTypes.className,
    styles: boxMeta.argTypes.styles,
    id: boxMeta.argTypes.id,
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the item button. Maps to `aria-label`.',
      table: { type: { summary: 'string' } },
    },
    ariaCurrent: linkMeta.argTypes.ariaCurrent,
    ariaHidden: {
      control: { disable: true },
      description: 'Hides the list item from assistive technology. Maps to `aria-hidden` on the wrapping `<li>`.',
      table: { type: { summary: "boolean | 'true' | 'false'" } },
    },
    ariaControls: {
      control: { disable: true },
      description: 'ID of the element controlled by this button. Maps to `aria-controls`.',
      table: { type: { summary: 'string' } },
    },
    tabIndex: {
      control: { disable: true },
      description: 'Overrides the default tab order. Automatically set to `-1` when `ariaHidden` is true.',
      table: { type: { summary: 'number' } },
    },
    dataTestId: boxMeta.argTypes.dataTestId,
  } satisfies ArgTypes<Props>,
  parameters: {
    docs: {
      description: {
        component:
          'Button-style navigation item for SideNav. Use for destinations that select in place rather than navigating to a URL. Nest inside `SideNav` or `SideNavGroup`.',
      },
    },
  },
};

export const Default = {
  args: sideNavItemMeta.args,
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('button');
    await check.attributes({ id: args.id });
    await check.children();
  },
};

export const Selected = {
  args: {
    ...sideNavItemMeta.args,
    selected: true,
    ariaCurrent: 'page' as const,
    dataTestId: 'side-nav-item-selected',
    id: 'side-nav-item-selected-id',
  },
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('button');
    await check.attributes({ 'aria-current': 'page' });
    await check.children();
  },
};
