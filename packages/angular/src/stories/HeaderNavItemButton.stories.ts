import type { StoryObj } from '@storybook/angular-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import * as itemStories from '@/atoms/storybook/HeaderNavItem.meta';
import * as stories from '@/atoms/storybook/HeaderNavItemButton.meta';
import { SearchIcon } from '@/icons';
import { GiHeaderNav } from '@/header/HeaderNav';
import { GiHeaderNavItemDirective } from '@/header/HeaderNavItem';
import { GiHeaderNavItemButton, GiHeaderNavButtonDirective } from '@/header/HeaderNavItemButton';
import { GiHeaderSection } from '@/header/HeaderSection';

const meta = {
  ...stories.meta,
  argTypes: {
    ...stories.meta.argTypes,
    visible: itemStories.meta.argTypes.visible,
  },
  title: 'Layout/Header/HeaderNavItemButton',
  component: GiHeaderNavItemButton,
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderNav, GiHeaderNavItemButton, GiHeaderSection, SearchIcon],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <gi-header-nav-item-button
            [visible]="visible"
            [id]="id"
            [dataTestId]="dataTestId"
            [class]="className"
            [ariaLabel]="ariaLabel"
            [ariaExpanded]="ariaExpanded"
            [ariaControls]="ariaControls"
            (click)="onClick?.($event)"
          >
            {{ children }}
            <gi-search-icon />
          </gi-header-nav-item-button>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};

export const Directive: StoryObj = {
  tags: ['skip-playwright'],
  args: { onClick: fn(), visible: true },
  parameters: {
    controls: { include: ['visible'] },
    docs: {
      description: {
        story:
          'Builds a nav entry from your own elements: `li[giHeaderNavItem]` renders the list item and takes the `visible` input, and `button[giHeaderNavButton]` styles the button inside it, which keeps its native `(click)` and attributes. `visible` accepts `true`/`false`, a breakpoint to show from (e.g. `"md"`), or a per-breakpoint map like `{ base: false, lg: true }`.',
      },
    },
  },
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderSection, GiHeaderNav, GiHeaderNavItemDirective, GiHeaderNavButtonDirective, SearchIcon],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <li giHeaderNavItem [visible]="visible">
            <button giHeaderNavButton type="button" aria-expanded="false" (click)="onClick($event)">
              Search <gi-search-icon />
            </button>
          </li>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
