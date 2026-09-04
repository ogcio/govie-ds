import type { StoryObj } from '@storybook/angular';
import * as stories from '@/atoms/storybook/SideNav.meta';
import Box from '@/atoms/Box';
import { IconButton, MailIcon, MoreVerticalIcon, SendIcon } from '@/atoms';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavHeading from '@/atoms/sidenav/SideNavHeading';
import SideNavItem from '@/atoms/sidenav/SideNavItem';
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
  SideNavGroup,
  Box,
  IconButton,
  MailIcon,
  MoreVerticalIcon,
  SendIcon,
];

type SideNavStoryState = {
  current: string;
  inboxOpen: boolean;
};

export const Default: Story = {
  ...stories.Default,
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
          value="inbox"
          [open]="inboxOpen"
          (onClick)="toggleInbox()"
          [ariaCurrent]="current === 'inbox' ? 'page' : 'false'"
          [actions]="true"
        >
          <gi-box ngProjectAs="[label]" className="gi-flex gi-w-full gi-justify-between">
            <gi-box className="gi-flex">
              <gi-mail-icon></gi-mail-icon>
              Inbox
            </gi-box>
            <strong class="gi-tag gi-tag-counter gi-tag-size-default">3</strong>
          </gi-box>
          <gi-box ngProjectAs="[actions]">
            <gi-icon-button variant="flat" appearance="dark">
              <gi-more-vertical-icon></gi-more-vertical-icon>
            </gi-icon-button>
          </gi-box>
          <gi-side-nav-item
            value="primary"
            [ariaCurrent]="current === 'primary' ? 'page' : 'false'"
            (onClick)="selectItem('primary')"
          >
            Primary
          </gi-side-nav-item>
          <gi-side-nav-item
            value="social"
            [ariaCurrent]="current === 'social' ? 'page' : 'false'"
            (onClick)="selectItem('social')"
          >
            Social
          </gi-side-nav-item>
          <gi-side-nav-item
            value="promotions"
            [ariaCurrent]="current === 'promotions' ? 'page' : 'false'"
            (onClick)="selectItem('promotions')"
          >
            Promotions
          </gi-side-nav-item>
        </gi-side-nav-group>
        <gi-side-nav-group>
          <ng-container ngProjectAs="[label]">
            <gi-send-icon></gi-send-icon>
            Sent
          </ng-container>
        </gi-side-nav-group>
        <gi-side-nav-heading>Side Nav Heading</gi-side-nav-heading>
        <gi-side-nav-item
          value="overview"
          [ariaCurrent]="current === 'overview' ? 'page' : 'false'"
          (onClick)="selectItem('overview')"
        >
          Overview
        </gi-side-nav-item>
        <gi-side-nav-item
          value="reports"
          [ariaCurrent]="current === 'reports' ? 'page' : 'false'"
          (onClick)="selectItem('reports')"
        >
          Reports
        </gi-side-nav-item>
        <gi-side-nav-item
          value="settings"
          [ariaCurrent]="current === 'settings' ? 'page' : 'false'"
          (onClick)="selectItem('settings')"
        >
          Settings
        </gi-side-nav-item>
      </gi-side-nav>
    `,
  }),
};
