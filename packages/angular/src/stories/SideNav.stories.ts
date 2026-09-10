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
type Story = StoryObj<SideNav>;

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
  lastTriggered: string;
};

/**
 * This is a DRAFT Storybook for the SideNav component. Implementation is still being finalised
 */

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
      },
    },
    moduleMetadata: {
      imports: sideNavImports,
    },
    template: /*html*/ `
      <gi-side-nav [dataTestId]="dataTestId">
        <gi-side-nav-heading>Messages</gi-side-nav-heading>
        <gi-side-nav-group
          [open]="inboxOpen"
          (onClick)="toggleInbox()"
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
            (click)="selectItem('primary')"
          >
            Primary
          </gi-side-nav-item>
          <gi-side-nav-item
            [selected]="current === 'social'"
            (click)="selectItem('social')"
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
          (click)="selectItem('overview')"
        >
          Overview
        </gi-side-nav-item>
        <gi-side-nav-item-link
          [selected]="current === 'link'"
          (click)="selectItem('link')"
          href="#"
        >
          Homepage
        </gi-side-nav-item-link>
        <gi-side-nav-item
          [selected]="current === 'reports'"
          (click)="selectItem('reports')"
        >
          Reports
        </gi-side-nav-item>
        <gi-side-nav-item
          [selected]="current === 'settings'"
          (click)="selectItem('settings')"
        >
          Settings
        </gi-side-nav-item>
      </gi-side-nav>
    `,
  }),
};

export const WithActions: Story = {
  ...stories.WithActions,
  tags: ['!dev', '!autodocs'], // exclude story until Storybook examples complete
  render: (props) => ({
    props: {
      ...props,
      current: '',
      inboxOpen: true,
      lastTriggered: 'none',
      triggerAction(this: SideNavStoryState, value: string) {
        this.lastTriggered = value;
      },
      selectItem(this: SideNavStoryState, value: string) {
        this.current = value;
        this.lastTriggered = value;
      },
      toggleInbox(this: SideNavStoryState) {
        this.inboxOpen = !this.inboxOpen;
        this.lastTriggered = 'inbox';
      },
    },
    moduleMetadata: {
      imports: sideNavImports,
    },
    template: `
      <div>
        <p data-testid="last-triggered">{{ lastTriggered }}</p>
        <gi-side-nav [dataTestId]="dataTestId">
          <gi-side-nav-group
            [open]="inboxOpen"
            (onClick)="toggleInbox()"
          >
            <span ngProjectAs="[label]">Inbox</span>
            <gi-icon-button
              ngProjectAs="[actions]"
              variant="flat"
              appearance="dark"
              size="sm"
              ariaLabel="Inbox action"
              (onClick)="triggerAction('inbox-action')"
            >
              <gi-more-vertical-icon></gi-more-vertical-icon>
            </gi-icon-button>
            <gi-side-nav-item>Primary</gi-side-nav-item>
          </gi-side-nav-group>
          <gi-side-nav-item
            [selected]="current === 'overview'"
            [ariaCurrent]="current === 'overview' ? 'page' : undefined"
            (onClick)="selectItem('overview')"
          >
            <gi-icon-button
              ngProjectAs="[actions]"
              variant="flat"
              appearance="dark"
              size="sm"
              ariaLabel="Overview action"
              (onClick)="triggerAction('overview-action')"
            >
              <gi-more-vertical-icon></gi-more-vertical-icon>
            </gi-icon-button>
            Overview
          </gi-side-nav-item>
          <gi-side-nav-item-link
            [selected]="current === 'homepage'"
            [ariaCurrent]="current === 'homepage' ? 'page' : undefined"
            (onClick)="selectItem('homepage')"
            href="#"
          >
            <gi-icon-button
              ngProjectAs="[actions]"
              variant="flat"
              appearance="dark"
              size="sm"
              ariaLabel="Homepage action"
              (onClick)="triggerAction('homepage-action')"
            >
              <gi-more-vertical-icon></gi-more-vertical-icon>
            </gi-icon-button>
            Homepage
          </gi-side-nav-item-link>
        </gi-side-nav>
      </div>
    `,
  }),
};
