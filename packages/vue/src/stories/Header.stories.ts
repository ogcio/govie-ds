import type { Meta, StoryObj } from '@storybook/vue3-vite';
import omit from 'lodash/omit';
import { ref } from 'vue';
import * as stories from '../atoms/storybook/Header.meta';
import argTypes from '../atoms/storybook/argTypes';
import {
  Divider,
  Header,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
  HeaderNavItemLink,
  HeaderNavItemSeparator,
  HeaderSection,
  HeaderTitle,
  Link,
  Stack,
  Text,
} from '../index';
import { InfoIcon, LogoutIcon, MenuIcon, MicIcon, SearchIcon } from '../icons';
import { LogoBlack, LogoHarpBlack, LogoHarpWhite, LogoWhite } from '../logos';

const meta: Meta = {
  ...stories.meta,
  title: 'Layout/Header/Header',
  component: Header,
  args: omit(stories.meta.args, ['children', 'dataTestId']),
  argTypes: {
    ...stories.meta.argTypes,
    class: {
      ...argTypes.class,
      table: { type: { summary: 'string | object | array' } },
    },
    style: {
      ...argTypes.style,
      table: { type: { summary: 'string | object | array' } },
    },
    // The shared play reads `dataTestId` from the story args; the template binds it as `data-testid`.
    dataTestId: { table: { disable: true } },
  },
  parameters: {
    ...stories.meta.parameters,
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

const components = {
  Divider,
  Header,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
  HeaderNavItemLink,
  HeaderNavItemSeparator,
  HeaderSection,
  HeaderTitle,
  InfoIcon,
  Link,
  LogoBlack,
  LogoHarpBlack,
  LogoHarpWhite,
  LogoWhite,
  LogoutIcon,
  MenuIcon,
  MicIcon,
  SearchIcon,
  Stack,
  Text,
};

export const Default: Story = {
  ...stories.Default,
  parameters: {
    docs: {
      description: {
        story:
          'Responsive header composition in the default colour. It matches the Light story layout, with a utility bar, branding, a long title, and nav items that collapse at smaller breakpoints. Use this as the default reference for assembling Header components together.',
      },
    },
  },
  render: (args) => ({
    components,
    setup: () => ({ args, menuOpen: ref(false) }),
    template: `
      <Header
        :id="args.id"
        :aria-label="args.ariaLabel"
        :aria-labelledby="args.ariaLabelledBy"
        :data-testid="args.dataTestId"
      >
        <HeaderSection variant="utility" appearance="default">
          <HeaderNav aria-label="Utility navigation" class="gi-text-sm">
            <HeaderNavItemLink aria-label="Switch to Gaeilge" href="#">Gaeilge</HeaderNavItemLink>
            <HeaderNavItemLink aria-label="Switch to English" href="#">English</HeaderNavItemLink>
          </HeaderNav>
          <Stack direction="row" class="gi-text-center gi-items-center gi-py-1">
            <Text size="sm" class="gi-px-1">Hello Saoirse</Text>
            <Divider orientation="vertical" class="gi-my-1 gi-mx-1" />
            <Link
              appearance="light"
              class="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-20"
              href="#"
              aria-label="Log out"
            >
              <LogoutIcon :size="16" />
            </Link>
          </Stack>
        </HeaderSection>
        <HeaderSection appearance="default">
          <HeaderLogo>
            <Link appearance="light" href="#" aria-label="Gov.ie home">
              <LogoWhite :size="132" class="gi-hidden md:gi-block" />
              <LogoHarpWhite :size="32" class="gi-block md:gi-hidden" />
            </Link>
          </HeaderLogo>
          <HeaderTitle>Title</HeaderTitle>
          <HeaderNav aria-label="Primary navigation">
            <HeaderNavItemLink visible="lg" href="#">Departments</HeaderNavItemLink>
            <HeaderNavItemLink visible="lg" href="#">Services</HeaderNavItemLink>
            <HeaderNavItemSeparator visible="md" />
            <HeaderNavItem visible="md">FAQ <InfoIcon /></HeaderNavItem>
            <HeaderNavItem visible="md">Search <SearchIcon /></HeaderNavItem>
            <HeaderNavItem visible="md">Language <MicIcon /></HeaderNavItem>
            <HeaderNavItem
              :visible="{ base: true, md: false }"
              :aria-expanded="menuOpen"
              @click="menuOpen = !menuOpen"
            >
              Menu <MenuIcon />
            </HeaderNavItem>
          </HeaderNav>
        </HeaderSection>
      </Header>
    `,
  }),
};

export const Light: Story = {
  ...stories.Default,
  parameters: {
    docs: {
      description: {
        story:
          'Same complete header layout rendered with the light section appearance. Sections use a light surface and dark text, paired with the dark Gov.ie logo, so the header can sit on pale page backgrounds. Compare this with Default when choosing between the default and light themes.',
      },
    },
  },
  render: (args) => ({
    components,
    setup: () => ({ args, menuOpen: ref(false) }),
    template: `
      <Header
        :id="args.id"
        :aria-label="args.ariaLabel"
        :aria-labelledby="args.ariaLabelledBy"
        :data-testid="args.dataTestId"
      >
        <HeaderSection variant="utility" appearance="light">
          <HeaderNav aria-label="Utility navigation" class="gi-text-sm">
            <HeaderNavItemLink aria-label="Switch to Gaeilge" href="#">Gaeilge</HeaderNavItemLink>
            <HeaderNavItemLink aria-label="Switch to English" href="#">English</HeaderNavItemLink>
          </HeaderNav>
          <Stack direction="row" class="gi-text-center gi-items-center gi-py-1">
            <Text size="sm" class="gi-px-1">Hello Saoirse</Text>
            <Divider orientation="vertical" class="gi-my-1 gi-mx-1" />
            <Link
              class="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-10"
              href="#"
              aria-label="Log out"
            >
              <LogoutIcon :size="16" />
            </Link>
          </Stack>
        </HeaderSection>
        <HeaderSection appearance="light">
          <HeaderLogo>
            <Link href="#" aria-label="Gov.ie home">
              <LogoBlack :size="132" class="gi-hidden md:gi-block" />
              <LogoHarpBlack :size="32" class="gi-block md:gi-hidden" />
            </Link>
          </HeaderLogo>
          <HeaderTitle>Light Mode Title</HeaderTitle>
          <HeaderNav aria-label="Primary navigation">
            <HeaderNavItemLink visible="lg" href="#">Departments</HeaderNavItemLink>
            <HeaderNavItemLink visible="lg" href="#">Services</HeaderNavItemLink>
            <HeaderNavItemSeparator visible="md" />
            <HeaderNavItem visible="md">FAQ <InfoIcon /></HeaderNavItem>
            <HeaderNavItem visible="md">Search <SearchIcon /></HeaderNavItem>
            <HeaderNavItem visible="md">Language <MicIcon /></HeaderNavItem>
            <HeaderNavItem
              :visible="{ base: true, md: false }"
              :aria-expanded="menuOpen"
              @click="menuOpen = !menuOpen"
            >
              Menu <MenuIcon />
            </HeaderNavItem>
          </HeaderNav>
        </HeaderSection>
      </Header>
    `,
  }),
};

export const TitleAndLogoAsLinks: Story = {
  ...stories.Default,
  parameters: {
    docs: {
      description: {
        story:
          'Wrap a `Link` in `HeaderLogo` and in `HeaderTitle` to make the branding and service name navigable. Use this when both should return the user to the service home page.',
      },
    },
  },
  render: (args) => ({
    components,
    setup: () => ({ args }),
    template: `
      <Header
        :id="args.id"
        :aria-label="args.ariaLabel"
        :aria-labelledby="args.ariaLabelledBy"
        :data-testid="args.dataTestId"
      >
        <HeaderSection class="!gi-justify-start">
          <HeaderLogo>
            <Link href="#" appearance="light" aria-label="Gov.ie home">
              <LogoWhite :size="132" />
            </Link>
          </HeaderLogo>
          <HeaderTitle>
            <Link href="#" appearance="light">Title as a link</Link>
          </HeaderTitle>
        </HeaderSection>
      </Header>
    `,
  }),
};
