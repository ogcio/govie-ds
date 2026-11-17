import type { StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/SideNav.meta';
import { GiBox } from '@/Box';
import { MailIcon, MoreVerticalIcon } from '@/icons';
import { GiIconButton } from '@/IconButton';
import { GiText } from '@/Text';
import { GiH2 } from '@/heading/H2';
import { GiSideNav } from '@/sidenav/SideNav';
import { GiSideNavItemButton } from '@/sidenav/SideNavItemButton';
import { GiSideNavHeading } from '@/sidenav/SideNavHeading';
import { GiSideNavItemLink, GiSideNavLinkDirective } from '@/sidenav/SideNavItemLink';
import { GiSideNavItemDirective } from '@/sidenav/SideNavItem';
import { GiSideNavGroup } from '@/sidenav/SideNavGroup';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { withRouter } from './router';

const meta = {
  ...stories.sideNavMeta,
  title: 'Navigation/SideNav',
  tags: ['!dev', '!autodocs', 'skip-playwright'], // exclude story until Storybook examples complete
};

export default meta;
type Story = StoryObj<GiSideNav>;

const sideNavImports = [
  GiSideNav,
  GiSideNavHeading,
  GiSideNavItemButton,
  GiSideNavItemLink,
  GiSideNavGroup,
  GiBox,
  GiH2,
  MailIcon,
  GiIconButton,
  MoreVerticalIcon,
  GiText,
];

type SideNavStoryState = {
  current: string;
  inboxOpen: boolean;
  projectsOpen: boolean;
};

/**
 * This is a DRAFT Storybook for the SideNav component. The stories mirror the React set but are not yet validated for this framework.
 */

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
    },
    moduleMetadata: {
      imports: sideNavImports,
    },
    template: `
      <gi-side-nav [dataTestId]="dataTestId" [ariaLabel]="ariaLabel" class="gi-max-w-sm">
        <gi-side-nav-heading>Messages</gi-side-nav-heading>
        <gi-side-nav-group
          [(open)]="inboxOpen"
        >
          <gi-box ngProjectAs="[label]" class="gi-flex gi-gap-1">
            <gi-mail-icon />
            Inbox
          </gi-box>
          <strong ngProjectAs="[actions]" class="gi-tag gi-tag-counter gi-tag-size-default">3</strong>
          <gi-side-nav-item-button
            [selected]="current === 'primary'"
            [ariaCurrent]="current === 'primary' ? 'page' : undefined"
            (itemClick)="selectItem('primary')"
          >
            Primary
          </gi-side-nav-item-button>
          <gi-side-nav-item-button
            [selected]="current === 'social'"
            [ariaCurrent]="current === 'social' ? 'page' : undefined"
            (itemClick)="selectItem('social')"
          >
            Social
          </gi-side-nav-item-button>
          <gi-side-nav-item-button
            disabled
          >
            Promotions
          </gi-side-nav-item-button>
        </gi-side-nav-group>
        <gi-side-nav-heading>Utilities</gi-side-nav-heading>
        <gi-side-nav-item-button
          [selected]="current === 'overview'"
          [ariaCurrent]="current === 'overview' ? 'page' : undefined"
          (itemClick)="selectItem('overview')"
        >
          Overview
        </gi-side-nav-item-button>
        <gi-side-nav-item-link
          [selected]="current === 'link'"
          [ariaCurrent]="current === 'link' ? 'page' : undefined"
          (itemClick)="selectItem('link')"
          href="#"
        >
          Homepage
        </gi-side-nav-item-link>
        <gi-side-nav-item-button
          [selected]="current === 'reports'"
          [ariaCurrent]="current === 'reports' ? 'page' : undefined"
          (itemClick)="selectItem('reports')"
        >
          Reports
        </gi-side-nav-item-button>
        <gi-side-nav-item-button
          [selected]="current === 'settings'"
          [ariaCurrent]="current === 'settings' ? 'page' : undefined"
          (itemClick)="selectItem('settings')"
        >
          Settings
          <gi-icon-button
            ngProjectAs="[actions]"
            variant="flat"
            appearance="dark"
            size="sm"
            ariaLabel="Settings action"
          >
            <gi-more-vertical-icon />
          </gi-icon-button>
        </gi-side-nav-item-button>
      </gi-side-nav>
    `,
  }),
};

export const WithActions: Story = {
  ...stories.WithActions,
  render: (props) => ({
    props: {
      ...props,
      current: '',
      inboxOpen: true,
      selectItem(this: SideNavStoryState, value: string) {
        this.current = value;
      },
    },
    moduleMetadata: {
      imports: sideNavImports,
    },
    template: `
      <gi-side-nav [dataTestId]="dataTestId" [ariaLabel]="ariaLabel" class="gi-max-w-xs">
        <gi-side-nav-group
          [(open)]="inboxOpen"
        >
          <gi-box ngProjectAs="[label]" class="gi-flex gi-justify-between gi-items-center">
            <gi-text>Inbox</gi-text>
            <strong class="gi-tag gi-tag-counter gi-tag-size-default">3</strong>
          </gi-box>
          <gi-icon-button
            ngProjectAs="[actions]"
            variant="flat"
            appearance="dark"
            size="sm"
            ariaLabel="Inbox action"
          >
            <gi-more-vertical-icon />
          </gi-icon-button>
          <gi-side-nav-item-button [selected]="current === 'primary'" [ariaCurrent]="current === 'primary' ? 'page' : undefined"
          (itemClick)="selectItem('primary')">
            Primary
          </gi-side-nav-item-button>
        </gi-side-nav-group>
        <gi-side-nav-item-button
          [selected]="current === 'overview'"
          [ariaCurrent]="current === 'overview' ? 'page' : undefined"
          (itemClick)="selectItem('overview')"
        >
          Overview
          <gi-icon-button
            ngProjectAs="[actions]"
            variant="flat"
            appearance="dark"
            size="sm"
            ariaLabel="Overview action"
          >
            <gi-more-vertical-icon />
          </gi-icon-button>
        </gi-side-nav-item-button>
        <gi-side-nav-item-link
          [selected]="current === 'homepage'"
          [ariaCurrent]="current === 'homepage' ? 'page' : undefined"
          (itemClick)="selectItem('homepage')"
          href="#"
        >
          Homepage
          <gi-icon-button
            ngProjectAs="[actions]"
            variant="flat"
            appearance="dark"
            size="sm"
            ariaLabel="Homepage action"
          >
            <gi-more-vertical-icon />
          </gi-icon-button>
        </gi-side-nav-item-link>
      </gi-side-nav>
    `,
  }),
};

export const WithRouter: Story = {
  decorators: [withRouter(['', 'inbox', 'sent', 'drafts', 'promotions'], { initialUrl: 'inbox' })],
  args: {
    dataTestId: 'sidenav-with-router',
    ariaLabel: undefined,
    ariaLabelledBy: 'sidenav-with-router-label',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`giSideNavLink` works with the native Angular router: put it on the same `a` as `routerLink`, inside an `li` marked with `giSideNavItem`. The recommended way to mark the active page is `routerLinkActive` with `ariaCurrentWhenActive="page"`. The router sets `aria-current="page"` on the active link, which applies the selected style and tells assistive technologies which page the user is on.',
      },
    },
  },
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiSideNav, GiSideNavItemDirective, GiSideNavLinkDirective, RouterLink, RouterLinkActive, GiH2],
    },
    template: `
      <gi-h2 id="sidenav-with-router-label" size="sm">Service navigation</gi-h2>
      <gi-side-nav [dataTestId]="dataTestId" [ariaLabelledBy]="ariaLabelledBy" class="gi-max-w-xs">
        <li giSideNavItem>
          <a giSideNavLink routerLink="/inbox" routerLinkActive ariaCurrentWhenActive="page">Inbox</a>
        </li>
        <li giSideNavItem>
          <a giSideNavLink routerLink="/sent" routerLinkActive ariaCurrentWhenActive="page">Sent</a>
        </li>
        <li giSideNavItem>
          <a giSideNavLink routerLink="/drafts" routerLinkActive ariaCurrentWhenActive="page">Drafts</a>
        </li>
        <li giSideNavItem>
          <a giSideNavLink routerLink="/promotions" routerLinkActive ariaCurrentWhenActive="page">Promotions</a>
        </li>
      </gi-side-nav>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('URLs from routerLink match', () => {
      for (const name of ['Inbox', 'Sent', 'Drafts', 'Promotions']) {
        const link = canvas.getByRole('link', { name });
        expect(link).toHaveAttribute('href', `#/${name.toLowerCase()}`);
      }
    });
    await step('aria-current set to initial url', async () => {
      await waitFor(() => expect(canvas.getByRole('link', { current: 'page' })).toHaveAccessibleName('Inbox'));
    });
  },
};

export const TestWithRouter: Story = {
  ...WithRouter,
  tags: ['!autodocs', '!dev', 'skip-playwright'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const nav = await canvas.findByRole('navigation', { name: 'Service navigation' });
    const scoped = within(nav);

    await step('click moves aria-current', async () => {
      await userEvent.click(scoped.getByRole('link', { name: 'Sent' }));
      await waitFor(() => expect(scoped.getByRole('link', { name: 'Sent' })).toHaveAttribute('aria-current', 'page'));
      await expect(scoped.getByRole('link', { name: 'Inbox' })).not.toHaveAttribute('aria-current');
      await expect(scoped.getAllByRole('link', { current: 'page' })).toHaveLength(1);
    });
    await step('keyboard activation', async () => {
      const promotions = scoped.getByRole('link', { name: 'Promotions' });
      promotions.focus();
      await expect(promotions).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(promotions).toHaveAttribute('aria-current', 'page'));
    });
  },
};

export const Expandable: Story = {
  ...stories.Expandable,
  render: (props) => ({
    props: {
      ...props,
      inboxOpen: true,
      projectsOpen: false,
      toggleProjects(this: SideNavStoryState, state: boolean) {
        this.projectsOpen = state;
      },
    },
    moduleMetadata: {
      imports: sideNavImports,
    },
    template: `
      <gi-side-nav [dataTestId]="dataTestId" [ariaLabel]="ariaLabel" class="gi-max-w-xs">
        <gi-side-nav-group
          label="Inbox"
          [(open)]="inboxOpen"
        >
          <gi-side-nav-item-button>Primary</gi-side-nav-item-button>
          <gi-side-nav-item-button>Social</gi-side-nav-item-button>
        </gi-side-nav-group>
        <gi-side-nav-group
          label="Projects"
          [open]="projectsOpen"
          (openChange)="toggleProjects($event)"
        >
          <gi-side-nav-item-button>Active</gi-side-nav-item-button>
          <gi-side-nav-item-button>Archived</gi-side-nav-item-button>
        </gi-side-nav-group>
      </gi-side-nav>
    `,
  }),
};

export const WithHeadings: Story = {
  ...stories.WithHeadings,
  render: (props) => ({
    props: {
      ...props,
      current: 'overview',
      selectItem(this: SideNavStoryState, value: string) {
        this.current = value;
      },
    },
    moduleMetadata: {
      imports: sideNavImports,
    },
    template: `
      <gi-h2 id="sidenav-with-headings-label" size="sm">Service navigation</gi-h2>
      <gi-side-nav [dataTestId]="dataTestId" [ariaLabelledBy]="ariaLabelledBy" class="gi-max-w-xs">
        <gi-side-nav-heading>Messages</gi-side-nav-heading>
        <gi-side-nav-item-button
          [selected]="current === 'inbox'"
          [ariaCurrent]="current === 'inbox' ? 'page' : undefined"
          (itemClick)="selectItem('inbox')"
        >
          Inbox
        </gi-side-nav-item-button>
        <gi-side-nav-item-button
          [selected]="current === 'sent'"
          [ariaCurrent]="current === 'sent' ? 'page' : undefined"
          (itemClick)="selectItem('sent')"
        >
          Sent
        </gi-side-nav-item-button>
        <gi-side-nav-heading>Workspace</gi-side-nav-heading>
        <gi-side-nav-item-button
          [selected]="current === 'overview'"
          [ariaCurrent]="current === 'overview' ? 'page' : undefined"
          (itemClick)="selectItem('overview')"
        >
          Overview
        </gi-side-nav-item-button>
        <gi-side-nav-item-button
          [selected]="current === 'reports'"
          [ariaCurrent]="current === 'reports' ? 'page' : undefined"
          (itemClick)="selectItem('reports')"
        >
          Reports
        </gi-side-nav-item-button>
        <gi-side-nav-heading>Account</gi-side-nav-heading>
        <gi-side-nav-item-button
          [selected]="current === 'settings'"
          [ariaCurrent]="current === 'settings' ? 'page' : undefined"
          (itemClick)="selectItem('settings')"
        >
          Settings
        </gi-side-nav-item-button>
      </gi-side-nav>
    `,
  }),
};
