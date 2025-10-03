import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useReducer, useState } from 'react';
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
import { IconId } from '../../icon/icon.js';
import { Link } from '../../link/link.js';
import { List, ListTypeEnum } from '../../list/list.js';
import { ListItem } from '../../list-item/list-item.js';
import { SelectItemNext, SelectNext } from '../../select/select-next.js';
import { HeaderSearch } from '../components/header-search.js';
import { headerSlotContainerVariants } from '../variants.js';
import { HeaderGovieLogoHarp, HeaderLogo } from './components/header-logo.js';
import { HeaderTitle } from './components/header-title.js';
import { HeaderMenuItemButton } from './components/menu/components/header-menu-item-button.js';
import { HeaderMenuItemLink } from './components/menu/components/header-menu-item-link.js';
import { HeaderMenuItemSeparator } from './components/menu/components/header-menu-item-separator.js';
import { HeaderMenuItemSlot } from './components/menu/components/header-menu-item-slot.js';
import { HeaderPrimaryMenu } from './components/menu/header-primary-menu.js';
import { HeaderSecondaryMenu } from './components/menu/header-secondary-menu.js';
import { HeaderNext as Header } from './header-next.js';

const meta = {
  title: 'layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

const SlotContainer = ({ variant, ...props }: any) => (
  <div
    className={cn(headerSlotContainerVariants({ appearance: variant }))}
    {...props}
  />
);

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

type HeaderUiState = {
  drawer: boolean;
  search: boolean;
  language: boolean;
  faq: boolean;
} & Record<string, boolean>;

type HeaderUiAction =
  | { type: 'toggle'; key: string }
  | { type: 'open'; key: string }
  | { type: 'close'; key: string }
  | { type: 'closeAll' };

const initialHeaderUiState: HeaderUiState = {
  drawer: false,
  search: false,
  language: false,
  faq: false,
};

function headerUiReducer(
  state: HeaderUiState,
  action: HeaderUiAction,
): HeaderUiState {
  if (action.type === 'toggle') {
    const key = action.key;
    return { ...initialHeaderUiState, [key]: !state[key] };
  }
  if (action.type === 'open') {
    return { ...initialHeaderUiState, [action.key]: true };
  }
  if (action.type === 'close') {
    return { ...initialHeaderUiState, [action.key]: false };
  }
  if (action.type === 'closeAll') {
    return {
      ...initialHeaderUiState,
    };
  }
  return state;
}

export const Default: StoryObj = {
  render: () => {
    const [state, dispatch] = useReducer(headerUiReducer, initialHeaderUiState);
    const toggle = (key: string) => dispatch({ type: 'toggle', key });
    const close = (key: string) => dispatch({ type: 'close', key });
    const closeAll = () => dispatch({ type: 'closeAll' });

    const icons = useMemo(() => {
      return {
        faq: state.faq ? 'close' : 'info',
        language: state.language ? 'close' : 'mic',
        drawer: state.drawer ? 'close' : 'menu',
        search: state.search ? 'close' : 'search',
      } as Record<string, IconId>;
    }, [state.faq, state.language, state.drawer, state.search]);

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
            <HeaderMenuItemSlot>
              <>
                <span>Hello John | </span>
                <a
                  href="#"
                  className="gi-header-secondary-item gi-header-secondary-item"
                >
                  Logout
                </a>
              </>
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
              onClick={() => toggle('faq')}
            >
              FAQ
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="desktop-only"
              icon={icons.search}
              aria-label="Toggle site search"
              aria-expanded={state.search}
              onClick={() => toggle('search')}
            >
              Search
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="desktop-only"
              icon={icons.language}
              aria-label="Toggle language selector"
              aria-expanded={state.language}
              aria-haspopup="listbox"
              onClick={() => toggle('language')}
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
              onClick={() => toggle('drawer')}
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
          <SlotContainer
            variant="default"
            role="region"
            aria-label="Site search"
            aria-live="polite"
          >
            <HeaderSearch />
          </SlotContainer>
        ) : null}
        {state.language ? (
          <SlotContainer
            id="language-slot"
            variant="default"
            role="region"
            aria-label="Language selector"
          >
            <SlotExample2 />
          </SlotContainer>
        ) : null}
      </>
    );
  },
};

export const GovieHeader: StoryObj = {
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (
      <>
        <Header variant="default" aria-label="Site header">
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
    const [state, dispatch] = useReducer(headerUiReducer, initialHeaderUiState);
    const toggle = (key: string) => dispatch({ type: 'toggle', key });
    const close = (key: string) => dispatch({ type: 'close', key });
    const closeAll = () => dispatch({ type: 'closeAll' });

    const icons = useMemo(() => {
      return {
        faq: state.faq ? 'close' : 'info',
        language: state.language ? 'close' : 'mic',
        drawer: state.drawer ? 'close' : 'menu',
        search: state.search ? 'close' : 'search',
      } as Record<string, IconId>;
    }, [state.faq, state.language, state.drawer, state.search]);

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
            <HeaderMenuItemSlot>
              <>
                <span>Hello John | </span>
                <a
                  href="#"
                  className="gi-header-secondary-item gi-text-gray-950 gi-header-secondary-item-light"
                >
                  Logout
                </a>
              </>
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
              onClick={() => toggle('faq')}
            >
              FAQ
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="desktop-only"
              icon={icons.search}
              aria-label="Toggle site search"
              aria-expanded={state.search}
              onClick={() => toggle('search')}
            >
              Search
            </HeaderMenuItemButton>

            <HeaderMenuItemButton
              showItemMode="desktop-only"
              icon={icons.language}
              aria-label="Toggle language selector"
              aria-expanded={state.language}
              aria-haspopup="listbox"
              onClick={() => toggle('language')}
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
              onClick={() => toggle('drawer')}
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
          <SlotContainer
            variant="light"
            role="region"
            aria-label="Site search"
            aria-live="polite"
          >
            <HeaderSearch />
          </SlotContainer>
        ) : null}
        {state.language ? (
          <SlotContainer
            id="language-slot"
            variant="light"
            role="region"
            aria-label="Language selector"
          >
            <SlotExample2 />
          </SlotContainer>
        ) : null}
      </>
    );
  },
};
