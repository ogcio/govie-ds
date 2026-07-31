import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { headerMeta, HeaderComposed as CompleteHeaderStory } from '@/atoms/storybook/Header.meta';
import Header from '@/atoms/header/Header';
import HeaderLogo from '@/atoms/header/HeaderLogo';
import HeaderSection from '@/atoms/header/HeaderSection';
import HeaderTitle from '@/atoms/header/HeaderTitle';
import HeaderNav from '@/atoms/header/HeaderNav';
import HeaderNavItem from '@/atoms/header/HeaderNavItem';
import HeaderNavItemLink from '@/atoms/header/HeaderNavItemLink';
import HeaderNavItemSeparator from '@/atoms/header/HeaderNavItemSeparator';
import LogoWhite from '@/atoms/icons/logos/LogoWhite';
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
import { useToggleMap } from '@/hooks/use-toggle-map';
import { HeaderSearch } from '@/header/components/header-search';
import Container from '@/atoms/Container';
import { FormField, FormFieldLabel } from '@/forms/form-field/form-field';
import { SelectItemNext, SelectNext } from '@/select/select-next';
import { DrawerBody, DrawerFooter, DrawerWrapper } from '@/drawer/drawer';
import { DrawerMenuExample } from '@/drawer/drawer.content';

const meta = {
  ...headerMeta,
  title: 'Layout/Header/Header',
  component: Header,
} as Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteHeader: Story = {
  ...CompleteHeaderStory,
  render: function Render(_props) {
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
        <Header {..._props}>
          <HeaderSection variant="utility">
            <HeaderNav ariaLabel="Utility navigation" className="gi-text-sm">
              <HeaderNavItemLink ariaLabel="Switch to Gaeilge" href="#">
                Gaeilge
              </HeaderNavItemLink>
              <HeaderNavItemLink ariaLabel="Switch to Gaeilge" href="#">
                English
              </HeaderNavItemLink>
              <Stack direction="row" className="gi-text-center gi-items-center">
                <Text size="sm">Hello Saoirse</Text>
                <HeaderNavItemSeparator className="gi-my-2" />
                <HeaderNavItemLink href="#">
                  <LogoutIcon size={16} />
                </HeaderNavItemLink>
              </Stack>
            </HeaderNav>
          </HeaderSection>
          <HeaderSection>
            <Link appearance="light" href="#">
              <HeaderLogo>
                <LogoWhite />
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
              <HeaderNavItemSeparator visible="lg" />
              <HeaderNavItem visible="lg">
                FAQ <InfoIcon />
              </HeaderNavItem>
              <HeaderNavItem onClick={handleMenuItemButton('search')} ariaExpanded={state.search} visible="lg">
                Search {state.search ? <CloseIcon /> : <SearchIcon />}
              </HeaderNavItem>
              <HeaderNavItem onClick={handleMenuItemButton('language')} ariaExpanded={state.language} visible="lg">
                Language
                {state.language ? <CloseIcon /> : <MicIcon />}
              </HeaderNavItem>
              <HeaderNavItem onClick={handleMenuItemButton('drawer')} visible={{ base: true, lg: false }}>
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
        <Container inset>
          {state.search && <HeaderSearch />}
          {state.language && (
            <FormField className="gi-w-[300px]">
              <FormFieldLabel>Languages</FormFieldLabel>
              <SelectNext id="slot-example-2">
                <SelectItemNext value="gaeilge">Gaeilge</SelectItemNext>
                <SelectItemNext value="english">English</SelectItemNext>
                <SelectItemNext value="spanish">Spanish</SelectItemNext>
                <SelectItemNext value="italian">Italian</SelectItemNext>
              </SelectNext>
            </FormField>
          )}
        </Container>
      </>
    );
  },
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
