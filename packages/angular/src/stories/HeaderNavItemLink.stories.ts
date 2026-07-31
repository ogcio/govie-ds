import type { StoryObj } from '@storybook/angular';
import { headerNavItemLinkMeta, Default as defaultStory } from '@/atoms/storybook/HeaderNavItemLink.meta';
import { HeaderNav, HeaderNavItemLink, HeaderSection } from '@/atoms';

const meta = {
  ...headerNavItemLinkMeta,
  title: 'Layout/Header/HeaderNavItemLink',
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
        <gi-header-nav ariaLabel="Primary navigation">
          <gi-header-nav-item-link
            [href]="href"
            [id]="id"
            [dataTestId]="dataTestId"
            [visible]="visible"
            [appearance]="appearance"
            [external]="external"
            [ariaLabel]="ariaLabel"
            [ariaCurrent]="ariaCurrent"
          >
            {{ children }}
          </gi-header-nav-item-link>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};
