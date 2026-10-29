import type { StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/HeaderNavItemSeparator.meta';
import { GiHeaderNav } from '@/header/HeaderNav';
import { GiHeaderNavItemLink } from '@/header/HeaderNavItemLink';
import { GiHeaderNavItemSeparator } from '@/header/HeaderNavItemSeparator';
import { GiHeaderSection } from '@/header/HeaderSection';

const meta = {
  ...stories.meta,
  title: 'Layout/Header/HeaderNavItemSeparator',
  component: GiHeaderNavItemSeparator,
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderNav, GiHeaderNavItemLink, GiHeaderNavItemSeparator, GiHeaderSection],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <gi-header-nav-item-link href="#">Departments</gi-header-nav-item-link>
          <gi-header-nav-item-separator
            [id]="id"
            [dataTestId]="dataTestId"
            [visible]="visible"
          />
          <gi-header-nav-item-link href="#">Services</gi-header-nav-item-link>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};

export const Light: StoryObj = {
  ...stories.Default,
  args: {
    id: 'header-nav-item-separator-light-id',
    dataTestId: 'header-nav-item-separator-light',
  },
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderNav, GiHeaderNavItemLink, GiHeaderNavItemSeparator, GiHeaderSection],
    },
    template: `
      <gi-header-section appearance="light">
        <gi-header-nav ariaLabel="Primary navigation">
          <gi-header-nav-item-link href="#">Departments</gi-header-nav-item-link>
          <gi-header-nav-item-separator
            [id]="id"
            [dataTestId]="dataTestId"
            [visible]="visible"
          />
          <gi-header-nav-item-link href="#">Services</gi-header-nav-item-link>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};
