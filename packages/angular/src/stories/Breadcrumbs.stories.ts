import omit from 'lodash/omit';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { HomeIcon } from '@/icons';
import { GiBreadcrumbItemEllipsis } from '@/breadcrumbs/BreadcrumbItemEllipsis';
import { GiBreadcrumbItemLink, GiBreadcrumbLinkDirective } from '@/breadcrumbs/BreadcrumbItemLink';
import { GiBreadcrumbs } from '@/breadcrumbs/Breadcrumbs';
import * as stories from '@/atoms/storybook/Breadcrumbs.meta';
import { GiBreadcrumbItemDirective } from '@/breadcrumbs/BreadcrumbItem';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { withRouter } from './router';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta: Meta = {
  ...stories.meta,
  title: 'Navigation/Breadcrumbs/Breadcrumbs',
  component: GiBreadcrumbs,
  argTypes: {
    ...omit(stories.meta.argTypes, ['className', 'styles']),
    class: stories.meta.argTypes.className,
    style: stories.meta.argTypes.styles,
  },
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiBreadcrumbs, GiBreadcrumbItemLink, GiBreadcrumbItemEllipsis, HomeIcon],
    },
    template: `
      <gi-breadcrumbs
        [id]="id"
        [class]="class"
        [style]="style"
        [ariaLabel]="ariaLabel"
        [ariaLabelledBy]="ariaLabelledBy"
        [dataTestId]="dataTestId"
      >
        <gi-breadcrumb-item-link href="#" ariaLabel="Home">
          <gi-home-icon />
        </gi-breadcrumb-item-link>
        <gi-breadcrumb-item-ellipsis />
        <gi-breadcrumb-item-link href="#">Travel</gi-breadcrumb-item-link>
        <gi-breadcrumb-item-link href="#" [current]="true">Documentation</gi-breadcrumb-item-link>
      </gi-breadcrumbs>
    `,
  }),
};

export const WithRouter: StoryObj<GiBreadcrumbs> = {
  decorators: [
    withRouter(['', 'home', 'home/accounts', 'home/accounts/security'], { initialUrl: 'home/accounts/security' }),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Complete Breadcrumbs with each breadcrumb built from native link elements and wired to the Angular router. RouterLink and routerLinkActive sit on each link. Use `ariaCurrentWhenActive="page"` on each to make the current link visually distinctive.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: {
      imports: [
        GiBreadcrumbs,
        GiBreadcrumbItemDirective,
        GiBreadcrumbLinkDirective,
        GiBreadcrumbItemEllipsis,
        RouterLink,
        RouterLinkActive,
      ],
    },
    template: `
      <gi-breadcrumbs>
        <li giBreadcrumbItem>
          <a giBreadcrumbLink routerLink="/home" routerLinkActive [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Home</a>
        </li>
        <gi-breadcrumb-item-ellipsis/>
        <li giBreadcrumbItem>
          <a giBreadcrumbLink routerLink="/home/accounts" routerLinkActive [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Accounts</a>
        </li>
        <li giBreadcrumbItem>
          <a giBreadcrumbLink routerLink="/home/accounts/security" routerLinkActive  [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Security</a>
        </li>
      </gi-breadcrumbs>
    `,
  }),
};

export const TestWithRouter: StoryObj<GiBreadcrumbs> = {
  ...WithRouter,
  tags: ['skip-playwright', '!autodocs', '!dev'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const homeLink = canvas.getByRole('link', { name: 'Home' });
    const accountsLink = canvas.getByRole('link', { name: 'Accounts' });
    const securityLink = canvas.getByRole('link', { name: 'Security' });

    await step('links use the correct href', async () => {
      expect(homeLink).toHaveAttribute('href', '#/home');
      expect(accountsLink.getAttribute('href')).toBe('#/home/accounts');
      expect(securityLink.getAttribute('href')).toBe('#/home/accounts/security');
    });
    await step('marks the current page link with aria-current', async () => {
      expect(accountsLink).not.toHaveAttribute('aria-current');
      expect(homeLink).not.toHaveAttribute('aria-current');
      await waitFor(() => {
        expect(securityLink).toHaveAttribute('aria-current', 'page');
      });
    });

    await step('clicking a breadcrumb link moves the current page', async () => {
      await userEvent.click(accountsLink);
      await waitFor(() => expect(accountsLink).toHaveAttribute('aria-current', 'page'));
      expect(homeLink).not.toHaveAttribute('aria-current');
      expect(securityLink).not.toHaveAttribute('aria-current');
    });
  },
};
