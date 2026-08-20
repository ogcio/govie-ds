<script setup lang="ts">
import { ref } from 'vue';
import {
  BlueskyIcon,
  Box,
  Button,
  Container,
  Divider,
  FacebookIcon,
  Footer,
  FooterLogo,
  FooterSection,
  Grid,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Header,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
  HeaderNavItemLink,
  HeaderNavItemSeparator,
  HeaderSection,
  HeaderTitle,
  IconButton,
  InfoIcon,
  InsetText,
  Link,
  LinkButton,
  LinkedinIcon,
  LogoGoldGreen,
  LogoHarpWhite,
  LogoWhite,
  LogoutIcon,
  MenuIcon,
  Paragraph,
  SearchIcon,
  SendIcon,
  Stack,
  Text,
  ThumbUpIcon,
  XIcon,
} from '@ogcio/design-system-vue';

const searchOpen = ref(false);
</script>

<template>
  <Header ariaLabel="Site header" id="GovieHeader">
    <HeaderSection variant="utility">
      <HeaderNav ariaLabel="Utility navigation" className="gi-text-sm">
        <HeaderNavItemLink ariaLabel="Switch to Gaeilge" href="#" lang="ga">Gaeilge</HeaderNavItemLink>
        <HeaderNavItemLink ariaLabel="Switch to English" href="#" lang="en" ariaCurrent="true">
          English
        </HeaderNavItemLink>
      </HeaderNav>
      <Stack direction="row" className="gi-text-center gi-items-center gi-py-1">
        <Text size="sm" className="gi-px-1">Hello Saoirse</Text>
        <Divider orientation="vertical" className="gi-my-1 gi-mx-1" />
        <Link
          appearance="light"
          className="gi-py-1 gi-px-2 hover:gi-bg-black hover:gi-bg-opacity-20"
          href="#"
          ariaLabel="Log out"
        >
          <LogoutIcon :size="16" />
        </Link>
      </Stack>
    </HeaderSection>
    <HeaderSection>
      <Link appearance="light" href="#" ariaLabel="Gov.ie home">
        <HeaderLogo>
          <LogoWhite :size="132" className="gi-hidden md:gi-block" />
          <LogoHarpWhite :size="32" className="gi-block md:gi-hidden" />
        </HeaderLogo>
      </Link>
      <HeaderTitle>Vue Example</HeaderTitle>
      <HeaderNav ariaLabel="Primary navigation">
        <HeaderNavItemLink visible="lg" href="#">Departments</HeaderNavItemLink>
        <HeaderNavItemLink visible="lg" href="#">Services</HeaderNavItemLink>
        <HeaderNavItemSeparator visible="md" />
        <HeaderNavItem visible="md">FAQ <InfoIcon /></HeaderNavItem>
        <HeaderNavItem
          visible="md"
          ariaLabel="Toggle site search"
          :ariaExpanded="searchOpen"
          ariaControls="site-search"
          @click="searchOpen = !searchOpen"
        >
          Search
          <SearchIcon />
        </HeaderNavItem>
        <HeaderNavItem :visible="{ xs: true, md: false }">Menu <MenuIcon /></HeaderNavItem>
      </HeaderNav>
    </HeaderSection>
  </Header>

  <Container inset>
    <H1>Design System</H1>
    <Paragraph>
      This page is a Vue example of the Government of Ireland Design System. It composes the primitives exported from
      <Text className="gi-font-bold">@ogcio/design-system-vue</Text>.
    </Paragraph>

    <InsetText v-if="searchOpen" id="site-search">
      Search is a service-owned panel. Toggle it from the header to show or hide this region.
    </InsetText>

    <H2>Actions</H2>
    <Stack direction="row" :gap="3" wrap>
      <Button>Primary action</Button>
      <a href="#">hello world</a>
      <Button variant="secondary">Secondary</Button>
      <Button variant="flat">Flat</Button>
      <LinkButton href="#">Continue</LinkButton>
      <IconButton ariaLabel="Send" variant="flat">
        <SendIcon />
      </IconButton>
      <ThumbUpIcon />
    </Stack>

    <H2>Links</H2>
    <Paragraph>
      Visit
      <Link variant="inline" href="https://www.gov.ie" external>gov.ie</Link>
      for official government information.
    </Paragraph>

    <H2>Layout</H2>
    <Grid container :columns="{ base: 4, md: 8 }" :gap="4">
      <Grid :size="{ base: 4, md: 4 }">
        <Box className="gi-p-4 gi-bg-gray-50">
          <H4>Departments</H4>
          <Paragraph>
            Primary navigation destinations belong in the header. Supporting content can sit in the page body.
          </Paragraph>
        </Box>
      </Grid>
      <Grid :size="{ base: 4, md: 4 }">
        <Box className="gi-p-4 gi-bg-gray-50">
          <H4>Services</H4>
          <Paragraph>
            Compose pages from Header, Container, Grid, Stack, and Footer rather than a single page template.
          </Paragraph>
        </Box>
      </Grid>
    </Grid>

    <H2>Headings</H2>
    <H3>Heading 3</H3>
    <H5>Heading 5</H5>
    <H6>Heading 6</H6>
    <H3 size="sm">Heading 3 with a smaller size</H3>

    <H2>Typography</H2>
    <Stack direction="column" :gap="2">
      <Text size="sm">Small text</Text>
      <Text size="md">Medium text</Text>
      <Text size="lg">Large text</Text>
      <Text size="xl">Extra large text</Text>
    </Stack>
    <Paragraph size="sm">Small paragraph.</Paragraph>
    <Paragraph size="lg" align="center">Large, centred paragraph.</Paragraph>

    <H2>Button appearances</H2>
    <Stack direction="row" :gap="3" wrap>
      <Button appearance="dark">Dark primary</Button>
      <Button variant="secondary" appearance="dark">Dark secondary</Button>
      <Button variant="flat" appearance="dark">Dark flat</Button>
    </Stack>
    <Box className="gi-p-4 gi-bg-gray-950">
      <Stack direction="row" :gap="3" wrap>
        <Button appearance="light">Light primary</Button>
        <Button variant="secondary" appearance="light">Light secondary</Button>
        <Button variant="flat" appearance="light">Light flat</Button>
      </Stack>
    </Box>

    <H3>Button sizes</H3>
    <Stack direction="row" :gap="3" wrap align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Stack>

    <H3>Disabled</H3>
    <Stack direction="row" :gap="3" wrap>
      <Button disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="flat" disabled>Flat</Button>
    </Stack>

    <H2>Icon buttons</H2>
    <Stack direction="row" :gap="3" wrap align="center">
      <IconButton ariaLabel="Search" size="sm">
        <SearchIcon />
      </IconButton>
      <IconButton ariaLabel="Info" variant="secondary">
        <InfoIcon />
      </IconButton>
      <IconButton ariaLabel="Menu" variant="flat" appearance="dark">
        <MenuIcon />
      </IconButton>
      <IconButton ariaLabel="Send" size="lg">
        <SendIcon />
      </IconButton>
      <IconButton ariaLabel="Disabled" disabled>
        <LogoutIcon />
      </IconButton>
    </Stack>

    <H2>Link buttons</H2>
    <Stack direction="row" :gap="3" wrap>
      <LinkButton href="#" variant="secondary">Secondary link</LinkButton>
      <LinkButton href="#" variant="flat">Flat link</LinkButton>
      <LinkButton href="#" size="sm">Small link</LinkButton>
      <LinkButton href="https://www.gov.ie" external>External link</LinkButton>
    </Stack>

    <H2>Inset text</H2>
    <InsetText> Use inset text to highlight supporting information that is not an error or a warning. </InsetText>

    <H2>Divider</H2>
    <Paragraph>Content above the rule.</Paragraph>
    <Divider className="gi-my-4" />
    <Paragraph>Content below the rule.</Paragraph>
  </Container>

  <Footer ariaLabel="Footer">
    <FooterSection className="gi-text-black">
      <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="4">
        <Grid :size="{ base: 4, md: 4, lg: 3 }">
          <H4 className="gi-my-4">Services</H4>
          <Divider className="gi-my-4" />
          <Stack direction="column" :gap="2">
            <Link variant="inline" appearance="inherit" href="#">Public Services</Link>
            <Link variant="inline" appearance="inherit" href="#">Business Services</Link>
            <Link variant="inline" appearance="inherit" href="#">Online Services</Link>
          </Stack>
        </Grid>
        <Grid :size="{ base: 4, md: 4, lg: 3 }">
          <H4 className="gi-my-4">Departments</H4>
          <Divider className="gi-my-4" />
          <Stack direction="column" :gap="2">
            <Link variant="inline" appearance="inherit" href="#">Department of Health</Link>
            <Link variant="inline" appearance="inherit" href="#">Department of Education</Link>
            <Link variant="inline" appearance="inherit" href="#">Department of Finance</Link>
          </Stack>
        </Grid>
        <Grid :size="{ base: 4, md: 4, lg: 3 }">
          <H4 className="gi-my-4">Publications</H4>
          <Divider className="gi-my-4" />
          <Stack direction="column" :gap="2">
            <Link variant="inline" appearance="inherit" href="#">Reports</Link>
            <Link variant="inline" appearance="inherit" href="#">Statistics</Link>
            <Link variant="inline" appearance="inherit" href="#">Legislation</Link>
          </Stack>
        </Grid>
        <Grid :size="{ base: 4, md: 4, lg: 3 }">
          <H4 className="gi-my-4">Contact</H4>
          <Divider className="gi-my-4" />
          <Stack direction="column" :gap="2">
            <Link variant="inline" appearance="inherit" href="#">Find an Office</Link>
            <Link variant="inline" appearance="inherit" href="#">Phone Directory</Link>
            <Link variant="inline" appearance="inherit" href="#">Feedback</Link>
          </Stack>
        </Grid>
      </Grid>

      <Divider className="gi-my-8" />
      <Stack :direction="{ base: 'column', md: 'row' }" :gap="6">
        <Stack direction="column" :gap="6">
          <Stack :direction="{ base: 'column', md: 'row' }" :gap="4" wrap>
            <Link variant="inline" appearance="inherit" href="#">About Us</Link>
            <Link variant="inline" appearance="inherit" href="#">Contact</Link>
            <Link variant="inline" appearance="inherit" href="#">Sitemap</Link>
            <Link variant="inline" appearance="inherit" href="#">Privacy Policy</Link>
            <Link variant="inline" appearance="inherit" href="#">Terms of Service</Link>
          </Stack>
          <Stack direction="row" :gap="4">
            <XIcon label="X" />
            <FacebookIcon label="Facebook" />
            <BlueskyIcon label="Bluesky" />
            <LinkedinIcon label="LinkedIn" />
          </Stack>
        </Stack>
        <FooterLogo>
          <LogoGoldGreen size="181" label="Gov.ie Logo" />
        </FooterLogo>
      </Stack>
    </FooterSection>
    <FooterSection variant="utility">
      <Stack wrap :direction="{ base: 'column', md: 'row' }" :gap="4" justify="center" align="center">
        <Link variant="inline" appearance="inherit" href="#">Privacy Policy</Link>
        <Link variant="inline" appearance="inherit" href="#">Accessibility</Link>
        <Text className="gi-text-sm">© 2026 Government of Ireland.</Text>
      </Stack>
    </FooterSection>
  </Footer>
</template>
