import omit from 'lodash/omit';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { HomeIcon, PersonIcon, SettingsIcon } from '@/atoms';
import { GiBreadcrumbLink, GiBreadcrumbLinkDirective } from '@/breadcrumbs/BreadcrumbLink';
import { GiBreadcrumbs } from '@/breadcrumbs/Breadcrumbs';
import * as stories from '@/atoms/storybook/BreadcrumbLink.meta';
import { GiBreadcrumbEllipsis } from '@/breadcrumbs/BreadcrumbEllipsis';
import { withRouter } from './router';
import { RouterLink } from '@angular/router';

const meta: Meta = {
  ...stories.meta,
  title: 'Navigation/Breadcrumbs/BreadcrumbLink',
  component: GiBreadcrumbLink,
  argTypes: {
    ...omit(stories.meta.argTypes, ['className', 'styles']),
    class: stories.meta.argTypes.className,
    style: stories.meta.argTypes.styles,
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
    moduleMetadata: { imports: [GiBreadcrumbs, GiBreadcrumbLink] },
    template: `
      <gi-breadcrumbs>
        <gi-breadcrumb-link ${linkBindings}>Home</gi-breadcrumb-link>
      </gi-breadcrumbs>
    `,
  }),
};
export const Directive: StoryObj<GiBreadcrumbLinkDirective> = {
  decorators: [withRouter(['', 'home', 'home/accounts', 'home/accounts/security'])],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Add the `gi-breadcrumb-link` styling to a plain `a`, wrapped in a list item within the `gi-breadcrumbs` component in order to use custom navigation such as RouterLink. Add `current="true"` to the current anchor to set `aria-current="page"` and mute the text colour.',
      },
    },
  },
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiBreadcrumbLinkDirective, GiBreadcrumbs, GiBreadcrumbEllipsis, RouterLink],
    },
    template: `
      <gi-breadcrumbs>
        <li>
          <a giBreadcrumbLink routerLink="/home">Home</a>
        </li>
        <gi-breadcrumb-ellipsis></gi-breadcrumb-ellipsis>
        <li>
          <a giBreadcrumbLink routerLink="/home/accounts">Accounts</a>
        </li>
        <li>
          <a giBreadcrumbLink routerLink="/home/accounts/security" current="true">Security</a>
        </li>
      </gi-breadcrumbs>
    `,
  }),
};

export const CurrentLink: StoryObj = {
  ...stories.CurrentLink,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: { imports: [GiBreadcrumbs, GiBreadcrumbLink] },
    template: `
      <gi-breadcrumbs>
        <gi-breadcrumb-link ${linkBindings}>Current</gi-breadcrumb-link>
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
      imports: [GiBreadcrumbs, GiBreadcrumbLink, HomeIcon, SettingsIcon, PersonIcon],
    },
    template: `
      <gi-breadcrumbs>
        <gi-breadcrumb-link
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
        </gi-breadcrumb-link>
        <gi-breadcrumb-link
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
        </gi-breadcrumb-link>
        <gi-breadcrumb-link
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
        </gi-breadcrumb-link>
      </gi-breadcrumbs>
    `,
  }),
};
