<template>
  <Container class="py-8 lg:py-12">
    <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="8">
      <Grid :size="{ base: 4, md: 8, lg: 9 }">
        <RouterView />
      </Grid>
      <Grid :size="{ base: 4, md: 8, lg: 3 }" class="lg:order-first">
        <SideNav :aria-label="`${heading} pages`">
          <RouterLink
            v-for="page in pages"
            :key="page.url"
            v-slot="{ href, navigate, isExactActive }"
            :to="page.url"
            custom
          >
            <SideNavItemLink
              :href="href"
              :selected="isExactActive"
              :aria-current="isExactActive ? 'page' : undefined"
              @click="navigate"
            >
              {{ page.title }}
            </SideNavItemLink>
          </RouterLink>
        </SideNav>
      </Grid>
    </Grid>
  </Container>
</template>

<script setup lang="ts">
import { Container, Grid, SideNav, SideNavItemLink } from '@ogcio/design-system-vue';
import { computed, provide } from 'vue';
import { useRoute } from 'vue-router';
import { sectionLayoutKey, type SiteSection } from './sections';

const props = defineProps<SiteSection>();

provide(sectionLayoutKey, props);

const route = useRoute();

/** The side navigation lists the child routes of the section route, the first matched record, under their titles. */
const pages = computed(() =>
  route.matched[0].children.map((page) => ({
    url: page.path ? `${props.url}/${page.path}` : props.url,
    title: page.meta?.title,
  })),
);
</script>
