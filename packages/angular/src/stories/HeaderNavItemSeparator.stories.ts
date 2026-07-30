import type { StoryObj } from '@storybook/angular';
import { headerNavItemSeparatorMeta, Default as defaultStory } from '@/atoms/storybook/HeaderNavItemSeparator.meta';
import { HeaderNav, HeaderNavItemLink, HeaderNavItemSeparator, HeaderSection } from '@/atoms';

const meta = {
  ...headerNavItemSeparatorMeta,
  title: 'Layout/Header/HeaderNavItemSeparator',
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [HeaderNav, HeaderNavItemLink, HeaderNavItemSeparator, HeaderSection],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <gi-header-nav-item-link href="#">Departments</gi-header-nav-item-link>
          <gi-header-nav-item-separator
            [id]="id"
            [dataTestId]="dataTestId"
            [visible]="visible"
          ></gi-header-nav-item-separator>
          <gi-header-nav-item-link href="#">Services</gi-header-nav-item-link>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};

export const Light: StoryObj = {
  ...defaultStory,
  args: {
    ...defaultStory.args,
    id: 'header-nav-item-separator-light-id',
    dataTestId: 'header-nav-item-separator-light',
  },
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [HeaderNav, HeaderNavItemLink, HeaderNavItemSeparator, HeaderSection],
    },
    template: `
      <gi-header-section appearance="light">
        <gi-header-nav ariaLabel="Primary navigation">
          <gi-header-nav-item-link href="#">Departments</gi-header-nav-item-link>
          <gi-header-nav-item-separator
            [id]="id"
            [dataTestId]="dataTestId"
            [visible]="visible"
          ></gi-header-nav-item-separator>
          <gi-header-nav-item-link href="#">Services</gi-header-nav-item-link>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};
