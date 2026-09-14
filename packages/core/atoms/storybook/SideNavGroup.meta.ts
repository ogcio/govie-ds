import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import type { Props } from '../sidenav/SideNavGroup.lite';
import { boxMeta } from './Box.meta';
import { linkMeta } from './Link.meta';
import { sideNavItemMeta } from './SideNavItem.meta';
import { checker } from './utilities';

export const sideNavGroupMeta = {
  tags: ['autodocs'] as string[],
  title: 'Navigation/SideNav/SideNavGroup',
  args: {
    label: 'Inbox',
    open: false,
    selected: false,
    disabled: false,
    id: 'side-nav-group-id',
    dataTestId: 'side-nav-group',
  },
  argTypes: {
    children: {
      control: { disable: true },
      description: 'Nested `SideNavItem` or `SideNavItemLink` elements shown when the group is open.',
      table: { type: { summary: 'ReactNode' } },
    },
    label: {
      control: 'text',
      description: 'Content of the expandable group header button.',
      table: { type: { summary: 'ReactNode' } },
    },
    open: {
      control: 'boolean',
      description: 'Whether nested items are visible. The group is fully controlled — the parent owns this state.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    selected: sideNavItemMeta.argTypes.selected,
    disabled: {
      control: 'boolean',
      description: 'Disables the group header button and prevents toggling.',
      table: { type: { summary: 'boolean' } },
    },
    actions: {
      control: { disable: true },
      description: 'Trailing action slot rendered beside the group header (for example an IconButton).',
      table: { type: { summary: 'ReactNode' } },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the group header. Use this to toggle `open`.',
      table: { type: { summary: '(event) => void' } },
    },
    className: boxMeta.argTypes.className,
    id: boxMeta.argTypes.id,
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the group header button. Maps to `aria-label`.',
      table: { type: { summary: 'string' } },
    },
    ariaCurrent: linkMeta.argTypes.ariaCurrent,
    ariaHidden: {
      control: { disable: true },
      description: 'Hides the list item from assistive technology. Maps to `aria-hidden` on the wrapping `<li>`.',
      table: { type: { summary: 'boolean' } },
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
          'Expandable section within a SideNav. Renders a disclosure header with a chevron and a nested list of `SideNavItem` or `SideNavItemLink` children. Open state is fully controlled through `open` and `onClick`.',
      },
    },
  },
};

export const Default = {
  args: sideNavGroupMeta.args,
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('button');
    await check.attributes({ id: args.id });
    await check.children();
    await step('nested items are hidden when closed', async () => {
      expect(canvas.getByText('Primary')).not.toBeVisible();
      expect(canvas.getByText('Social')).not.toBeVisible();
    });
  },
};

export const Open = {
  args: {
    ...sideNavGroupMeta.args,
    open: true,
    dataTestId: 'side-nav-group-open',
    id: 'side-nav-group-open-id',
  },
  parameters: {
    docs: {
      description: {
        story: 'Open disclosure state. Nested items are visible and the chevron points up.',
      },
    },
  },
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('button');
    await step('nested items are visible when open', async () => {
      expect(canvas.getByText('Primary')).toBeVisible();
      expect(canvas.getByText('Social')).toBeVisible();
    });
  },
};
