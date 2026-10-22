import type { StoryObj } from '@storybook/angular-vite';
import { headerNavMeta, Default as defaultStory } from '@/atoms/storybook/HeaderNav.meta';
import { GiHeaderNav } from '@/header/HeaderNav';
import { GiHeaderNavItem } from '@/header/HeaderNavItem';
import { GiHeaderNavItemLink } from '@/header/HeaderNavItemLink';
import { GiHeaderSection } from '@/header/HeaderSection';

const meta = {
  ...headerNavMeta,
  title: 'Layout/Header/HeaderNav',
  component: GiHeaderNav,
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderNav, GiHeaderNavItem, GiHeaderNavItemLink, GiHeaderSection],
    },
    template: `
      <gi-header-section>
        <gi-header-nav
          [ariaLabel]="ariaLabel"
          [id]="id"
          [dataTestId]="dataTestId"
        >
          <gi-header-nav-item>
            <gi-header-nav-item-link href="#">Departments</gi-header-nav-item-link>
          </gi-header-nav-item>
          <gi-header-nav-item>
            <gi-header-nav-item-link href="#">Services</gi-header-nav-item-link>
          </gi-header-nav-item>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};
