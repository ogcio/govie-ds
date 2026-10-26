import type { Meta, StoryObj } from '@storybook/angular-vite';
import { withRouter } from '@/stories/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import * as stories from '@/atoms/storybook/BreadcrumbLink.meta';
import { HomeIcon, PersonIcon, SettingsIcon } from '@/atoms';
import { GiBreadcrumbItemLink, GiBreadcrumbLinkDirective } from '@/breadcrumbs/BreadcrumbItemLink';
import { GiBreadcrumbs } from '@/breadcrumbs/Breadcrumbs';
import { GiBreadcrumbItemDirective } from '@/breadcrumbs/BreadcrumbItem';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta: Meta = {
  ...stories.meta,
  title: 'Navigation/Breadcrumbs/BreadcrumbItemLink',
  component: GiBreadcrumbItemLink,
  parameters: {
    ...stories.meta.parameters,
    docs: {
      description: {
        component: `${stories.meta.parameters.docs.description.component}  To use your own anchor, for example with \`routerLink\`, use the \`giBreadcrumbItem\` and \`giBreadcrumbLink\` directives instead (see the Directive and WithRouter stories).`,
      },
    },
  },
  argTypes: {
    ...stories.meta.argTypes,
    class: {
      control: false,
      description: 'Additional CSS classes applied to the anchor element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: {
        disable: true,
      },
      description:
        'Inline styles applied directly to the anchor element. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: {
        type: {
          summary: 'Record<string, string>',
        },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the link.',
      table: {
        type: {
          summary: '(event) => void',
        },
      },
    },
    onKeyUp: {
      action: 'keyup',
      description: 'Key up handler for the link.',
      table: {
        type: {
          summary: '(event) => void',
        },
      },
    },
    onKeyDown: {
      action: 'keydown',
      description: 'Key down handler for the link.',
      table: {
        type: {
          summary: '(event) => void',
        },
      },
    },
  },
};

export default meta;

const linkBindings = `
  [id]="id"
  [href]="href"
  [current]="current"
  [class]="class"
  [style]="style"
  [ariaLabel]="ariaLabel"
  [dataTestId]="dataTestId"
  (click)="onClick && onClick($event)"
  (keydown)="onKeyDown && onKeyDown($event)"
  (keyup)="onKeyUp && onKeyUp($event)"
`;

export const Default: StoryObj = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: { imports: [GiBreadcrumbs, GiBreadcrumbItemLink] },
    template: `
      <gi-breadcrumbs>
        <gi-breadcrumb-item-link ${linkBindings}>Home</gi-breadcrumb-item-link>
      </gi-breadcrumbs>
    `,
  }),
};
export const Directive: StoryObj<GiBreadcrumbLinkDirective> = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Use the directives when you need to own the anchor element. Unlike `gi-breadcrumb-item-link`, the `giBreadcrumbLink` directive only styles the `a` and does not render a list item, so wrap each one in an `li` marked with `giBreadcrumbItem`. Add `current` to the anchor for the page the user is on to set `aria-current="page"` and mute the text colour.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: {
      imports: [GiBreadcrumbs, GiBreadcrumbItemDirective, GiBreadcrumbLinkDirective],
    },
    template: `
      <gi-breadcrumbs>
        <li giBreadcrumbItem>
          <a giBreadcrumbLink href="#">Home</a>
        </li>
        <li giBreadcrumbItem>
          <a giBreadcrumbLink href="#">Accounts</a>
        </li>
        <li giBreadcrumbItem>
          <a giBreadcrumbLink href="#" current>Security</a>
        </li>
      </gi-breadcrumbs>
    `,
  }),
};

export const WithRouter: StoryObj<GiBreadcrumbLinkDirective> = {
  decorators: [withRouter(['', 'home', 'home/accounts', 'home/accounts/security'])],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`giBreadcrumbLink` works with the native Angular router: put it on the same `a` as `routerLink`, inside an `li` marked with `giBreadcrumbItem`. Bind `current` to `routerLinkActive` so the active route sets `aria-current="page"`. Use an exact match so only the page the user is on is current.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: {
      imports: [GiBreadcrumbs, GiBreadcrumbItemDirective, GiBreadcrumbLinkDirective, RouterLink, RouterLinkActive],
    },
    template: `
      <gi-breadcrumbs>
        <li giBreadcrumbItem>
          <a giBreadcrumbLink routerLink="/home" routerLinkActive #homeLink="routerLinkActive" [routerLinkActiveOptions]="{ exact: true }" [current]="homeLink.isActive">Home</a>
        </li>
        <li giBreadcrumbItem>
          <a giBreadcrumbLink routerLink="/home/accounts" routerLinkActive #accountsLink="routerLinkActive" [routerLinkActiveOptions]="{ exact: true }" [current]="accountsLink.isActive">Accounts</a>
        </li>
        <li giBreadcrumbItem>
          <a giBreadcrumbLink routerLink="/home/accounts/security" routerLinkActive #securityLink="routerLinkActive" [routerLinkActiveOptions]="{ exact: true }" [current]="securityLink.isActive">Security</a>
        </li>
      </gi-breadcrumbs>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const home = canvas.getByRole('link', { name: 'Home' });
    const accounts = canvas.getByRole('link', { name: 'Accounts' });
    const security = canvas.getByRole('link', { name: 'Security' });

    await step('the consumer anchors carry the router href', async () => {
      expect(home.getAttribute('href')).toBe('#/home');
      expect(accounts.getAttribute('href')).toBe('#/home/accounts');
      expect(security.getAttribute('href')).toBe('#/home/accounts/security');
    });

    await step('clicking navigates through the router and marks that link current', async () => {
      await userEvent.click(accounts);
      await waitFor(() => expect(accounts.getAttribute('aria-current')).toBe('page'));
      expect(home.getAttribute('aria-current')).toBeNull();
      expect(security.getAttribute('aria-current')).toBeNull();
    });

    await step('moving to another page moves current with the route', async () => {
      await userEvent.click(security);
      await waitFor(() => expect(security.getAttribute('aria-current')).toBe('page'));
      expect(home.getAttribute('aria-current')).toBeNull();
      expect(accounts.getAttribute('aria-current')).toBeNull();
    });
  },
};

export const CurrentLink: StoryObj = {
  ...stories.CurrentLink,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: { imports: [GiBreadcrumbs, GiBreadcrumbItemLink] },
    template: `
      <gi-breadcrumbs>
        <gi-breadcrumb-item-link ${linkBindings}>Current</gi-breadcrumb-item-link>
      </gi-breadcrumbs>
    `,
  }),
};

const [homeLabel, settingsLabel, accountsLabel] = stories.ICON_BREADCRUMB_LABELS;

export const WithIcons: StoryObj = {
  ...stories.WithIcons,
  tags: ['skip-playwright'],
  render: (props) => ({
    props: {
      ...props,
      homeLabel,
      settingsLabel,
      accountsLabel,
    },
    moduleMetadata: {
      imports: [GiBreadcrumbs, GiBreadcrumbItemLink, HomeIcon, SettingsIcon, PersonIcon],
    },
    template: `
      <gi-breadcrumbs>
        <gi-breadcrumb-item-link
          [id]="id"
          [href]="href"
          [current]="current"
          [class]="class"
          [style]="style"
          [ariaLabel]="homeLabel"
          [dataTestId]="dataTestId"
          (click)="onClick && onClick($event)"
          (keydown)="onKeyDown && onKeyDown($event)"
          (keyup)="onKeyUp && onKeyUp($event)"
        >
          <gi-home-icon />
        </gi-breadcrumb-item-link>
        <gi-breadcrumb-item-link
          [id]="id"
          [href]="href"
          [current]="current"
          [class]="class"
          [style]="style"
          [ariaLabel]="settingsLabel"
          [dataTestId]="dataTestId"
          (click)="onClick && onClick($event)"
          (keydown)="onKeyDown && onKeyDown($event)"
          (keyup)="onKeyUp && onKeyUp($event)"
        >
          <gi-settings-icon />
        </gi-breadcrumb-item-link>
        <gi-breadcrumb-item-link
          [id]="id"
          [href]="href"
          [current]="true"
          [class]="class"
          [style]="style"
          [ariaLabel]="accountsLabel"
          [dataTestId]="dataTestId"
          (click)="onClick && onClick($event)"
          (keydown)="onKeyDown && onKeyDown($event)"
          (keyup)="onKeyUp && onKeyUp($event)"
        >
          <gi-person-icon />
        </gi-breadcrumb-item-link>
      </gi-breadcrumbs>
    `,
  }),
};
