import type { StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/HeaderNavItem.meta';
import { SearchIcon } from '@/icons';
import { GiHeaderNav } from '@/header/HeaderNav';
import { GiHeaderNavItem } from '@/header/HeaderNavItem';
import { GiHeaderNavItemButton } from '@/header/HeaderNavItemButton';
import { GiHeaderSection } from '@/header/HeaderSection';

const meta = {
  ...stories.meta,
  title: 'Layout/Header/HeaderNavItem',
  component: GiHeaderNavItem,
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
          <gi-header-nav-item [visible]="visible" [class]="className">
            <gi-header-nav-item-button>
              {{ children }}
              <gi-search-icon />
            </gi-header-nav-item-button>
          </gi-header-nav-item>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};
