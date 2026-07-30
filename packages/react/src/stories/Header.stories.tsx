import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { headerMeta, Default as defaultStory } from '@/atoms/storybook/Header.meta';
import Header from '@/atoms/header/Header';
import HeaderLogo from '@/atoms/header/HeaderLogo';
import HeaderSection from '@/atoms/header/HeaderSection';
import HeaderTitle from '@/atoms/header/HeaderTitle';
import HeaderNav from '@/atoms/header/HeaderNav';
import HeaderNavItem from '@/atoms/header/HeaderNavItem';
import HeaderNavItemLink from '@/atoms/header/HeaderNavItemLink';
import HeaderNavItemSeparator from '@/atoms/header/HeaderNavItemSeparator';
import LogoWhite from '@/atoms/icons/logos/LogoWhite';
import LogoBlack from '@/atoms/icons/logos/LogoBlack';
import Link from '@/atoms/Link';
import InfoIcon from '@/atoms/icons/Info';
import SearchIcon from '@/atoms/icons/Search';
import MicIcon from '@/atoms/icons/Mic';
import CloseIcon from '@/atoms/icons/Close';
import LogoutIcon from '@/atoms/icons/Logout';
import MenuIcon from '@/atoms/icons/Menu';
import Button from '@/atoms/Button';
import Text from '@/atoms/Text';
import Stack from '@/atoms/Stack';
import Container from '@/atoms/Container';
import { useToggleMap } from '@/hooks/use-toggle-map';
import { HeaderSearch } from '@/header/components/header-search';
import { DrawerBody, DrawerFooter, DrawerWrapper } from '@/drawer/drawer';
import { DrawerMenuExample } from '@/drawer/drawer.content';
import { LogoHarpBlack, LogoHarpWhite } from '@/logos';
import Divider from '@/Divider';

const meta = {
  ...headerMeta,
  title: 'Layout/Header/Header',
  component: Header,
  parameters: {
    ...headerMeta.parameters,
    docs: {
      ...headerMeta.parameters.docs,
      description: {
        component: `${headerMeta.parameters.docs.description.component}\n\nThis is the recommended Header component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { Header } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
    layout: 'fullscreen',
  },
} as Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  parameters: {
    docs: {
      description: {
        story:
          'Responsive header composition in the default colour. It matches the Light story layout, with a utility bar, branding, a long title, and nav items that collapse at smaller breakpoints. Use this as the default reference for assembling Header atoms together.',
      },
    },
  },
  render: (_props) => (
    <Header {..._props}>
      <HeaderSection variant="utility">
        <HeaderNav ariaLabel="Utility navigation" className="gi-text-sm">
          <HeaderNavItemLink ariaLabel="Switch to Gaeilge" href="#">
            Gaeilge
          </HeaderNavItemLink>
          <HeaderNavItemLink ariaLabel="Switch to English" href="#">
            English
          </HeaderNavItemLink>
        </HeaderNav>
        <Stack direction="row" className="gi-text-center gi-items-center gi-py-1">
          <Text size="sm" className="gi-px-1">
            Hello Saoirse
          </Text>
          <Divider orientation="vertical" className="gi-my-1 gi-mx-1" />
          <Link
            appearance="light"
            className="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-20"
            href="#"
            ariaLabel="Log out"
          >
            <LogoutIcon size={16} />
          </Link>
        </Stack>
      </HeaderSection>
      <HeaderSection>
        <Link appearance="light" href="#" ariaLabel="Gov.ie home">
          <HeaderLogo>
            <LogoWhite size={132} className="gi-hidden md:gi-block" />
            <LogoHarpWhite size={32} className="gi-block md:gi-hidden" />
          </HeaderLogo>
        </Link>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderNav ariaLabel="Primary navigation">
          <HeaderNavItemLink visible="lg" href="#">
            Departments
          </HeaderNavItemLink>
          <HeaderNavItemLink visible="lg" href="#">
            Services
          </HeaderNavItemLink>
          <HeaderNavItemSeparator visible="md" />
          <HeaderNavItem visible="md">
            FAQ <InfoIcon />
          </HeaderNavItem>
          <HeaderNavItem visible="md">
            Search
            <SearchIcon />
          </HeaderNavItem>
          <HeaderNavItem visible="md">
            Language
            <MicIcon />
          </HeaderNavItem>
          <HeaderNavItem visible={{ xs: true, md: false }}>
            Menu
            <MenuIcon />
          </HeaderNavItem>
        </HeaderNav>
      </HeaderSection>
    </Header>
  ),
};

export const Light: Story = {
  ...defaultStory,
  parameters: {
    docs: {
      description: {
        story:
          'Same complete header layout rendered with the light section appearance. Sections use a light surface and dark text, paired with the dark Gov.ie logo, so the header can sit on pale page backgrounds. Compare this with Desktop when choosing between the default and light themes.',
      },
    },
  },
  render: (_props) => (
    <Header {..._props}>
      <HeaderSection variant="utility" appearance="light">
        <HeaderNav ariaLabel="Utility navigation" className="gi-text-sm">
          <HeaderNavItemLink ariaLabel="Switch to Gaeilge" href="#">
            Gaeilge
          </HeaderNavItemLink>
          <HeaderNavItemLink ariaLabel="Switch to English" href="#">
            English
          </HeaderNavItemLink>
        </HeaderNav>
        <Stack direction="row" className="gi-text-center gi-items-center gi-py-1">
          <Text size="sm" className="gi-px-1">
            Hello Saoirse
          </Text>
          <Divider orientation="vertical" className="gi-my-1 gi-mx-1" />
          <Link className="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-10" href="#" ariaLabel="Log out">
            <LogoutIcon size={16} />
          </Link>
        </Stack>
      </HeaderSection>
      <HeaderSection appearance="light">
        <Link href="#" ariaLabel="Gov.ie home">
          <HeaderLogo>
            <LogoBlack size={132} className="gi-hidden md:gi-block" />
            <LogoHarpBlack size={32} className="gi-block md:gi-hidden" />
          </HeaderLogo>
        </Link>
        <HeaderTitle>Light Mode Title</HeaderTitle>
        <HeaderNav ariaLabel="Primary navigation">
          <HeaderNavItemLink visible="lg" href="#">
            Departments
          </HeaderNavItemLink>
          <HeaderNavItemLink visible="lg" href="#">
            Services
          </HeaderNavItemLink>
          <HeaderNavItemSeparator visible="md" />
          <HeaderNavItem visible="md">
            FAQ <InfoIcon />
          </HeaderNavItem>
          <HeaderNavItem visible="md">
            Search
            <SearchIcon />
          </HeaderNavItem>
          <HeaderNavItem visible="md">
            Language
            <MicIcon />
          </HeaderNavItem>
          <HeaderNavItem visible={{ xs: true, md: false }}>
            Menu
            <MenuIcon />
          </HeaderNavItem>
        </HeaderNav>
      </HeaderSection>
    </Header>
  ),
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

export const TitleAndLogoAsLinks: Story = {
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
  render: (_props) => (
    <Header {..._props}>
      <HeaderSection className="!gi-justify-start">
        <Link href="#" appearance="light" ariaLabel="Gov.ie home">
          <HeaderLogo>
            <LogoWhite size={132} />
          </HeaderLogo>
        </Link>
        <Link className="gi-ml-8 gi-p-1 gi-text-xl" href="#" appearance="light">
          Title as a link
        </Link>
      </HeaderSection>
    </Header>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('logo and title are links', async () => {
      expect(canvas.getByRole('link', { name: /gov.ie home/i })).toBeInTheDocument();
      expect(canvas.getByRole('link', { name: /title as a link/i })).toBeInTheDocument();
    });
  },
};

export const Desktop: Story = {
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
  decorators: (Story) => (
    <div className="gi-w-full gi-overflow-x-scroll [&_.gi-header-section]:!gi-block">
      <div className="gi-min-w-[1024px]">
        <Story />
      </div>
    </div>
  ),
  render: (_props) => (
    <Header {..._props}>
      <HeaderSection variant="utility">
        <HeaderNav ariaLabel="Utility navigation" className="gi-text-sm">
          <HeaderNavItemLink ariaLabel="Switch to Gaeilge" href="#">
            Gaeilge
          </HeaderNavItemLink>
          <HeaderNavItemLink ariaLabel="Switch to English" href="#">
            English
          </HeaderNavItemLink>
        </HeaderNav>
        <Stack direction="row" className="gi-text-center gi-items-center gi-py-1">
          <Text size="sm" className="gi-px-1">
            Hello Saoirse
          </Text>
          <Divider orientation="vertical" className="gi-my-1 gi-mx-1" />
          <Link
            appearance="light"
            className="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-20"
            href="#"
            ariaLabel="Log out"
          >
            <LogoutIcon size={16} />
          </Link>
        </Stack>
      </HeaderSection>
      <HeaderSection>
        <Link appearance="light" href="#" ariaLabel="Gov.ie home">
          <HeaderLogo>
            <LogoWhite size={132} />
          </HeaderLogo>
        </Link>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderNav ariaLabel="Primary navigation">
          <HeaderNavItemLink href="#">Departments</HeaderNavItemLink>
          <HeaderNavItemLink href="#">Services</HeaderNavItemLink>
          <HeaderNavItemSeparator />
          <HeaderNavItem>
            FAQ <InfoIcon />
          </HeaderNavItem>
          <HeaderNavItem>
            Search
            <SearchIcon />
          </HeaderNavItem>
          <HeaderNavItem>
            Language
            <MicIcon />
          </HeaderNavItem>
        </HeaderNav>
      </HeaderSection>
    </Header>
  ),
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

export const MobileView: Story = {
  ...defaultStory,
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      description: {
        story:
          'Compact mobile header with a menu trigger that opens a drawer. The utility bar is hidden at smaller widths, and primary actions collapse into the Menu control. Use this story to review the narrow-viewport pattern and drawer wiring.',
      },
    },
  },
  globals: {
    viewport: {
      value: 'mobile2',
    },
  },
  decorators: (Story) => (
    <div className="gi-w-full [&_.gi-header-section.gi-hidden]:!gi-hidden">
      <div className="gi-max-w-[414px] gi-mx-auto">
        <Story />
      </div>
    </div>
  ),
  render: function Render(_props) {
    const [state, { toggle, close, closeAll }] = useToggleMap({
      drawer: false,
    });

    return (
      <>
        <Header {..._props}>
          <HeaderSection variant="utility">
            <HeaderNav ariaLabel="Utility navigation" className="gi-text-sm">
              <HeaderNavItemLink ariaLabel="Switch to Gaeilge" href="#">
                Gaeilge
              </HeaderNavItemLink>
              <HeaderNavItemLink ariaLabel="Switch to English" href="#">
                English
              </HeaderNavItemLink>
            </HeaderNav>
            <Stack direction="row" className="gi-text-center gi-items-center gi-py-1">
              <Text size="sm" className="gi-px-1">
                Hello Saoirse
              </Text>
              <Divider orientation="vertical" className="gi-my-1 gi-mx-1" />
              <Link
                className="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-20"
                appearance="light"
                href="#"
                ariaLabel="Log out"
              >
                <LogoutIcon size={16} />
              </Link>
            </Stack>
          </HeaderSection>
          <HeaderSection>
            <Link appearance="light" href="#" ariaLabel="Gov.ie home">
              <HeaderLogo>
                <LogoHarpWhite className="gi-h-10" />
              </HeaderLogo>
            </Link>
            <HeaderTitle>Title</HeaderTitle>
            <HeaderNav ariaLabel="Primary navigation">
              <HeaderNavItem onClick={() => toggle('drawer')} ariaExpanded={state.drawer}>
                Menu <MenuIcon />
              </HeaderNavItem>
            </HeaderNav>
          </HeaderSection>
        </Header>
        <DrawerWrapper
          id="MobileMenuDrawer"
          isOpen={state.drawer}
          onClose={() => close('drawer')}
          position="right"
          closeButtonSize="large"
          aria-modal="true"
          aria-label="Main menu"
        >
          <DrawerBody className="gi-border-t-xs gi-border-color-border-system-neutral-subtle">
            <DrawerMenuExample />
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="secondary"
              appearance="dark"
              className="gi-justify-center xs:gi-justify-start"
              onClick={() => closeAll()}
            >
              Cancel
            </Button>
            <Button className="gi-justify-center xs:gi-justify-start">Primary</Button>
          </DrawerFooter>
        </DrawerWrapper>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render the header with the mobile menu trigger', async () => {
      const headerElement = canvas.getByRole('banner');
      expect(headerElement).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: /menu/i })).toBeInTheDocument();
    });
  },
};

export const WithSearchAndDrawer: Story = {
  ...defaultStory,
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      description: {
        story:
          'Minimal example of wiring `HeaderSearch` and `Drawer` to separate `HeaderNavItem` actions. Search and menu each toggle their own panel, and opening one closes the other. Use this when you need an interactive pattern for overlay content driven from the header.',
      },
    },
  },
  render: function Render(_props) {
    const [state, { toggle, close, closeAll }] = useToggleMap({
      search: false,
      drawer: false,
    });

    return (
      <>
        <Header {..._props}>
          <HeaderSection>
            <Link appearance="light" href="#" ariaLabel="Gov.ie home">
              <HeaderLogo>
                <LogoWhite size={132} />
              </HeaderLogo>
            </Link>
            <HeaderTitle>Title</HeaderTitle>
            <HeaderNav ariaLabel="Primary navigation">
              <HeaderNavItem
                onClick={() => toggle('search')}
                ariaExpanded={state.search}
                ariaLabel="Toggle site search"
              >
                Search {state.search ? <CloseIcon /> : <SearchIcon />}
              </HeaderNavItem>
              <HeaderNavItem
                onClick={() => toggle('drawer')}
                ariaExpanded={state.drawer}
                ariaControls="HeaderExampleDrawer"
                ariaLabel="Toggle main menu"
              >
                Menu <MenuIcon />
              </HeaderNavItem>
            </HeaderNav>
          </HeaderSection>
        </Header>
        <Container inset>{state.search && <HeaderSearch />}</Container>
        <DrawerWrapper
          id="HeaderExampleDrawer"
          isOpen={state.drawer}
          onClose={() => close('drawer')}
          position="right"
          closeButtonSize="large"
          aria-modal="true"
          aria-label="Main menu"
        >
          <DrawerBody className="gi-border-t-xs gi-border-color-border-system-neutral-subtle">
            <DrawerMenuExample />
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="secondary"
              appearance="dark"
              className="gi-justify-center xs:gi-justify-start"
              onClick={() => closeAll()}
            >
              Cancel
            </Button>
            <Button className="gi-justify-center xs:gi-justify-start">Primary</Button>
          </DrawerFooter>
        </DrawerWrapper>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render search and menu triggers', async () => {
      expect(canvas.getByRole('banner')).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: /toggle site search/i })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: /toggle main menu/i })).toBeInTheDocument();
    });
  },
};
