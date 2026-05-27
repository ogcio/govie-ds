import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { within, expect, userEvent, screen } from 'storybook/test';
import clsx from 'clsx';
import Heading from '@/Heading.js';
import Button from '@/atoms/Button';
import { LogoBlack, LogoGoldWhite, LogoWhite, LogoHarpBlack, LogoHarpWhite } from '@/atoms/icons/logos';
import { DrawerMenuExample } from '@/drawer/drawer.content.js';
import { DrawerBody, DrawerFooter, DrawerWrapper } from '@/drawer/drawer.js';
import { FormField, FormFieldLabel } from '@/forms/form-field/form-field.js';
import { useToggleMap } from '@/hooks/use-toggle-map.js';
import { Link } from '@/link/link.js';
import { List, ListTypeEnum } from '@/list/list.js';
import { ListItem } from '@/list-item/list-item.js';
import { SelectItemNext, SelectNext } from '@/select/select-next.js';
import { HeaderSearch } from '@/header/components/header-search.js';
import { HeaderLogo } from './components/header-logo.js';
import { HeaderTitle } from './components/header-title.js';
import { HeaderMenuItemButton } from './components/menu/components/header-menu-item-button.js';
import { HeaderMenuItemLink } from './components/menu/components/header-menu-item-link.js';
import { HeaderMenuItemSeparator } from './components/menu/components/header-menu-item-separator.js';
import { HeaderMenuItemSlot } from './components/menu/components/header-menu-item-slot.js';
import { HeaderPrimaryMenu } from './components/menu/header-primary-menu.js';
import { HeaderSecondaryMenu } from './components/menu/header-secondary-menu.js';
import { HeaderNext as Header, HeaderSlotContainer } from './header-next.js';
import InfoIcon from '@/atoms/icons/Info';
import LogoutIcon from '@/atoms/icons/Logout';
import SearchIcon from '@/atoms/icons/Search';
import MicrophoneIcon from '@/atoms/icons/Mic';
import CloseIcon from '@/atoms/icons/Close';
import MenuIcon from '@/atoms/icons/Menu';
import Divider from '@/atoms/Divider';

const SM = '16px';

const meta = {
  title: 'layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

const SlotExample1 = () => (
  <div className="gi-pt-4 gi-flex gi-justify-between gi-flex-col gi-gap-6 gi-h-full">
    <div className="gi-flex gi-flex-col gi-gap-6">
      <Heading as="h2">Faq</Heading>
      <List
        type={ListTypeEnum.Bullet}
        items={[
          <Link size="sm" href="#">
            Citizens Information - Services and Rights
          </Link>,
          <Link size="sm" href="#">
            Revenue - Taxes and Payments
          </Link>,
          <Link size="sm" href="#">
            Department of Social Protection
          </Link>,
        ]}
      />
    </div>
    <div className="gi-flex gi-flex-col-reverse gi-gap-4 xs:gi-gap-6 xs:gi-justify-end xs:gi-flex-row gi-p-4 xs:gi-p-6">
      <Button variant="secondary" appearance="dark" className="gi-justify-center xs:gi-justify-start">
        Cancel
      </Button>
      <Button className="gi-justify-center xs:gi-justify-start">Primary</Button>
    </div>
  </div>
);

const SlotExample2 = () => {
  return (
    <FormField className="gi-w-[300px]">
      <FormFieldLabel>Languages</FormFieldLabel>
      <SelectNext id="slot-example-2">
        <SelectItemNext value="gaeilge">Gaeilge</SelectItemNext>
        <SelectItemNext value="english">English</SelectItemNext>
        <SelectItemNext value="spanish">Spanish</SelectItemNext>
        <SelectItemNext value="italian">Italian</SelectItemNext>
      </SelectNext>
    </FormField>
  );
};

export const Default: StoryObj = {
  render: function Render() {
    const [state, { toggle, close, closeAll }] = useToggleMap({
      faq: false,
      search: false,
      language: false,
      drawer: false,
    });

    const handleMenuItemButton = (key: string) => () => {
      const sections = ['faq', 'search', 'language'].filter((section) => section !== key);
      toggle(key);
      for (const section of sections) {
        close(section);
      }
    };

    return (
      <>
        <Header variant="default" aria-label="Site header">
          <HeaderLogo>
            <LogoHarpWhite label="Gov.ie logo" className="gi-block gi-h-10 gi-w-auto sm:gi-hidden" />
            <LogoWhite label="Gov.ie logo" className="gi-hidden gi-h-12 gi-w-auto sm:gi-block" />
          </HeaderLogo>
          <HeaderTitle>Title</HeaderTitle>
          <HeaderSecondaryMenu>
            <HeaderMenuItemLink href="#" aria-label="Switch to Gaeilge">
              Gaeilge
            </HeaderMenuItemLink>
            <HeaderMenuItemLink href="#" aria-label="Switch to English">
              English
            </HeaderMenuItemLink>
            <HeaderMenuItemSlot className="gi-flex gi-items-center">
              <label>Hello John &nbsp;| </label>
              <a href="#" className="gi-header-secondary-item gi-header-secondary-item-light" aria-label="logout">
                <LogoutIcon size={SM} />
              </a>
            </HeaderMenuItemSlot>
          </HeaderSecondaryMenu>
          <HeaderPrimaryMenu>
            <HeaderMenuItemLink href="#" showItemMode="desktop-only">
              Departments
            </HeaderMenuItemLink>
            <HeaderMenuItemLink href="#" showItemMode="desktop-only">
              Services
            </HeaderMenuItemLink>
            <HeaderMenuItemSeparator />
            <HeaderMenuItemButton
              showItemMode="desktop-only"
              aria-label="Toggle frequently asked questions"
              aria-expanded={state.faq}
              aria-controls="FaqDrawer"
              onClick={handleMenuItemButton('faq')}
            >
              FAQ
              <InfoIcon />
            </HeaderMenuItemButton>
            <HeaderMenuItemButton
              showItemMode="desktop-only"
              aria-label="Toggle site search"
              aria-expanded={state.search}
              onClick={handleMenuItemButton('search')}
            >
              Search
              {state.search ? <CloseIcon /> : <SearchIcon />}
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="desktop-only"
              aria-label="Toggle language selector"
              aria-expanded={state.language}
              aria-haspopup="listbox"
              onClick={handleMenuItemButton('language')}
            >
              Language
              {state.language ? <CloseIcon /> : <MicrophoneIcon />}
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="mobile-only"
              aria-label="Toggle main menu"
              aria-expanded={state.drawer}
              aria-controls="MobileMenuDrawer"
              aria-haspopup="dialog"
              onClick={handleMenuItemButton('drawer')}
            >
              Menu
              <MenuIcon />
            </HeaderMenuItemButton>
          </HeaderPrimaryMenu>
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
        <DrawerWrapper
          id="FaqDrawer"
          isOpen={state.faq}
          onClose={() => close('faq')}
          position="right"
          closeButtonSize="large"
        >
          <DrawerBody>
            <SlotExample1 />
          </DrawerBody>
        </DrawerWrapper>
        {state.search ? (
          <HeaderSlotContainer variant="default" role="region" aria-label="Site search" aria-live="polite">
            <HeaderSearch />
          </HeaderSlotContainer>
        ) : null}
        {state.language ? (
          <HeaderSlotContainer id="language-slot" variant="default" role="region" aria-label="Language selector">
            <SlotExample2 />
          </HeaderSlotContainer>
        ) : null}
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('header + navs are present', async () => {
      expect(await canvas.findByRole('banner', { name: /site header/i })).toBeInTheDocument();
      expect(await canvas.findByRole('navigation', { name: /primary navigation/i })).toBeInTheDocument();
      expect(
        await screen.findByRole('navigation', {
          name: /secondary navigation/i,
        }),
      ).toBeInTheDocument();
    });

    await step('FAQ drawer button updates aria', async () => {
      const faqButton = await canvas.findByRole('button', {
        name: /toggle frequently asked questions/i,
      });
      expect(within(faqButton).getByTestId(/info/i)).toBeInTheDocument();
      await userEvent.click(faqButton);
      expect(faqButton).toHaveAttribute('aria-expanded', 'true');

      const faqDrawer = document.querySelector('#FaqDrawer') as HTMLElement;
      expect(faqDrawer).toBeTruthy();

      const drawerScope = within(faqDrawer);
      const drawerCloseButton = await drawerScope.findByRole('button', {
        name: /close/i,
      });
      await userEvent.click(drawerCloseButton);
      expect(faqButton).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Search slot region appears and hides', async () => {
      const searchButton = await canvas.findByRole('button', {
        name: /toggle site search/i,
      });
      expect(searchButton).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(searchButton);
      expect(searchButton).toHaveAttribute('aria-expanded', 'true');
      expect(await screen.findByRole('region', { name: /site search/i })).toBeInTheDocument();
      expect(within(searchButton).getByTestId('close')).toBeInTheDocument();

      await userEvent.click(searchButton);
      expect(searchButton).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Language selector region appears and hides', async () => {
      const langButton = await canvas.findByRole('button', {
        name: /toggle language selector/i,
      });
      expect(langButton).toHaveAttribute('aria-haspopup', 'listbox');
      expect(langButton).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(langButton);
      expect(langButton).toHaveAttribute('aria-expanded', 'true');
      expect(await screen.findByRole('region', { name: /language selector/i })).toBeInTheDocument();
      expect(within(langButton).getByTestId('close')).toBeInTheDocument();

      await userEvent.click(langButton);
      expect(langButton).toHaveAttribute('aria-expanded', 'false');
      expect(within(langButton).getByTestId('mic')).toBeInTheDocument();

      await userEvent.click(canvasElement.ownerDocument.body);
    });
  },
};

export const Govie: StoryObj = {
  render: function Render() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (
      <>
        <Header variant="default" aria-label="Site header" id="govieHeader">
          <HeaderLogo>
            <a href="/" aria-label="Gov.ie home">
              <LogoGoldWhite className="gi-block gi-h-10 gi-w-auto sm:gi-hidden" />
              <LogoGoldWhite className="gi-hidden gi-h-12 gi-w-auto sm:gi-block" />
            </a>
          </HeaderLogo>
          <HeaderPrimaryMenu>
            <HeaderMenuItemLink href="#" showItemMode="desktop-only">
              News
            </HeaderMenuItemLink>
            <HeaderMenuItemLink href="#" showItemMode="desktop-only">
              Departments
            </HeaderMenuItemLink>
            <HeaderMenuItemLink href="#" showItemMode="desktop-only">
              Services
            </HeaderMenuItemLink>
            <HeaderMenuItemSeparator />
            <HeaderMenuItemLink href="#" showItemMode="always">
              Gaelige
            </HeaderMenuItemLink>
            <HeaderMenuItemButton
              showItemMode="mobile-only"
              aria-label="Toggle main menu"
              aria-expanded={isMenuOpen}
              aria-controls="MobileMenuDrawer"
              aria-haspopup="dialog"
              onClick={toggleMenu}
            >
              <MenuIcon />
            </HeaderMenuItemButton>
          </HeaderPrimaryMenu>
        </Header>
        <DrawerWrapper
          id="MobileMenuDrawer"
          isOpen={isMenuOpen}
          onClose={toggleMenu}
          position="right"
          closeButtonSize="small"
          aria-label="Main menu"
        >
          <DrawerBody>
            <ul>
              <li>
                <ListItem href="#" label="News" />
              </li>
              <li>
                <ListItem href="#" label="Departments" />
              </li>
              <li>
                <ListItem href="#" label="Services" />
              </li>
            </ul>
          </DrawerBody>
        </DrawerWrapper>
      </>
    );
  },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('header + primary nav present', async () => {
      expect(await canvas.findByRole('banner', { name: /site header/i })).toBeInTheDocument();

      expect(await canvas.findByRole('navigation', { name: /primary navigation/i })).toBeInTheDocument();

      expect(await canvas.findByRole('link', { name: /news/i })).toBeInTheDocument();
      expect(await canvas.findByRole('link', { name: /departments/i })).toBeInTheDocument();
      expect(await canvas.findByRole('link', { name: /services/i })).toBeInTheDocument();

      expect(await canvas.findByRole('link', { name: /gaelige/i })).toBeInTheDocument();
    });

    await step('logo link is present', async () => {
      expect(await canvas.findByRole('link', { name: /Gov.ie home/i })).toBeInTheDocument();
    });
  },
};

export const Light: StoryObj = {
  decorators: (Story) => {
    return (
      <div className="gi-bg-black gi-p-4">
        <Story />
      </div>
    );
  },
  render: function Render() {
    const [state, { toggle, close, closeAll }] = useToggleMap({
      faq: false,
      search: false,
      language: false,
      drawer: false,
    });

    const handleMenuItemButton = (key: string) => () => {
      const sections = ['faq', 'search', 'language'].filter((section) => section !== key);
      toggle(key);
      for (const section of sections) {
        close(section);
      }
    };

    return (
      <>
        <Header variant="light" aria-label="Site header">
          <HeaderLogo>
            <LogoHarpBlack label="Gov.ie logo" className="gi-block gi-h-10 gi-w-auto sm:gi-hidden" />
            <LogoBlack label="Gov.ie logo" className="gi-hidden gi-h-12 gi-w-auto sm:gi-block" />
          </HeaderLogo>
          <HeaderTitle>Title</HeaderTitle>
          <HeaderSecondaryMenu>
            <HeaderMenuItemLink href="#" aria-label="Switch to Gaeilge">
              Gaeilge
            </HeaderMenuItemLink>
            <HeaderMenuItemLink href="#" aria-label="Switch to English">
              English
            </HeaderMenuItemLink>
            <HeaderMenuItemSlot className="gi-flex gi-items-center">
              <label>Hello John &nbsp;| </label>
              <a href="#" className="gi-header-secondary-item gi-header-secondary-item-light" aria-label="logout">
                <LogoutIcon size={SM} />
              </a>
            </HeaderMenuItemSlot>
          </HeaderSecondaryMenu>
          <HeaderPrimaryMenu>
            <HeaderMenuItemLink href="#" showItemMode="desktop-only">
              Departments
            </HeaderMenuItemLink>
            <HeaderMenuItemLink href="#" showItemMode="desktop-only">
              Services
            </HeaderMenuItemLink>
            <HeaderMenuItemSeparator />
            <HeaderMenuItemButton
              showItemMode="desktop-only"
              aria-label="Toggle frequently asked questions"
              aria-expanded={state.faq}
              aria-controls="FaqDrawer"
              onClick={handleMenuItemButton('faq')}
            >
              FAQ
              <InfoIcon />
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="desktop-only"
              aria-label="Toggle site search"
              aria-expanded={state.search}
              onClick={handleMenuItemButton('search')}
            >
              Search
              {state.search ? <CloseIcon /> : <SearchIcon />}
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="desktop-only"
              aria-label="Toggle language selector"
              aria-expanded={state.language}
              aria-haspopup="listbox"
              onClick={handleMenuItemButton('language')}
            >
              Language
              {state.language ? <CloseIcon /> : <MicrophoneIcon />}
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="mobile-only"
              aria-label="Toggle main menu"
              aria-expanded={state.drawer}
              aria-controls="MobileMenuDrawer"
              aria-haspopup="dialog"
              onClick={handleMenuItemButton('drawer')}
            >
              Menu
              <MenuIcon />
            </HeaderMenuItemButton>
          </HeaderPrimaryMenu>
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
        <DrawerWrapper
          id="FaqDrawer"
          isOpen={state.faq}
          onClose={() => close('faq')}
          position="right"
          closeButtonSize="large"
        >
          <DrawerBody>
            <SlotExample1 />
          </DrawerBody>
        </DrawerWrapper>
        {state.search ? (
          <HeaderSlotContainer variant="light" role="region" aria-label="Site search" aria-live="polite">
            <HeaderSearch />
          </HeaderSlotContainer>
        ) : null}
        {state.language ? (
          <HeaderSlotContainer id="language-slot" variant="light" role="region" aria-label="Language selector">
            <SlotExample2 />
          </HeaderSlotContainer>
        ) : null}
      </>
    );
  },
};

const LinkExamples = ({ showFocusedLabel }: { showFocusedLabel?: boolean }) => {
  return (
    <div className="gi-flex gi-flex-col gi-gap-2">
      <div>
        <Header data-testid="default-header" variant={'default'} aria-label="Site header (default)">
          <HeaderLogo href="#">
            <LogoHarpWhite label="Gov.ie logo" className="gi-block gi-h-10 gi-w-auto sm:gi-hidden" />
            <LogoWhite label="Gov.ie logo" className="gi-hidden gi-h-12 gi-w-auto sm:gi-block" />
          </HeaderLogo>
          <HeaderTitle href="#">Title as a link {showFocusedLabel ? 'focused' : ''}</HeaderTitle>
          <HeaderPrimaryMenu>
            <HeaderMenuItemLink href="#" showItemMode="desktop-only">
              Departments
            </HeaderMenuItemLink>
            <HeaderMenuItemLink href="#" showItemMode="always">
              Services
            </HeaderMenuItemLink>
            <HeaderMenuItemSeparator />
            <HeaderMenuItemButton showItemMode="always">FAQ</HeaderMenuItemButton>
            <HeaderMenuItemButton>Search</HeaderMenuItemButton>
            <HeaderMenuItemButton showItemMode="desktop-only">Language</HeaderMenuItemButton>
          </HeaderPrimaryMenu>
        </Header>
      </div>
      <div className="gi-p-2 gi-bg-black">
        <Header id="header-light" data-testid="light-header" variant={'light'} aria-label="Site header (light)">
          <HeaderLogo href="#">
            <LogoHarpBlack label="Gov.ie logo" className="gi-block gi-h-10 gi-w-auto sm:gi-hidden" />
            <LogoBlack label="Gov.ie logo" className="gi-hidden gi-h-12 gi-w-auto sm:gi-block" />
          </HeaderLogo>
          <HeaderTitle href="#">Title as a link light {showFocusedLabel ? 'focused' : ''}</HeaderTitle>
          <HeaderPrimaryMenu aria-label="navigation-light">
            <HeaderMenuItemLink href="#" showItemMode="desktop-only">
              Departments
            </HeaderMenuItemLink>
            <HeaderMenuItemLink href="#" showItemMode="always">
              Services
            </HeaderMenuItemLink>
            <HeaderMenuItemSeparator />
            <HeaderMenuItemButton showItemMode="always">FAQ</HeaderMenuItemButton>
            <HeaderMenuItemButton>Search</HeaderMenuItemButton>
            <HeaderMenuItemButton showItemMode="desktop-only">Language</HeaderMenuItemButton>
          </HeaderPrimaryMenu>
        </Header>
      </div>
    </div>
  );
};

const dualHeaderA11yParameters = {
  a11y: {
    config: {
      rules: [{ id: 'landmark-no-duplicate-banner', enabled: false }],
    },
  },
} as const;

export const WithTitleAndLogoAsLinks: StoryObj = {
  parameters: {
    ...dualHeaderA11yParameters,
    docs: {
      description: {
        story: 'By passing in an `href` prop to the `HeaderTitle` component, the title becomes a link.',
      },
    },
  },
  args: {
    variant: 'default',
  },
  render: function Render() {
    return <LinkExamples />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let firstBanner: HTMLElement;
    let secondBanner: HTMLElement;
    await step('headers are present', async () => {
      firstBanner = await canvas.findByTestId('default-header');
      secondBanner = await canvas.findByTestId('light-header');
    });
    await step('title is a link', async () => {
      expect(
        await within(firstBanner).findByRole('link', {
          name: /title as a link/i,
        }),
      ).toBeInTheDocument();
      expect(
        await within(secondBanner).findByRole('link', {
          name: /title as a link light/i,
        }),
      ).toBeInTheDocument();
    });
  },
};

export const WithTitleAsLinkFocusState: StoryObj = {
  tags: ['skip-playwright'],
  parameters: {
    ...dualHeaderA11yParameters,
    docs: {
      description: {
        story:
          'Default link effects are applied to the title, such as focus and hover. Navigate directly to this story page to see the effects.',
      },
    },
  },
  render: function Render() {
    return <LinkExamples showFocusedLabel />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let firstBanner: HTMLElement;
    await step('focus outline is visible and has no visual regressions', async () => {
      firstBanner = await canvas.findByTestId('default-header');
      expect(firstBanner).toBeInTheDocument();
      const links = await within(firstBanner).findAllByRole('link');
      const linkLogo = links[0];
      const linkTitle = links[1];
      expect(linkLogo).toHaveAttribute('href', '#');
      expect(linkTitle).toHaveAttribute('href', '#');
      await userEvent.click(firstBanner);
      await userEvent.tab();
      expect(linkLogo).toHaveFocus();
      await userEvent.tab();
      expect(linkTitle).toHaveFocus();
    });
  },
};

function HeaderSearchShowIconOnMd({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        // IconButton column: force visible from md up
        '[&_[data-testid=header-search-form]>div>div:last-child]:md:!gi-block',
        // hide the text Button column on md+
        '[&_[data-testid=header-search-form]>div>div:nth-last-child(2)]:md:!gi-hidden',
        'gi-max-w-sm',
      )}
    >
      {children}
    </div>
  );
}

const CodeBlock = ({ children }: { children: ReactNode }) => (
  <code className="gi-rounded gi-bg-gray-100 gi-px-1">{children}</code>
);

const nonUniqueRoles = {
  a11y: {
    config: {
      rules: [{ id: 'landmark-unique', enabled: false }],
    },
  },
};

export const UsingSearch: StoryObj = {
  parameters: {
    ...nonUniqueRoles,
    docs: {
      description: {
        story: 'Use HeaderSearch within the <Header/> component to render a form with actionable functionality.  ',
      },
    },
  },
  render: function Render() {
    return (
      <div className="gi-space-y-4 [&_[data-testid=header-search-form]]:gi-mx-0">
        <div className="gi-flex gi-gap-4 ">
          <div className="gi-max-w-md gi-grow">
            <p>Desktop view</p>
            <HeaderSearch />
          </div>
          <Divider orientation="vertical" className="gi-flex-none" />
          <div className="">
            <HeaderSearchShowIconOnMd>
              <p>Mobile view</p>
              <HeaderSearch />
            </HeaderSearchShowIconOnMd>
          </div>
        </div>
        <Divider />
        <p>
          Customise the icons used in mobile view <CodeBlock>{`<HeaderSearch icon="<icon_name>"/>`}</CodeBlock>
        </p>
        <HeaderSearchShowIconOnMd>
          <HeaderSearch icon={'menu'} />
        </HeaderSearchShowIconOnMd>
        <Divider />
        <p>
          Use <CodeBlock>{`<HeaderSearch action="<URL>"/>`}</CodeBlock> to make a search query request. Observe the
          network tab in DevTools when clicking "Search".
        </p>
        <HeaderSearch action="/?path=/story/layout-header--using-search" />
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Search button opens up HeaderSearch', async () => {});
  },
};
