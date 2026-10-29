import { RouterLink, RouterLinkActive } from '@angular/router';
import type { StoryObj } from '@storybook/angular-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import * as itemStories from '@/atoms/storybook/HeaderNavItem.meta';
import * as stories from '@/atoms/storybook/HeaderNavItemLink.meta';
import { GiHeaderNav } from '@/header/HeaderNav';
import { GiHeaderNavItemDirective } from '@/header/HeaderNavItem';
import { GiHeaderNavItemLink, GiHeaderNavLinkDirective } from '@/header/HeaderNavItemLink';
import { GiHeaderSection } from '@/header/HeaderSection';
import { withRouter } from '@/stories/router';

const meta = {
  ...stories.meta,
  argTypes: {
    ...stories.meta.argTypes,
    visible: itemStories.meta.argTypes.visible,
  },
  title: 'Layout/Header/HeaderNavItemLink',
  component: GiHeaderNavItemLink,
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderNav, GiHeaderNavItemLink, GiHeaderSection],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <gi-header-nav-item-link
            [href]="href"
            [visible]="visible"
            [id]="id"
            [dataTestId]="dataTestId"
            [external]="external"
            [ariaLabel]="ariaLabel"
            [ariaCurrent]="ariaCurrent"
          >
            {{ children }}
          </gi-header-nav-item-link>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};

export const Directive: StoryObj = {
  args: { visible: 'md' },
  parameters: {
    controls: { include: ['visible'] },
    docs: {
      description: {
        story:
          'Builds a nav entry from your own elements: `li[giHeaderNavItem]` renders the list item and takes the `visible` input, and `a[giHeaderNavLink]` styles the link inside it. `visible` accepts `true`/`false`, a breakpoint to show from (e.g. `"md"`), or a per-breakpoint map like `{ base: false, lg: true }`.',
      },
    },
  },
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderSection, GiHeaderNav, GiHeaderNavItemDirective, GiHeaderNavLinkDirective],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <li giHeaderNavItem><a giHeaderNavLink href="#">Departments</a></li>
          <li giHeaderNavItem [visible]="visible"><a giHeaderNavLink href="#" class="gi-italic">Services</a></li>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};

export const WithRouter: StoryObj<GiHeaderNavLinkDirective> = {
  decorators: [withRouter(['', 'services', 'contact'])],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'For the native Angular router, put `giHeaderNavLink` on your own `<a>` together with `routerLink` and `routerLinkActive`, and wrap it in an `li` marked with `giHeaderNavItem`, which takes the `visible` input. The router marks the active link with `aria-current`.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: {
      imports: [
        GiHeaderSection,
        GiHeaderNav,
        GiHeaderNavItemDirective,
        GiHeaderNavLinkDirective,
        RouterLink,
        RouterLinkActive,
      ],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <li giHeaderNavItem>
            <a giHeaderNavLink routerLink="/" routerLinkActive [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Home</a>
          </li>
          <li giHeaderNavItem>
            <a giHeaderNavLink routerLink="/services" routerLinkActive ariaCurrentWhenActive="page">Services</a>
          </li>
          <li giHeaderNavItem visible="lg">
            <a giHeaderNavLink routerLink="/contact" routerLinkActive ariaCurrentWhenActive="page">Contact</a>
          </li>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const services = canvas.getByRole('link', { name: 'Services' });

    await step('the consumer anchor carries the router href', async () => {
      expect(services.getAttribute('href')).toBe('#/services');
    });

    await step('clicking navigates through the router and marks the active link', async () => {
      await userEvent.click(services);
      await waitFor(() => expect(services.getAttribute('aria-current')).toBe('page'));
      expect(canvas.getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBeNull();
    });
  },
};
