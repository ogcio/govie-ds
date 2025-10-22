import type { Meta, StoryObj } from '@storybook/react';
import { CSSProperties, useMemo, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { within, expect, userEvent, screen } from 'storybook/test';
import GovieLogoHarpBlackWithText from '../../assets/logos/gov-of-ireland/harp-black.js';
import GovieLogoHarpWithText from '../../assets/logos/gov-of-ireland/harp-white.js';
import GovieLogoHarpBlack from '../../assets/logos/harp/harp-black.js';
import GovieLogoHarp from '../../assets/logos/harp/harp-white.js';

import { Button } from '../../button/button.js';
import { cn } from '../../cn.js';
import { DrawerMenuExample } from '../../drawer/drawer.content.js';
import {
  DrawerBody,
  DrawerFooter,
  DrawerWrapper,
} from '../../drawer/drawer.js';
import {
  FormField,
  FormFieldLabel,
} from '../../forms/form-field/form-field.js';
import { Heading } from '../../heading/heading.js';
import { useToggleMap } from '../../hooks/use-toggle-map.js';
import { Icon, IconId } from '../../icon/icon.js';
import { Link } from '../../link/link.js';
import { List, ListTypeEnum } from '../../list/list.js';
import { ListItem } from '../../list-item/list-item.js';
import Anchor from '../../primitives/anchor.js';
import { SelectItemNext, SelectNext } from '../../select/select-next.js';
import { HeaderSearch } from '../components/header-search.js';
import { HeaderLogo } from './components/header-logo.js';
import { HeaderTitle } from './components/header-title.js';
import { HeaderMenuItemButton } from './components/menu/components/header-menu-item-button.js';
import { HeaderMenuItemLink } from './components/menu/components/header-menu-item-link.js';
import { HeaderMenuItemSeparator } from './components/menu/components/header-menu-item-separator.js';
import { HeaderMenuItemSlot } from './components/menu/components/header-menu-item-slot.js';
import { HeaderPrimaryMenu } from './components/menu/header-primary-menu.js';
import { HeaderSecondaryMenu } from './components/menu/header-secondary-menu.js';
import { HeaderNext as Header, HeaderSlotContainer } from './header-next.js';

const meta = {
  title: 'layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

const getLogo = (Logo: any) =>
  `data:image/svg+xml;base64,${encodeURIComponent(btoa(renderToStaticMarkup(<Logo />)))}`;

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
      <Button
        variant="secondary"
        appearance="dark"
        className="gi-justify-center xs:gi-justify-start"
      >
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
  render: () => {
    const [state, { toggle, close, closeAll }] = useToggleMap({
      search: false,
      drawer: false,
    });

    const icons = useMemo(() => {
      return {
        faq: state.faq ? 'close' : 'info',
        language: state.language ? 'close' : 'mic',
        drawer: state.drawer ? 'close' : 'menu',
        search: state.search ? 'close' : 'search',
      } as Record<string, IconId>;
    }, [state.faq, state.language, state.drawer, state.search]);

    const handleMenuItemButton = (key: string) => () => {
      const sections = ['faq', 'search', 'language'].filter(
        (section) => section !== key,
      );
      toggle(key);
      sections.map((section) => close(section));
    };

    return (
      <>
        <Header variant="default" aria-label="Site header">
          <HeaderLogo>
            <img
              src={getLogo(GovieLogoHarp)}
              alt="govie logo"
              className="gi-block gi-h-10 gi-w-auto sm:gi-hidden"
              decoding="async"
              loading="eager"
              fetchPriority="high"
            />
            <img
              src={getLogo(GovieLogoHarpWithText)}
              alt="govie logo"
              className="gi-hidden gi-h-12 gi-w-auto sm:gi-block"
              decoding="async"
              loading="eager"
              fetchPriority="high"
            />
            <span className="gi-sr-only">Gov.ie logo</span>
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
              <a
                href="#"
                className="gi-header-secondary-item gi-header-secondary-item-default"
              >
                <Icon icon="logout" size="sm" />
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
              icon={icons.faq}
              aria-label="Toggle frequently asked questions"
              aria-expanded={state.faq}
              aria-controls="FaqDrawer"
              onClick={handleMenuItemButton('faq')}
            >
              FAQ
            </HeaderMenuItemButton>
            <HeaderMenuItemButton
              showItemMode="desktop-only"
              icon={icons.search}
              aria-label="Toggle site search"
              aria-expanded={state.search}
              onClick={handleMenuItemButton('search')}
            >
              Search
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="desktop-only"
              icon={icons.language}
              aria-label="Toggle language selector"
              aria-expanded={state.language}
              aria-haspopup="listbox"
              onClick={handleMenuItemButton('language')}
            >
              Language
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="mobile-only"
              icon={icons.drawer}
              aria-label="Toggle main menu"
              aria-expanded={state.drawer}
              aria-controls="MobileMenuDrawer"
              aria-haspopup="dialog"
              onClick={handleMenuItemButton('drawer')}
            >
              Menu
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
            <Button className="gi-justify-center xs:gi-justify-start">
              Primary
            </Button>
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
          <HeaderSlotContainer
            variant="default"
            role="region"
            aria-label="Site search"
            aria-live="polite"
          >
            <HeaderSearch />
          </HeaderSlotContainer>
        ) : null}
        {state.language ? (
          <HeaderSlotContainer
            id="language-slot"
            variant="default"
            role="region"
            aria-label="Language selector"
          >
            <SlotExample2 />
          </HeaderSlotContainer>
        ) : null}
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('header + navs are present', async () => {
      expect(
        await canvas.findByRole('banner', { name: /site header/i }),
      ).toBeInTheDocument();
      expect(
        await canvas.findByRole('navigation', { name: /primary navigation/i }),
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('navigation', {
          name: /secondary navigation/i,
        }),
      ).toBeInTheDocument();
    });

    await step('FAQ drawer button updates aria + icon', async () => {
      const faqButton = await canvas.findByRole('button', {
        name: /toggle frequently asked questions/i,
      });
      expect(within(faqButton).getByText(/info/i)).toBeInTheDocument();

      await userEvent.click(faqButton);
      expect(within(faqButton).getByText(/close/i)).toBeInTheDocument();

      const faqDrawer = document.querySelector('#FaqDrawer') as HTMLElement;
      expect(faqDrawer).toBeTruthy();

      const drawerScope = within(faqDrawer);
      const drawerCloseButton = await drawerScope.findByRole('button', {
        name: /close/i,
      });
      await userEvent.click(drawerCloseButton);
      expect(within(faqButton).getByText(/info/i)).toBeInTheDocument();
    });

    await step('Search slot region appears and hides', async () => {
      const searchButton = await canvas.findByRole('button', {
        name: /toggle site search/i,
      });
      expect(searchButton).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(searchButton);
      expect(searchButton).toHaveAttribute('aria-expanded', 'true');
      expect(
        await screen.findByRole('region', { name: /site search/i }),
      ).toBeInTheDocument();
      expect(within(searchButton).getByText(/close/i)).toBeInTheDocument();

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
      expect(
        await screen.findByRole('region', { name: /language selector/i }),
      ).toBeInTheDocument();
      expect(within(langButton).getByText(/close/i)).toBeInTheDocument();

      await userEvent.click(langButton);
      expect(langButton).toHaveAttribute('aria-expanded', 'false');
      expect(within(langButton).getByText(/mic/i)).toBeInTheDocument();

      await userEvent.click(canvasElement.ownerDocument.body);
    });
  },
};

export const Govie: StoryObj = {
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (
      <>
        <Header variant="default" aria-label="Site header" id="govieHeader">
          <HeaderLogo>
            <Anchor href="/" aria-label="Go to Home Page">
              <img
                src="https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov.ie/harp-gold-text-white.svg"
                alt="govie logo"
                className="gi-block gi-h-10 gi-w-auto sm:gi-hidden"
                decoding="async"
                loading="eager"
                fetchPriority="high"
              />
              <img
                src="https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov.ie/harp-gold-text-white.svg"
                alt="govie logo"
                className="gi-hidden gi-h-12 gi-w-auto sm:gi-block"
                decoding="async"
                loading="eager"
                fetchPriority="high"
              />
              <span className="gi-sr-only">Gov.ie logo</span>
            </Anchor>
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
              icon="menu"
              aria-label="Toggle main menu"
              aria-expanded={isMenuOpen}
              aria-controls="MobileMenuDrawer"
              aria-haspopup="dialog"
              onClick={toggleMenu}
            />
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
      expect(
        await canvas.findByRole('banner', { name: /site header/i }),
      ).toBeInTheDocument();

      expect(
        await canvas.findByRole('navigation', { name: /primary navigation/i }),
      ).toBeInTheDocument();

      expect(
        await canvas.findByRole('link', { name: /news/i }),
      ).toBeInTheDocument();
      expect(
        await canvas.findByRole('link', { name: /departments/i }),
      ).toBeInTheDocument();
      expect(
        await canvas.findByRole('link', { name: /services/i }),
      ).toBeInTheDocument();

      expect(
        await canvas.findByRole('link', { name: /gaelige/i }),
      ).toBeInTheDocument();
    });

    await step('logo link is present', async () => {
      expect(
        await canvas.findByRole('link', { name: /go to home page/i }),
      ).toBeInTheDocument();
      expect(
        await canvas.findByRole('img', { name: /govie logo/i }),
      ).toBeInTheDocument();
    });
  },
};

export const MygovID: StoryObj = {
  render: () => {
    const MyGovIdButtonMyGovId = ({ className = 'gi-inline-flex' }) => {
      return (
        <button
          id="HeaderButton-loginWithMyGovIdButton"
          data-googletaglabel="Login With MyGovId"
          className={cn('gi-myGovIdButton-myGgovId', className)}
          style={{
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          Login with MyGovID
          <img
            id="loginButton-loginWithMyGovIdButton-image"
            src="https://mygovidstatic.blob.core.windows.net/assets/images/mygovid_logo_white_button_icon.svg"
            data-googletaglabel="Login With MyGovId"
            aria-label="Decorative icon included within login button"
          />
        </button>
      );
    };

    const MyGovIdButtonMyWelfare = ({ className = 'gi-inline-flex' }) => {
      return (
        <a
          href="#"
          style={{
            fontFamily: "'Open Sans', sans-serif",
            touchAction: 'manipulation',
          }}
          className={cn('gi-myGovIdButton-mywelfare', className)}
        >
          <span>Login with MyGovID</span>
          <svg height="1.2em" width="1.2em" viewBox="0 0 1024 1024" fill="#fff">
            <path d="M617.244 512c-48.356 0-71.111 31.289-71.111 96.711 0 31.289 5.689 56.889 19.911 73.956 14.222 19.911 34.133 28.444 62.578 28.444 8.533 0 17.067 0 22.756 0 8.533 0 17.067-2.844 17.067-2.844v-182.044c0-2.844-14.222-8.533-22.756-8.533-8.533-2.844-17.067-5.689-28.444-5.689zM512 14.222c-275.911 0-497.778 221.867-497.778 497.778s221.867 497.778 497.778 497.778 497.778-221.867 497.778-497.778-221.867-497.778-497.778-497.778zM315.733 247.467c34.133 0 62.578 28.444 62.578 62.578s-28.444 62.578-62.578 62.578-62.578-28.444-62.578-62.578 28.444-62.578 62.578-62.578zM406.756 640h-14.222c-11.378 0-19.911 8.533-19.911 22.756v125.156h-105.244v-125.156c0-11.378-8.533-22.756-22.756-22.756h-8.533v-184.889c0-22.756 19.911-39.822 42.667-39.822h85.333c22.756 0 42.667 14.222 42.667 36.978 0 0 0 187.733 0 187.733zM776.533 776.533c-8.533 2.844-22.756 5.689-34.133 8.533s-25.6 5.689-36.978 5.689c-14.222 2.844-25.6 2.844-39.822 2.844-11.378 2.844-25.6 2.844-36.978 2.844-28.444 0-54.044-2.844-76.8-14.222-22.756-8.533-42.667-19.911-56.889-36.978-14.222-14.222-28.444-34.133-36.978-56.889s-11.378-48.356-11.378-76.8c0-28.444 2.844-54.044 11.378-76.8s17.067-42.667 31.289-59.733c14.222-17.067 28.444-28.444 48.356-36.978s42.667-14.222 65.422-14.222c14.222 0 25.6 2.844 36.978 2.844s22.756 5.689 31.289 11.378v-184.889l108.089-17.067-2.844 540.444z"></path>
          </svg>
        </a>
      );
    };

    const [state, { close, closeAll, toggle }] = useToggleMap({
      drawer: false,
    });
    const icons = useMemo(() => {
      return {
        drawer: state.drawer ? 'close' : 'menu',
      } as Record<string, IconId>;
    }, [state.drawer]);

    return (
      <>
        <Header variant="default" aria-label="Site header" id="govieHeader">
          <HeaderLogo>
            <img
              src={getLogo(GovieLogoHarp)}
              alt="govie logo"
              className="gi-block gi-h-10 gi-w-auto sm:gi-hidden"
              decoding="async"
              loading="eager"
              fetchPriority="high"
            />
            <img
              src={getLogo(GovieLogoHarpWithText)}
              alt="govie logo"
              className="gi-hidden gi-h-12 gi-w-auto sm:gi-block"
              decoding="async"
              loading="eager"
              fetchPriority="high"
            />
            <span className="gi-sr-only">Gov.ie logo</span>
          </HeaderLogo>
          <HeaderPrimaryMenu>
            <HeaderMenuItemLink href="#" showItemMode="always">
              Login with MyGovID
            </HeaderMenuItemLink>
            <HeaderMenuItemSlot showItemMode="desktop-only">
              <MyGovIdButtonMyWelfare />
            </HeaderMenuItemSlot>
            <HeaderMenuItemSlot showItemMode="desktop-only">
              <MyGovIdButtonMyGovId />
            </HeaderMenuItemSlot>
            <HeaderMenuItemSlot showItemMode="desktop-only"></HeaderMenuItemSlot>
            <HeaderMenuItemButton
              showItemMode="mobile-only"
              icon={icons.drawer}
              aria-label="Toggle main menu"
              aria-expanded={state.drawer}
              aria-controls="MobileMenuDrawer"
              aria-haspopup="dialog"
              onClick={() => toggle('drawer')}
            />
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
          <DrawerBody className="gi-w-full">
            <MyGovIdButtonMyWelfare className="gi-flex" />
            <MyGovIdButtonMyGovId className="gi-flex" />
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
            <Button className="gi-justify-center xs:gi-justify-start">
              Primary
            </Button>
          </DrawerFooter>
        </DrawerWrapper>
      </>
    );
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
  render: () => {
    const [state, { toggle, close, closeAll }] = useToggleMap({
      search: false,
      drawer: false,
    });

    const icons = useMemo(() => {
      return {
        faq: state.faq ? 'close' : 'info',
        language: state.language ? 'close' : 'mic',
        drawer: state.drawer ? 'close' : 'menu',
        search: state.search ? 'close' : 'search',
      } as Record<string, IconId>;
    }, [state.faq, state.language, state.drawer, state.search]);

    const handleMenuItemButton = (key: string) => () => {
      const sections = ['faq', 'search', 'language'].filter(
        (section) => section !== key,
      );
      toggle(key);
      sections.map((section) => close(section));
    };

    return (
      <>
        <Header variant="light" aria-label="Site header">
          <HeaderLogo>
            <img
              src={getLogo(GovieLogoHarpBlack)}
              alt="govie logo"
              className="gi-block gi-h-10 gi-w-auto sm:gi-hidden"
              decoding="async"
              loading="eager"
              fetchPriority="high"
            />
            <img
              src={getLogo(GovieLogoHarpBlackWithText)}
              alt="govie logo"
              className="gi-hidden gi-h-12 gi-w-auto sm:gi-block"
              decoding="async"
              loading="eager"
              fetchPriority="high"
            />
            <span className="gi-sr-only">Gov.ie logo</span>
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
              <a
                href="#"
                className="gi-header-secondary-item gi-header-secondary-item-light"
              >
                <Icon icon="logout" size="sm" />
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
              icon={icons.faq}
              aria-label="Toggle frequently asked questions"
              aria-expanded={state.faq}
              aria-controls="FaqDrawer"
              onClick={handleMenuItemButton('faq')}
            >
              FAQ
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="desktop-only"
              icon={icons.search}
              aria-label="Toggle site search"
              aria-expanded={state.search}
              onClick={handleMenuItemButton('search')}
            >
              Search
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="desktop-only"
              icon={icons.language}
              aria-label="Toggle language selector"
              aria-expanded={state.language}
              aria-haspopup="listbox"
              onClick={handleMenuItemButton('language')}
            >
              Language
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="mobile-only"
              icon={icons.drawer}
              aria-label="Toggle main menu"
              aria-expanded={state.drawer}
              aria-controls="MobileMenuDrawer"
              aria-haspopup="dialog"
              onClick={handleMenuItemButton('drawer')}
            >
              Menu
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
            <Button className="gi-justify-center xs:gi-justify-start">
              Primary
            </Button>
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
          <HeaderSlotContainer
            variant="light"
            role="region"
            aria-label="Site search"
            aria-live="polite"
          >
            <HeaderSearch />
          </HeaderSlotContainer>
        ) : null}
        {state.language ? (
          <HeaderSlotContainer
            id="language-slot"
            variant="light"
            role="region"
            aria-label="Language selector"
          >
            <SlotExample2 />
          </HeaderSlotContainer>
        ) : null}
      </>
    );
  },
};
