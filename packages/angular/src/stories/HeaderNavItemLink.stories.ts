import { RouterLink, RouterLinkActive } from '@angular/router';
import type { StoryObj } from '@storybook/angular-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { headerNavItemLinkMeta, Default as defaultStory } from '@/atoms/storybook/HeaderNavItemLink.meta';
import { GiHeaderNav } from '@/header/HeaderNav';
import { GiHeaderNavItem, GiHeaderNavItemDirective } from '@/header/HeaderNavItem';
import { GiHeaderNavItemLink, GiHeaderNavItemLinkDirective } from '@/header/HeaderNavItemLink';
import { GiHeaderSection } from '@/header/HeaderSection';
import { withRouter } from '@/stories/router';

const meta = {
  ...headerNavItemLinkMeta,
  title: 'Layout/Header/HeaderNavItemLink',
  component: GiHeaderNavItemLink,
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderNav, GiHeaderNavItem, GiHeaderNavItemLink, GiHeaderSection],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <gi-header-nav-item [visible]="visible">
            <gi-header-nav-item-link
              [href]="href"
              [id]="id"
              [dataTestId]="dataTestId"
              [external]="external"
              [ariaLabel]="ariaLabel"
              [ariaCurrent]="ariaCurrent"
            >
              {{ children }}
            </gi-header-nav-item-link>
          </gi-header-nav-item>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};

export const Directive: StoryObj<GiHeaderNavItemLinkDirective> = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Adds the header nav item link styling to a plain `a` inside an `li` marked with `giHeaderNavItem`, which carries the `visible` input.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: {
      imports: [GiHeaderSection, GiHeaderNav, GiHeaderNavItemDirective, GiHeaderNavItemLinkDirective],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <li giHeaderNavItem><a giHeaderNavItemLink href="#">Departments</a></li>
          <li giHeaderNavItem visible="md"><a giHeaderNavItemLink href="#" class="gi-italic">Services</a></li>
        </gi-header-nav>
      </gi-header-section>
    `,
  }),
};

export const WithRouter: StoryObj<GiHeaderNavItemLinkDirective> = {
  decorators: [withRouter(['', 'services'])],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`giHeaderNavItemLink` supports the native Angular router: use it together with `routerLink` and `routerLinkActive` on the same `<a>`, and the router marks the active link with `aria-current`.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: {
      imports: [
        GiHeaderSection,
        GiHeaderNav,
        GiHeaderNavItemDirective,
        GiHeaderNavItemLinkDirective,
        RouterLink,
        RouterLinkActive,
      ],
    },
    template: `
      <gi-header-section>
        <gi-header-nav ariaLabel="Primary navigation">
          <li giHeaderNavItem>
            <a giHeaderNavItemLink routerLink="/" routerLinkActive [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Home</a>
          </li>
          <li giHeaderNavItem>
            <a giHeaderNavItemLink routerLink="/services" routerLinkActive ariaCurrentWhenActive="page">Services</a>
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
