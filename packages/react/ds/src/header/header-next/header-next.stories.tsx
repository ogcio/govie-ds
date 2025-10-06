import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { within, expect, userEvent, screen } from 'storybook/test';
import { Button } from '../../button/button.js';
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
import { SelectItemNext, SelectNext } from '../../select/select-next.js';
import { HeaderSearch } from '../components/header-search.js';
import { HeaderGovieLogoHarp, HeaderLogo } from './components/header-logo.js';
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
            <HeaderGovieLogoHarp />
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
            <HeaderGovieLogoHarp
              href="#"
              imageLarge="https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov.ie/harp-gold-text-white.svg"
              imageSmall="https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov.ie/harp-gold-text-white.svg"
            />
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
        await canvas.findByRole('link', { name: /go to the home page/i }),
      ).toBeInTheDocument();
      expect(
        await canvas.findByRole('img', { name: /gov\.ie logo/i }),
      ).toBeInTheDocument();
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
            <HeaderGovieLogoHarp />
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
