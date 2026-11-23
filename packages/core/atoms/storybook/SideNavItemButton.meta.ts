import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import type { Props } from '../sidenav/SideNavItemButton.lite';
import { boxMeta } from './Box.meta';
import { checker } from './utilities';
import { meta as buttonMeta } from './Button.meta';
import type { Meta, Story } from './types';
import argTypes from './argTypes';

export const sideNavItemButtonMeta = {
  title: 'Navigation/SideNav/SideNavItemButton',
  args: {
    selected: false,
    disabled: false,
    id: 'side-nav-item-id',
    dataTestId: 'side-nav-item',
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description:
        'Shows the item as selected, with an accent bar on the left and a selected background. This is visual only: assistive technologies are not told the item is current. To mark the page the user is on, set `ariaCurrent` to `"page"` instead, which applies the same style and announces the item as the current page.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: buttonMeta.argTypes.disabled,
    id: argTypes.id,
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the item button. Maps to `aria-label`.',
      table: { type: { summary: 'string' } },
    },
    ariaCurrent: {
      control: false,
      description:
        'Marks the item as current for ARIA purposes. Maps to `aria-current`. When set to `"page"`, applies an accent bar on the left and a selected background to visually distinguish the active item.',
      table: {
        type: { summary: "'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean" },
        defaultValue: { summary: 'undefined' },
      },
    },
    ariaHidden: {
      control: { disable: true },
      description: 'Hides the item from assistive technology. Maps to `aria-hidden` on the button and its list item.',
      table: { type: { summary: "boolean | 'true' | 'false'" } },
    },
    tabIndex: {
      control: { disable: true },
      description: 'Overrides the default tab order. Automatically set to `-1` when `ariaHidden` is true.',
      table: { type: { summary: 'number' } },
    },
    dataTestId: boxMeta.argTypes.dataTestId,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Button-style item for the side navigation. Use for destinations that select in place rather than navigating to a URL. Place it directly in the side navigation or inside a group.',
      },
    },
  },
} satisfies Meta<Props>;

export const Default = {
  args: sideNavItemButtonMeta.args,
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('button');
    await check.attributes({ id: args.id });
    await check.children();
  },
} satisfies Story<Props>;

export const Selected = {
  args: {
    ...sideNavItemButtonMeta.args,
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
} satisfies Story<Props>;
