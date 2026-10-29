import type { StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/HeaderNavItem.meta';
import { SearchIcon } from '@/icons';
import { GiHeaderNav } from '@/header/HeaderNav';
import { GiHeaderNavItemDirective } from '@/header/HeaderNavItem';
import { GiHeaderNavButtonDirective } from '@/header/HeaderNavItemButton';
import { GiHeaderSection } from '@/header/HeaderSection';

const meta = {
  ...stories.meta,
  title: 'Layout/Header/HeaderNavItem',
  component: GiHeaderNavItemDirective,
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        component:
          'Marks an `li` you own as a header nav item: `li[giHeaderNavItem]` controls responsive visibility and holds an `a[giHeaderNavLink]` or a `button[giHeaderNavButton]`. The `gi-header-nav-item-link` and `gi-header-nav-item-button` components render this `li` themselves.',
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderSection, GiHeaderNav, GiHeaderNavItemDirective, GiHeaderNavButtonDirective, SearchIcon],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <li giHeaderNavItem [visible]="visible" [class]="className">
            <button giHeaderNavButton type="button">
              {{ children }}
              <gi-search-icon />
            </button>
          </li>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};
