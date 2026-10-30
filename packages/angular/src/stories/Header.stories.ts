import { RouterLink, RouterLinkActive } from '@angular/router';
import type { StoryObj } from '@storybook/angular-vite';
import { within, expect } from 'storybook/test';
import * as stories from '@/atoms/storybook/Header.meta';
import { InfoIcon, LogoutIcon, MenuIcon, MicIcon, SearchIcon } from '@/icons';
import { GiBox } from '@/Box';
import { GiHeader } from '@/header/Header';
import { GiHeaderSection } from '@/header/HeaderSection';
import { GiHeaderLogo } from '@/header/HeaderLogo';
import { GiHeaderTitle } from '@/header/HeaderTitle';
import { GiHeaderNav } from '@/header/HeaderNav';
import { GiHeaderNavItemDirective } from '@/header/HeaderNavItem';
import { GiHeaderNavItemButton, GiHeaderNavButtonDirective } from '@/header/HeaderNavItemButton';
import { GiHeaderNavItemLink, GiHeaderNavLinkDirective } from '@/header/HeaderNavItemLink';
import { GiHeaderNavItemSeparator } from '@/header/HeaderNavItemSeparator';
import { GiLink, GiLinkDirective } from '@/Link';
import { GiText } from '@/Text';
import { GiStack } from '@/Stack';
import { GiDivider } from '@/Divider';
import { LogoBlack, LogoHarpBlack, LogoHarpWhite, LogoWhite } from '@/logos';
import { withRouter } from '@/stories/router';

const meta = {
  ...stories.meta,
  title: 'Layout/Header/Header',
  component: GiHeader,
  parameters: {
    ...stories.meta.parameters,
    layout: 'fullscreen',
  },
};

export default meta;

const headerImports = [
  GiHeader,
  GiHeaderSection,
  GiHeaderLogo,
  GiHeaderTitle,
  GiHeaderNav,
  GiHeaderNavItemButton,
  GiHeaderNavItemLink,
  GiHeaderNavItemSeparator,
  GiLink,
  GiText,
  GiStack,
  GiDivider,
  LogoWhite,
  LogoHarpWhite,
  LogoBlack,
  LogoHarpBlack,
  InfoIcon,
  SearchIcon,
  MicIcon,
  LogoutIcon,
  MenuIcon,
];

export const Default: StoryObj = {
  ...stories.Default,
  parameters: {
    docs: {
      description: {
        story:
          'Responsive header composition in the default colour. It matches the Light story layout, with a utility bar, branding, a long title, and nav items that collapse at smaller breakpoints. Use this as the default reference for assembling Header atoms together.',
      },
    },
  },
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: headerImports,
    },
    template: `
      <gi-header
        [ariaLabel]="ariaLabel"
        [id]="id"
        [dataTestId]="dataTestId"
      >
        <gi-header-section variant="utility">
          <gi-header-nav ariaLabel="Utility navigation" class="gi-text-sm">
            <gi-header-nav-item-link href="#" ariaLabel="Switch to Gaeilge">Gaeilge</gi-header-nav-item-link>
            <gi-header-nav-item-link href="#" ariaLabel="Switch to English">English</gi-header-nav-item-link>
          </gi-header-nav>
          <gi-stack direction="row" class="gi-text-center gi-items-center gi-py-1">
            <gi-text size="sm" class="gi-px-1">Hello Saoirse</gi-text>
            <gi-divider orientation="vertical" class="gi-my-1 gi-mx-1" />
            <gi-link
              class="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-20"
              href="#"
              appearance="light"
              ariaLabel="Log out"
            >
              <gi-logout-icon [size]="16" />
            </gi-link>
          </gi-stack>
        </gi-header-section>
        <gi-header-section>
          <gi-header-logo>
            <gi-link appearance="light" href="#" ariaLabel="Gov.ie home">
              <gi-logo-white [size]="132" className="gi-hidden md:gi-block" />
              <gi-logo-harp-white [size]="32" className="gi-block md:gi-hidden" />
            </gi-link>
          </gi-header-logo>
          <gi-header-title>Title</gi-header-title>
          <gi-header-nav ariaLabel="Primary navigation">
            <gi-header-nav-item-link visible="lg" href="#">Departments</gi-header-nav-item-link>
            <gi-header-nav-item-link visible="lg" href="#">Services</gi-header-nav-item-link>
            <gi-header-nav-item-separator visible="md" />
            <gi-header-nav-item-button visible="md">
              FAQ <gi-info-icon />
            </gi-header-nav-item-button>
            <gi-header-nav-item-button visible="md">
              Search <gi-search-icon />
            </gi-header-nav-item-button>
            <gi-header-nav-item-button visible="md">
              Language <gi-mic-icon />
            </gi-header-nav-item-button>
            <gi-header-nav-item-button [visible]="{ xs: true, md: false }">
              Menu <gi-menu-icon />
            </gi-header-nav-item-button>
          </gi-header-nav>
        </gi-header-section>
      </gi-header>
    `,
  }),
};

export const Light: StoryObj = {
  ...stories.Default,
  parameters: {
    docs: {
      description: {
        story:
          'Same complete header layout rendered with the light section appearance. Sections use a light surface and dark text, paired with the dark Gov.ie logo, so the header can sit on pale page backgrounds. Compare this with Desktop when choosing between the default and light themes.',
      },
    },
  },
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: headerImports,
    },
    template: `
      <gi-header
        [ariaLabel]="ariaLabel"
        [id]="id"
        [dataTestId]="dataTestId"
      >
        <gi-header-section variant="utility" appearance="light">
          <gi-header-nav ariaLabel="Utility navigation" class="gi-text-sm">
            <gi-header-nav-item-link href="#" ariaLabel="Switch to Gaeilge">Gaeilge</gi-header-nav-item-link>
            <gi-header-nav-item-link href="#" ariaLabel="Switch to English">English</gi-header-nav-item-link>
          </gi-header-nav>
          <gi-stack direction="row" class="gi-text-center gi-items-center gi-py-1">
            <gi-text size="sm" class="gi-px-1">Hello Saoirse</gi-text>
            <gi-divider orientation="vertical" class="gi-my-1 gi-mx-1" />
            <gi-link
              class="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-10"
              href="#"
              ariaLabel="Log out"
            >
              <gi-logout-icon [size]="16" />
            </gi-link>
          </gi-stack>
        </gi-header-section>
        <gi-header-section appearance="light">
          <gi-header-logo>
            <gi-link href="#" ariaLabel="Gov.ie home">
              <gi-logo-black [size]="132" className="gi-hidden md:gi-block" />
              <gi-logo-harp-black [size]="32" className="gi-block md:gi-hidden" />
            </gi-link>
          </gi-header-logo>
          <gi-header-title>Light Mode Title</gi-header-title>
          <gi-header-nav ariaLabel="Primary navigation">
            <gi-header-nav-item-link visible="lg" href="#">Departments</gi-header-nav-item-link>
            <gi-header-nav-item-link visible="lg" href="#">Services</gi-header-nav-item-link>
            <gi-header-nav-item-separator visible="md" />
            <gi-header-nav-item-button visible="md">
              FAQ <gi-info-icon />
            </gi-header-nav-item-button>
            <gi-header-nav-item-button visible="md">
              Search <gi-search-icon />
            </gi-header-nav-item-button>
            <gi-header-nav-item-button visible="md">
              Language <gi-mic-icon />
            </gi-header-nav-item-button>
            <gi-header-nav-item-button [visible]="{ xs: true, md: false }">
              Menu <gi-menu-icon />
            </gi-header-nav-item-button>
          </gi-header-nav>
        </gi-header-section>
      </gi-header>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render the light header', async () => {
      const headerElement = canvas.getByRole('banner');
      expect(headerElement).toBeInTheDocument();
      expect(headerElement).toHaveAttribute('aria-label', 'Site header');
      expect(headerElement).toHaveAttribute('data-testid', 'header-default');
    });
  },
};

export const TitleAndLogoAsLinks: StoryObj = {
  ...stories.Default,
  parameters: {
    docs: {
      description: {
        story:
          'Wrap a `Link` in `HeaderLogo` and in `HeaderTitle` to make the branding and service name navigable. Use this when both should return the user to the service home page.',
      },
    },
  },
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: headerImports,
    },
    template: `
      <gi-header
        [ariaLabel]="ariaLabel"
        [id]="id"
        [dataTestId]="dataTestId"
      >
        <gi-header-section class="!gi-justify-start">
          <gi-header-logo>
            <gi-link href="#" appearance="light" ariaLabel="Gov.ie home">
              <gi-logo-white [size]="132" />
            </gi-link>
          </gi-header-logo>
          <gi-header-title>
            <gi-link href="#" appearance="light">
              Title as a link
            </gi-link>
          </gi-header-title>
        </gi-header-section>
      </gi-header>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('logo and title are links', async () => {
      expect(canvas.getByRole('link', { name: /gov.ie home/i })).toBeInTheDocument();
      expect(canvas.getByRole('link', { name: /title as a link/i })).toBeInTheDocument();
    });
  },
};

export const Desktop: StoryObj = {
  ...stories.Default,
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      description: {
        story:
          'Full desktop header composition with a utility bar and primary navigation. It shows language switching, a signed-in user action, branding, title, and common nav items such as Departments, Services, FAQ, Search, and Language. Use this as the default reference for assembling Header atoms together.',
      },
    },
  },
  decorators: [
    (story) => {
      const rendered = story();
      return {
        ...rendered,
        template: `
          <div class="gi-w-full gi-overflow-x-scroll [&_.gi-header-section]:!gi-block">
            <div class="gi-min-w-[1024px]">
              ${rendered.template ?? ''}
            </div>
          </div>
        `,
      };
    },
  ],
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: headerImports,
    },
    template: `
      <gi-header
        [ariaLabel]="ariaLabel"
        [id]="id"
        [dataTestId]="dataTestId"
      >
        <gi-header-section variant="utility">
          <gi-header-nav ariaLabel="Utility navigation" class="gi-text-sm">
            <gi-header-nav-item-link href="#" ariaLabel="Switch to Gaeilge">Gaeilge</gi-header-nav-item-link>
            <gi-header-nav-item-link href="#" ariaLabel="Switch to English">English</gi-header-nav-item-link>
          </gi-header-nav>
          <gi-stack direction="row" class="gi-text-center gi-items-center gi-py-1">
            <gi-text size="sm" class="gi-px-1">Hello Saoirse</gi-text>
            <gi-divider orientation="vertical" class="gi-my-1 gi-mx-1" />
            <gi-link
              class="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-20"
              href="#"
              appearance="light"
              ariaLabel="Log out"
            >
              <gi-logout-icon [size]="16" />
            </gi-link>
          </gi-stack>
        </gi-header-section>
        <gi-header-section>
          <gi-header-logo>
            <gi-link appearance="light" href="#" ariaLabel="Gov.ie home">
              <gi-logo-white [size]="132" />
            </gi-link>
          </gi-header-logo>
          <gi-header-title>Title</gi-header-title>
          <gi-header-nav ariaLabel="Primary navigation">
            <gi-header-nav-item-link href="#">Departments</gi-header-nav-item-link>
            <gi-header-nav-item-link href="#">Services</gi-header-nav-item-link>
            <gi-header-nav-item-separator />
            <gi-header-nav-item-button>
              FAQ <gi-info-icon />
            </gi-header-nav-item-button>
            <gi-header-nav-item-button>
              Search <gi-search-icon />
            </gi-header-nav-item-button>
            <gi-header-nav-item-button>
              Language <gi-mic-icon />
            </gi-header-nav-item-button>
          </gi-header-nav>
        </gi-header-section>
      </gi-header>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render the header with default props', async () => {
      const headerElement = canvas.getByRole('banner');
      expect(headerElement).toBeInTheDocument();
      expect(headerElement).toHaveAttribute('aria-label', 'Site header');
      expect(headerElement).toHaveAttribute('data-testid', 'header-default');
    });
  },
};

export const MobileView: StoryObj = {
  ...stories.Default,
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      description: {
        story:
          'Compact mobile header with a menu trigger for narrow viewports. The utility bar is hidden at smaller widths, and primary actions collapse into the Menu control. Use this story to review the mobile header pattern.',
      },
    },
  },
  globals: {
    viewport: {
      value: 'mobile2',
    },
  },
  decorators: [
    (story) => {
      const rendered = story();
      return {
        ...rendered,
        template: `
          <div class="gi-w-full [&_.gi-header-section.gi-hidden]:!gi-hidden">
            <div class="gi-max-w-[414px] gi-mx-auto">
              ${rendered.template ?? ''}
            </div>
          </div>
        `,
      };
    },
  ],
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: headerImports,
    },
    template: `
      <gi-header
        [ariaLabel]="ariaLabel"
        [id]="id"
        [dataTestId]="dataTestId"
      >
        <gi-header-section variant="utility">
          <gi-header-nav ariaLabel="Utility navigation" class="gi-text-sm">
            <gi-header-nav-item-link href="#" ariaLabel="Switch to Gaeilge">Gaeilge</gi-header-nav-item-link>
            <gi-header-nav-item-link href="#" ariaLabel="Switch to English">English</gi-header-nav-item-link>
          </gi-header-nav>
          <gi-stack direction="row" class="gi-text-center gi-items-center gi-py-1">
            <gi-text size="sm" class="gi-px-1">Hello Saoirse</gi-text>
            <gi-divider orientation="vertical" class="gi-my-1 gi-mx-1" />
            <gi-link
              class="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-20"
              appearance="light"
              href="#"
              ariaLabel="Log out"
            >
              <gi-logout-icon [size]="16" />
            </gi-link>
          </gi-stack>
        </gi-header-section>
        <gi-header-section>
          <gi-header-logo>
            <gi-link appearance="light" href="#" ariaLabel="Gov.ie home">
              <gi-logo-harp-white className="gi-h-10" />
            </gi-link>
          </gi-header-logo>
          <gi-header-title>Title</gi-header-title>
          <gi-header-nav ariaLabel="Primary navigation">
            <gi-header-nav-item-button>
              Menu <gi-menu-icon />
            </gi-header-nav-item-button>
          </gi-header-nav>
        </gi-header-section>
      </gi-header>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render the header with the mobile menu trigger', async () => {
      const headerElement = canvas.getByRole('banner');
      expect(headerElement).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: /menu/i })).toBeInTheDocument();
    });
  },
};

export const WithRouter: StoryObj = {
  ...stories.Default,
  decorators: [withRouter(['', 'departments', 'services'])],
  parameters: {
    docs: {
      description: {
        story:
          'Complete header with nav items built from native elements and wired to the Angular router. `routerLink` and `routerLinkActive` sit on the same `a giHeaderNavLink`, and the router marks the active link with `aria-current`.',
      },
    },
  },
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [
        GiHeader,
        GiHeaderSection,
        GiHeaderLogo,
        GiHeaderTitle,
        GiHeaderNav,
        GiHeaderNavItemDirective,
        GiHeaderNavLinkDirective,
        GiHeaderNavButtonDirective,
        GiHeaderNavItemSeparator,
        GiBox,
        GiLinkDirective,
        LogoWhite,
        InfoIcon,
        SearchIcon,
        MicIcon,
        RouterLink,
        RouterLinkActive,
      ],
    },
    template: `
      <gi-box class="gi-min-w-max">
        <gi-header
          [ariaLabel]="ariaLabel"
          [id]="id"
          [dataTestId]="dataTestId"
        >
          <gi-header-section variant="utility">
            <gi-header-nav ariaLabel="Utility navigation" class="gi-text-sm">
              <li giHeaderNavItem>
                <a giHeaderNavLink routerLink="." [queryParams]="{ lang: 'ga' }" aria-label="Switch to Gaeilge">Gaeilge</a>
              </li>
              <li giHeaderNavItem>
                <a giHeaderNavLink routerLink="." [queryParams]="{ lang: 'en' }" aria-label="Switch to English">English</a>
              </li>
            </gi-header-nav>
          </gi-header-section>
          <gi-header-section>
            <gi-header-logo>
              <a giLink appearance="light" routerLink="/" aria-label="Gov.ie home">
                <gi-logo-white [size]="132" />
              </a>
            </gi-header-logo>
            <gi-header-title>Title</gi-header-title>
            <gi-header-nav ariaLabel="Primary navigation">
              <li giHeaderNavItem>
                <a giHeaderNavLink routerLink="/departments" routerLinkActive ariaCurrentWhenActive="page">Departments</a>
              </li>
              <li giHeaderNavItem>
                <a giHeaderNavLink routerLink="/services" routerLinkActive ariaCurrentWhenActive="page">Services</a>
              </li>
              <gi-header-nav-item-separator />
              <li giHeaderNavItem>
                <button giHeaderNavButton type="button">FAQ <gi-info-icon /></button>
              </li>
              <li giHeaderNavItem>
                <button giHeaderNavButton type="button">Search <gi-search-icon /></button>
              </li>
              <li giHeaderNavItem>
                <button giHeaderNavButton type="button">Language <gi-mic-icon /></button>
              </li>
            </gi-header-nav>
          </gi-header-section>
        </gi-header>
      </gi-box>
    `,
  }),
};
