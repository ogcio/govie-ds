import omit from 'lodash/omit';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/SideNav.meta';
import { GiBox } from '@/Box';
import { MailIcon, MoreVerticalIcon } from '@/icons';
import { GiIconButton } from '@/IconButton';
import { GiText } from '@/Text';
import { GiH2 } from '@/heading/H2';
import { GiSideNav } from '@/sidenav/SideNav';
import { GiSideNavButtonDirective, GiSideNavItemButton } from '@/sidenav/SideNavItemButton';
import { GiSideNavHeading } from '@/sidenav/SideNavHeading';
import { GiSideNavItemLink, GiSideNavLinkDirective } from '@/sidenav/SideNavItemLink';
import { GiSideNavItemDirective } from '@/sidenav/SideNavItem';
import { GiSideNavGroup } from '@/sidenav/SideNavGroup';
import { GiSideNavActionDirective } from '@/sidenav/SideNavAction';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { withRouter } from './router';

const meta: Meta<GiSideNav> = {
  ...stories.sideNavMeta,
  title: 'Navigation/SideNav/SideNav',
  component: GiSideNav,
  argTypes: {
    ...omit(stories.sideNavMeta.argTypes, ['className', 'styles']),
    class: {
      ...stories.sideNavMeta.argTypes.className,
      description: 'Additional CSS classes applied to the nav element.',
    },
    style: {
      control: false,
      description:
        'Inline styles applied to the nav element. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'string | Record<string, string | number | null | undefined>' } },
    },
  },
  parameters: {
    ...stories.sideNavMeta.parameters,
    docs: {
      ...stories.sideNavMeta.parameters.docs,
      description: {
        component: `${stories.sideNavMeta.parameters.docs.description.component}\n\nBuild it from \`gi-side-nav\` with \`gi-side-nav-heading\`, \`gi-side-nav-group\`, \`gi-side-nav-item-button\` and \`gi-side-nav-item-link\` inside it. To write the link or button markup yourself, use the SideNav directives instead (see [Directive](#directive)).`,
      },
    },
  },
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
          <gi-box ngProjectAs="[actions]">
            <strong>3</strong>
          </gi-box>
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
  tags: ['skip-playwright'],
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

export const Expandable: Story = {
  ...stories.Expandable,
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      description: {
        story: 'One group starts open and the other closed. Activating a header shows or hides its items.',
      },
    },
  },
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

export const Directive: Story = {
  args: {
    dataTestId: 'sidenav-directive',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Directive items built with `giSideNavItem`, `giSideNavLink`, `giSideNavButton` and `giSideNavAction`, mixed with a heading and a group. Each directive is described on the SideNavItemLink and SideNavItemButton pages.',
      },
    },
  },
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
      imports: [
        GiSideNav,
        GiSideNavHeading,
        GiSideNavGroup,
        GiSideNavItemDirective,
        GiSideNavLinkDirective,
        GiSideNavButtonDirective,
        GiSideNavActionDirective,
        GiIconButton,
        MoreVerticalIcon,
      ],
    },
    template: `
      <gi-side-nav [dataTestId]="dataTestId" ariaLabel="Side navigation" class="gi-max-w-xs">
        <gi-side-nav-heading>Messages</gi-side-nav-heading>
        <gi-side-nav-group label="Inbox" [(open)]="inboxOpen">
          <li giSideNavItem>
            <button
              giSideNavButton
              [attr.aria-current]="current === 'primary' ? 'page' : null"
              (click)="selectItem('primary')"
            >
              Primary
            </button>
          </li>
          <li giSideNavItem>
            <button giSideNavButton disabled>Promotions</button>
          </li>
        </gi-side-nav-group>
        <gi-side-nav-heading>Utilities</gi-side-nav-heading>
        <li giSideNavItem>
          <button
            giSideNavButton
            [attr.aria-current]="current === 'overview' ? 'page' : null"
            (click)="selectItem('overview')"
          >
            Overview
          </button>
        </li>
        <li giSideNavItem>
          <a giSideNavLink href="#" (click)="$event.preventDefault(); selectItem('homepage')" [attr.aria-current]="current === 'homepage' ? 'page' : null">Homepage</a>
          <div giSideNavAction>
            <button giIconButton variant="flat" appearance="dark" size="sm" ariaLabel="Homepage action">
              <gi-more-vertical-icon />
            </button>
          </div>
        </li>
      </gi-side-nav>
    `,
  }),
};

export const TestDirective: Story = {
  ...Directive,
  tags: ['skip-playwright', '!autodocs', '!dev'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const overview = canvas.getByRole('button', { name: 'Overview' });
    const homepage = canvas.getByRole('link', { name: 'Homepage' });

    await step('the consumer elements render inside list items', async () => {
      for (const element of [overview, homepage, canvas.getByRole('button', { name: 'Primary' })]) {
        expect(element.parentElement?.tagName).toBe('LI');
      }
    });

    await step('aria-current marks the initial entry', async () => {
      expect(overview).toHaveAttribute('aria-current', 'page');
      expect(canvas.getByRole('button', { name: 'Promotions' })).toBeDisabled();
    });

    await step('activating a directive item moves aria-current', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Primary' }));
      await waitFor(() =>
        expect(canvas.getByRole('button', { name: 'Primary' })).toHaveAttribute('aria-current', 'page'),
      );
      expect(overview).not.toHaveAttribute('aria-current');
      await userEvent.click(homepage);
      await waitFor(() => expect(homepage).toHaveAttribute('aria-current', 'page'));
    });

    await step('the action renders beside the link, outside it', async () => {
      const action = canvas.getByRole('button', { name: 'Homepage action' });
      expect(homepage).not.toContainElement(action);
      await userEvent.click(action);
      expect(homepage).toHaveAttribute('aria-current', 'page');
    });
  },
};

export const WithRouter: Story = {
  tags: ['skip-playwright'],
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
          'A full navigation of router links, labelled by the visible heading above it. The router setup is described in SideNavItemLink › With Router.',
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
};
