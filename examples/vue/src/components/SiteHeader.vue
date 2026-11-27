<template>
  <Header aria-label="Site header">
    <HeaderSection variant="utility">
      <HeaderNav aria-label="Language">
        <RouterLink v-slot="{ href, navigate }" to="/gaeilge" custom>
          <HeaderNavItemLink
            lang="ga"
            :href="href"
            :aria-current="isCurrent('/gaeilge') ? 'page' : undefined"
            @click="navigate"
          >
            Gaeilge
          </HeaderNavItemLink>
        </RouterLink>
        <RouterLink v-slot="{ href, navigate }" to="/" custom>
          <HeaderNavItemLink lang="en" :href="href" @click="navigate">English</HeaderNavItemLink>
        </RouterLink>
      </HeaderNav>
    </HeaderSection>

    <HeaderSection>
      <HeaderLogo>
        <RouterLink v-slot="{ href, navigate }" to="/" custom>
          <!-- eslint-disable-next-line vuejs-accessibility/aria-unsupported-elements -- `Link` renders an anchor, not the HTML `link` element -->
          <Link appearance="light" :href="href" aria-label="Department of Engagement home" @click="navigate">
            <LogoWhite :size="132" class="hidden md:block" />
            <LogoHarpWhite :size="32" class="block md:hidden" />
          </Link>
        </RouterLink>
      </HeaderLogo>
      <HeaderTitle>
        <RouterLink v-slot="{ href, navigate }" to="/" custom>
          <Link appearance="light" underline="none" :href="href" @click="navigate">Department of Engagement</Link>
        </RouterLink>
      </HeaderTitle>
      <HeaderNav aria-label="Primary navigation">
        <RouterLink v-for="item in navigation" :key="item.url" v-slot="{ href, navigate }" :to="item.url" custom>
          <HeaderNavItemLink
            visible="lg"
            :href="href"
            :aria-current="isCurrent(item.url) ? 'true' : undefined"
            @click="navigate"
          >
            {{ item.label }}
          </HeaderNavItemLink>
        </RouterLink>
        <HeaderNavItem
          :visible="{ base: true, lg: false }"
          aria-controls="mobile-navigation"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <template v-if="menuOpen">
            Close
            <CloseIcon />
          </template>
          <template v-else>
            Menu
            <MenuIcon />
          </template>
        </HeaderNavItem>
      </HeaderNav>
    </HeaderSection>

    <Box
      v-if="menuOpen"
      id="mobile-navigation"
      class="py-4 border-b-xs border-color-border-system-neutral-subtle bg-color-surface-system-neutral-default lg:hidden"
    >
      <Container>
        <SideNav aria-label="Mobile navigation">
          <RouterLink v-for="item in navigation" :key="item.url" v-slot="{ href, navigate }" :to="item.url" custom>
            <SideNavItemLink
              :href="href"
              :selected="isCurrent(item.url)"
              :aria-current="isCurrent(item.url) ? 'true' : undefined"
              @click="navigate"
            >
              {{ item.label }}
            </SideNavItemLink>
          </RouterLink>
          <RouterLink v-slot="{ href, navigate }" to="/gaeilge" custom>
            <SideNavItemLink
              lang="ga"
              :href="href"
              :selected="isCurrent('/gaeilge')"
              :aria-current="isCurrent('/gaeilge') ? 'page' : undefined"
              @click="navigate"
            >
              Gaeilge
            </SideNavItemLink>
          </RouterLink>
        </SideNav>
      </Container>
    </Box>
  </Header>
</template>

<script setup lang="ts">
import {
  Box,
  Container,
  Header,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
  HeaderNavItemLink,
  HeaderSection,
  HeaderTitle,
  Link,
  SideNav,
  SideNavItemLink,
} from '@ogcio/design-system-vue';
import { CloseIcon, MenuIcon } from '@ogcio/design-system-vue/icons';
import { LogoHarpWhite, LogoWhite } from '@ogcio/design-system-vue/logos';
import { onBeforeUnmount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const navigation = [
  { label: 'Services', url: '/services' },
  { label: 'Design System', url: '/design-system' },
  { label: 'News', url: '/news' },
  { label: 'About us', url: '/about' },
  { label: 'Contact', url: '/contact' },
];

const route = useRoute();

/** A section link stays current on every page below it. */
const isCurrent = (url: string) => route.path === url || route.path.startsWith(`${url}/`);

const menuOpen = ref(false);

// Close the menu after every navigation, including a click on the link to the current page.
onBeforeUnmount(useRouter().afterEach(() => (menuOpen.value = false)));
</script>
