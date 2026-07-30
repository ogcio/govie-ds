import type { StoryObj } from '@storybook/angular';
import { headerNavItemMeta, Default as defaultStory } from '@/atoms/storybook/HeaderNavItem.meta';
import { HeaderNav, HeaderNavItem, HeaderSection, SearchIcon } from '@/atoms';

const meta = {
  ...headerNavItemMeta,
  title: 'Layout/Header/HeaderNavItem',
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [HeaderNav, HeaderNavItem, HeaderSection, SearchIcon],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <gi-header-nav-item
            [id]="id"
            [dataTestId]="dataTestId"
            [visible]="visible"
            [ariaLabel]="ariaLabel"
            [ariaExpanded]="ariaExpanded"
            [ariaControls]="ariaControls"
            (click)="onClick && this.onClick.emit($event)"
          >
            {{ children }}
            <gi-search-icon></gi-search-icon>
          </gi-header-nav-item>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};
