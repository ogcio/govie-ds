import type { StoryObj } from '@storybook/angular';
import { headerNavMeta, Default as defaultStory } from '@/atoms/storybook/HeaderNav.meta';
import { HeaderNav, HeaderNavItemLink, HeaderSection } from '@/atoms';

const meta = {
  ...headerNavMeta,
  title: 'Layout/Header/HeaderNav',
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [HeaderNav, HeaderNavItemLink, HeaderSection],
    },
    template: `
      <gi-header-section>
        <gi-header-nav
          [ariaLabel]="ariaLabel"
          [id]="id"
          [dataTestId]="dataTestId"
        >
          <gi-header-nav-item-link href="#">Departments</gi-header-nav-item-link>
          <gi-header-nav-item-link href="#">Services</gi-header-nav-item-link>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};
