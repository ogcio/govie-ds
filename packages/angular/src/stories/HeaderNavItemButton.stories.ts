import type { StoryObj } from '@storybook/angular-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import * as stories from '@/atoms/storybook/HeaderNavItemButton.meta';
import { SearchIcon } from '@/icons';
import { GiHeaderNav } from '@/header/HeaderNav';
import { GiHeaderNavItem, GiHeaderNavItemDirective } from '@/header/HeaderNavItem';
import { GiHeaderNavItemButton, GiHeaderNavItemButtonDirective } from '@/header/HeaderNavItemButton';
import { GiHeaderSection } from '@/header/HeaderSection';

const meta = {
  ...stories.meta,
  title: 'Layout/Header/HeaderNavItemButton',
  component: GiHeaderNavItemButton,
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderNav, GiHeaderNavItem, GiHeaderNavItemButton, GiHeaderSection, SearchIcon],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <gi-header-nav-item>
            <gi-header-nav-item-button
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
          </gi-header-nav-item>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};

export const Directive: StoryObj = {
  args: { onClick: fn() },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Adds the header nav item styling to a plain `button` inside an `li` marked with `giHeaderNavItem`, so the button keeps its native `(click)` and attributes.',
      },
    },
  },
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderSection, GiHeaderNav, GiHeaderNavItemDirective, GiHeaderNavItemButtonDirective, SearchIcon],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <li giHeaderNavItem>
            <button giHeaderNavItemButton type="button" aria-expanded="false" (click)="onClick($event)">
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
