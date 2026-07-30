import type { StoryObj } from '@storybook/angular';
import { within, expect } from 'storybook/test';
import { headerMeta, Default as defaultStory } from '@/atoms/storybook/Header.meta';
import {
  Header,
  HeaderSection,
  HeaderLogo,
  HeaderTitle,
  HeaderNav,
  HeaderNavItem,
  HeaderNavItemLink,
  HeaderNavItemSeparator,
  Link,
  Text,
  InfoIcon,
  SearchIcon,
  MicIcon,
  LogoutIcon,
  MenuIcon,
} from '@/atoms';
import Stack from '@/atoms/Stack';
import Divider from '@/atoms/Divider';
import { LogoBlack, LogoHarpBlack, LogoHarpWhite, LogoWhite } from '@/atoms/icons/logos';

const meta = {
  ...headerMeta,
  title: 'Layout/Header/Header',
  component: Header,
  parameters: {
    ...headerMeta.parameters,
    layout: 'fullscreen',
  },
};

export default meta;

const headerImports = [
  Header,
  HeaderSection,
  HeaderLogo,
  HeaderTitle,
  HeaderNav,
  HeaderNavItem,
  HeaderNavItemLink,
  HeaderNavItemSeparator,
  Link,
  Text,
  Stack,
  Divider,
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
  ...defaultStory,
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
          <gi-header-nav ariaLabel="Utility navigation" className="gi-text-sm">
            <gi-header-nav-item-link ariaLabel="Switch to Gaeilge" href="#">
              Gaeilge
            </gi-header-nav-item-link>
            <gi-header-nav-item-link ariaLabel="Switch to English" href="#">
              English
            </gi-header-nav-item-link>
          </gi-header-nav>
          <gi-stack direction="row" className="gi-text-center gi-items-center gi-py-1">
            <gi-text size="sm" className="gi-px-1">Hello Saoirse</gi-text>
            <gi-divider orientation="vertical" className="gi-my-1 gi-mx-1"></gi-divider>
            <gi-link
              className="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-20"
              href="#"
              appearance="light"
              ariaLabel="Log out"
            >
              <gi-logout-icon [size]="16"></gi-logout-icon>
            </gi-link>
          </gi-stack>
        </gi-header-section>
        <gi-header-section>
          <gi-link appearance="light" href="#" ariaLabel="Gov.ie home">
            <gi-header-logo>
              <gi-logo-white [size]="132" className="gi-hidden md:gi-block"></gi-logo-white>
              <gi-logo-harp-white [size]="32" className="gi-block md:gi-hidden"></gi-logo-harp-white>
            </gi-header-logo>
          </gi-link>
          <gi-header-title>Title</gi-header-title>
          <gi-header-nav ariaLabel="Primary navigation">
            <gi-header-nav-item-link visible="lg" href="#">
              Departments
            </gi-header-nav-item-link>
            <gi-header-nav-item-link visible="lg" href="#">
              Services
            </gi-header-nav-item-link>
            <gi-header-nav-item-separator visible="md"></gi-header-nav-item-separator>
            <gi-header-nav-item visible="md">
              FAQ <gi-info-icon></gi-info-icon>
            </gi-header-nav-item>
            <gi-header-nav-item visible="md">
              Search
              <gi-search-icon></gi-search-icon>
            </gi-header-nav-item>
            <gi-header-nav-item visible="md">
              Language
              <gi-mic-icon></gi-mic-icon>
            </gi-header-nav-item>
            <gi-header-nav-item [visible]="{ xs: true, md: false }">
              Menu
              <gi-menu-icon></gi-menu-icon>
            </gi-header-nav-item>
          </gi-header-nav>
        </gi-header-section>
      </gi-header>
    `,
  }),
};

export const Light: StoryObj = {
  ...defaultStory,
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
          <gi-header-nav ariaLabel="Utility navigation" className="gi-text-sm">
            <gi-header-nav-item-link ariaLabel="Switch to Gaeilge" href="#">
              Gaeilge
            </gi-header-nav-item-link>
            <gi-header-nav-item-link ariaLabel="Switch to English" href="#">
              English
            </gi-header-nav-item-link>
          </gi-header-nav>
          <gi-stack direction="row" className="gi-text-center gi-items-center gi-py-1">
            <gi-text size="sm" className="gi-px-1">Hello Saoirse</gi-text>
            <gi-divider orientation="vertical" className="gi-my-1 gi-mx-1"></gi-divider>
            <gi-link
              className="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-10"
              href="#"
              ariaLabel="Log out"
            >
              <gi-logout-icon [size]="16"></gi-logout-icon>
            </gi-link>
          </gi-stack>
        </gi-header-section>
        <gi-header-section appearance="light">
          <gi-link href="#" ariaLabel="Gov.ie home">
            <gi-header-logo>
              <gi-logo-black [size]="132" className="gi-hidden md:gi-block"></gi-logo-black>
              <gi-logo-harp-black [size]="32" className="gi-block md:gi-hidden"></gi-logo-harp-black>
            </gi-header-logo>
          </gi-link>
          <gi-header-title>Light Mode Title</gi-header-title>
          <gi-header-nav ariaLabel="Primary navigation">
            <gi-header-nav-item-link visible="lg" href="#">
              Departments
            </gi-header-nav-item-link>
            <gi-header-nav-item-link visible="lg" href="#">
              Services
            </gi-header-nav-item-link>
            <gi-header-nav-item-separator visible="md"></gi-header-nav-item-separator>
            <gi-header-nav-item visible="md">
              FAQ <gi-info-icon></gi-info-icon>
            </gi-header-nav-item>
            <gi-header-nav-item visible="md">
              Search
              <gi-search-icon></gi-search-icon>
            </gi-header-nav-item>
            <gi-header-nav-item visible="md">
              Language
              <gi-mic-icon></gi-mic-icon>
            </gi-header-nav-item>
            <gi-header-nav-item [visible]="{ xs: true, md: false }">
              Menu
              <gi-menu-icon></gi-menu-icon>
            </gi-header-nav-item>
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
      expect(headerElement).toHaveAttribute('data-testid', 'header-composed');
    });
  },
};

export const TitleAndLogoAsLinks: StoryObj = {
  ...defaultStory,
  parameters: {
    docs: {
      description: {
        story:
          'Wrap `HeaderLogo` in a `Link`, and use a custom `<Link/>` instead of `HeaderTitle`s to make the branding and service name navigable. Use this when both should return the user to the service home page.',
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
        <gi-header-section className="!gi-justify-start">
          <gi-link href="#" appearance="light" ariaLabel="Gov.ie home">
            <gi-header-logo>
              <gi-logo-white [size]="132"></gi-logo-white>
            </gi-header-logo>
          </gi-link>
          <gi-link className="gi-ml-8 gi-p-1 gi-text-xl" href="#" appearance="light">
            Title as a link
          </gi-link>
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
  ...defaultStory,
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
          <gi-header-nav ariaLabel="Utility navigation" className="gi-text-sm">
            <gi-header-nav-item-link ariaLabel="Switch to Gaeilge" href="#">
              Gaeilge
            </gi-header-nav-item-link>
            <gi-header-nav-item-link ariaLabel="Switch to English" href="#">
              English
            </gi-header-nav-item-link>
          </gi-header-nav>
          <gi-stack direction="row" className="gi-text-center gi-items-center gi-py-1">
            <gi-text size="sm" className="gi-px-1">Hello Saoirse</gi-text>
            <gi-divider orientation="vertical" className="gi-my-1 gi-mx-1"></gi-divider>
            <gi-header-nav-item-link
              className="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-20"
              href="#"
              ariaLabel="Log out"
            >
              <gi-logout-icon [size]="16"></gi-logout-icon>
            </gi-header-nav-item-link>
          </gi-stack>
        </gi-header-section>
        <gi-header-section>
          <gi-link appearance="light" href="#" ariaLabel="Gov.ie home">
            <gi-header-logo>
              <gi-logo-white [size]="132"></gi-logo-white>
            </gi-header-logo>
          </gi-link>
          <gi-header-title>Title</gi-header-title>
          <gi-header-nav ariaLabel="Primary navigation">
            <gi-header-nav-item-link href="#">Departments</gi-header-nav-item-link>
            <gi-header-nav-item-link href="#">Services</gi-header-nav-item-link>
            <gi-header-nav-item-separator></gi-header-nav-item-separator>
            <gi-header-nav-item>
              FAQ <gi-info-icon></gi-info-icon>
            </gi-header-nav-item>
            <gi-header-nav-item>
              Search
              <gi-search-icon></gi-search-icon>
            </gi-header-nav-item>
            <gi-header-nav-item>
              Language
              <gi-mic-icon></gi-mic-icon>
            </gi-header-nav-item>
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
      expect(headerElement).toHaveAttribute('data-testid', 'header-composed');
    });
  },
};

export const MobileView: StoryObj = {
  ...defaultStory,
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
          <gi-header-nav ariaLabel="Utility navigation" className="gi-text-sm">
            <gi-header-nav-item-link ariaLabel="Switch to Gaeilge" href="#">
              Gaeilge
            </gi-header-nav-item-link>
            <gi-header-nav-item-link ariaLabel="Switch to English" href="#">
              English
            </gi-header-nav-item-link>
          </gi-header-nav>
          <gi-stack direction="row" className="gi-text-center gi-items-center gi-py-1">
            <gi-text size="sm" className="gi-px-1">Hello Saoirse</gi-text>
            <gi-divider orientation="vertical" className="gi-my-1 gi-mx-1"></gi-divider>
            <gi-link
              className="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-20"
              appearance="light"
              href="#"
              ariaLabel="Log out"
            >
              <gi-logout-icon [size]="16"></gi-logout-icon>
            </gi-link>
          </gi-stack>
        </gi-header-section>
        <gi-header-section>
          <gi-link appearance="light" href="#" ariaLabel="Gov.ie home">
            <gi-header-logo>
              <gi-logo-harp-white className="gi-h-10"></gi-logo-harp-white>
            </gi-header-logo>
          </gi-link>
          <gi-header-title>Title</gi-header-title>
          <gi-header-nav ariaLabel="Primary navigation">
            <gi-header-nav-item>
              Menu <gi-menu-icon></gi-menu-icon>
            </gi-header-nav-item>
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
