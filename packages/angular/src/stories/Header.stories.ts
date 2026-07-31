import type { StoryObj } from '@storybook/angular';
import { within, expect } from 'storybook/test';
import { headerMeta, HeaderComposed as CompleteHeaderStory } from '@/atoms/storybook/Header.meta';
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
import { LogoWhite } from '@/atoms/icons/logos';

const meta = {
  ...headerMeta,
  title: 'Layout/Header/Header',
};

export default meta;

export const CompleteHeader: StoryObj = {
  ...CompleteHeaderStory,
  args: {
    ariaLabel: 'Site header',
    id: 'header-example',
    dataTestId: 'header-composed',
  },
  render: (props) => ({
    props: {
      ...props,
      menuVisible: { base: true, lg: false },
    },
    moduleMetadata: {
      imports: [
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
        LogoWhite,
        InfoIcon,
        SearchIcon,
        MicIcon,
        LogoutIcon,
        MenuIcon,
      ],
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
            <gi-header-nav-item-link ariaLabel="Switch to Gaeilge" href="#">
              English
            </gi-header-nav-item-link>
            <gi-stack direction="row" className="gi-text-center gi-items-center">
              <gi-text size="sm">Hello Saoirse</gi-text>
              <gi-header-nav-item-separator className="gi-my-2"></gi-header-nav-item-separator>
              <gi-header-nav-item-link href="#">
                <gi-logout-icon [size]="16"></gi-logout-icon>
              </gi-header-nav-item-link>
            </gi-stack>
          </gi-header-nav>
        </gi-header-section>
        <gi-header-section>
          <gi-link appearance="light" href="#">
            <gi-header-logo>
              <logo-white></logo-white>
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
            <gi-header-nav-item-separator visible="lg"></gi-header-nav-item-separator>
            <gi-header-nav-item visible="lg">
              FAQ <gi-info-icon></gi-info-icon>
            </gi-header-nav-item>
            <gi-header-nav-item visible="lg">
              Search <gi-search-icon></gi-search-icon>
            </gi-header-nav-item>
            <gi-header-nav-item visible="lg">
              Language <gi-mic-icon></gi-mic-icon>
            </gi-header-nav-item>
            <gi-header-nav-item [visible]="menuVisible">
              Menu <gi-menu-icon></gi-menu-icon>
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
