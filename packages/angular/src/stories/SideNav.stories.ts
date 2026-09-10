import type { StoryObj } from '@storybook/angular';
import * as stories from '@/atoms/storybook/SideNav.meta';
import Box from '@/atoms/Box';
import { IconButton, MailIcon, MoreVerticalIcon } from '@/atoms';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavHeading from '@/atoms/sidenav/SideNavHeading';
import SideNavItem from '@/atoms/sidenav/SideNavItem';
import SideNavItemLink from '@/atoms/sidenav/SideNavItemLink';
import SideNavGroup from '@/atoms/sidenav/SideNavGroup';

const meta = {
  ...stories.sideNavMeta,
  title: 'Navigation/SideNav',
};

export default meta;
type Story = StoryObj;

const sideNavImports = [
  SideNav,
  SideNavHeading,
  SideNavItem,
  SideNavItemLink,
  SideNavGroup,
  Box,
  MailIcon,
  IconButton,
  MoreVerticalIcon,
];

type SideNavStoryState = {
  current: string;
  inboxOpen: boolean;
};

export const Default: Story = {
  ...stories.Default,
  tags: ['!dev', '!autodocs'], // exclude story until Storybook examples complete
  render: (props) => ({
    props: {
      ...props,
      current: 'overview',
      inboxOpen: true,
      selectItem(this: SideNavStoryState, value: string) {
        this.current = value;
      },
      toggleInbox(this: SideNavStoryState) {
        this.inboxOpen = !this.inboxOpen;
        this.current = 'inbox';
      },
    },
    moduleMetadata: {
      imports: sideNavImports,
    },
    template: `
      <gi-side-nav [dataTestId]="dataTestId">
        <gi-side-nav-heading>Messages</gi-side-nav-heading>
        <gi-side-nav-group
          [open]="inboxOpen"
          (onClick)="toggleInbox()"
          [selected]="current === 'inbox'"
          [ariaCurrent]="current === 'inbox' ? 'page' : 'false'"
        >
          <gi-box ngProjectAs="[label]" className="gi-flex gi-w-full gi-justify-between">
            <gi-box className="gi-flex gi-gap-1">
              <gi-mail-icon></gi-mail-icon>
              Inbox
            </gi-box>
            <strong class="gi-tag gi-tag-counter gi-tag-size-default">3</strong>
          </gi-box>
          <gi-icon-button ngProjectAs="[actions]" variant="flat" appearance="dark" size="sm" ariaLabel="More actions">
            <gi-more-vertical-icon></gi-more-vertical-icon>
          </gi-icon-button>
          <gi-side-nav-item
            [selected]="current === 'primary'"
            (onClick)="selectItem('primary')"
          >
            Primary
          </gi-side-nav-item>
          <gi-side-nav-item
            [selected]="current === 'social'"
            (onClick)="selectItem('social')"
          >
            Social
          </gi-side-nav-item>
          <gi-side-nav-item
            [selected]="current === 'promotions'"
            [disabled]="true"
          >
            Promotions (disabled)
          </gi-side-nav-item>
        </gi-side-nav-group>
        <gi-side-nav-heading>Side Nav Heading</gi-side-nav-heading>
        <gi-side-nav-item
          [selected]="current === 'overview'"
          (onClick)="selectItem('overview')"
        >
          Overview
        </gi-side-nav-item>
        <gi-side-nav-item-link
          [selected]="current === 'link'"
          (onClick)="selectItem('link')"
          href="#"
        >
          Homepage
        </gi-side-nav-item-link>
        <gi-side-nav-item
          [selected]="current === 'reports'"
          (onClick)="selectItem('reports')"
        >
          Reports
        </gi-side-nav-item>
        <gi-side-nav-item
          [selected]="current === 'settings'"
          (onClick)="selectItem('settings')"
        >
          Settings
        </gi-side-nav-item>
      </gi-side-nav>
    `,
  }),
};
