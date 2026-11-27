<template>
  <Stack direction="column" :gap="8" align="stretch">
    <Breadcrumbs :aria-label="breadcrumbLabel">
      <RouterLink v-slot="{ href, navigate }" to="/" custom>
        <BreadcrumbLink :href="href" @click="navigate">{{ homeLabel }}</BreadcrumbLink>
      </RouterLink>
      <RouterLink v-if="section && section.heading !== heading" v-slot="{ href, navigate }" :to="section.url" custom>
        <BreadcrumbLink :href="href" @click="navigate">{{ section.heading }}</BreadcrumbLink>
      </RouterLink>
      <RouterLink v-slot="{ href, navigate }" :to="route.path" custom>
        <BreadcrumbLink :href="href" current @click="navigate">{{ heading }}</BreadcrumbLink>
      </RouterLink>
    </Breadcrumbs>

    <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="8">
      <Grid :size="section ? { base: 4, md: 8, lg: 8 } : { base: 4, md: 8, lg: 12 }">
        <article>
          <Stack direction="column" :gap="10" align="stretch">
            <Stack direction="column" :gap="4">
              <H1 size="lg">{{ heading }}</H1>
              <Paragraph size="lg">{{ lead }}</Paragraph>
            </Stack>
            <slot />
          </Stack>
        </article>
      </Grid>

      <Grid v-if="section" :size="{ base: 4, md: 8, lg: 4 }" class="hidden lg:block">
        <nav aria-labelledby="on-this-page" class="lg:sticky lg:top-6">
          <Stack direction="column" :gap="4">
            <H2 id="on-this-page" size="xs">On this page</H2>
            <ul class="space-y-2">
              <li v-for="part in sections" :key="part.anchor">
                <RouterLink v-slot="{ href, navigate }" :to="{ hash: `#${part.anchor}` }" custom>
                  <Link :href="href" @click="navigate">{{ part.heading }}</Link>
                </RouterLink>
              </li>
            </ul>
          </Stack>
        </nav>
      </Grid>
    </Grid>
  </Stack>
</template>

<script setup lang="ts">
import { BreadcrumbLink, Breadcrumbs, Grid, H1, H2, Link, Paragraph, Stack } from '@ogcio/design-system-vue';
import { inject, provide, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { pageSectionsKey, sectionLayoutKey, type Section } from './sections';

withDefaults(
  defineProps<{
    heading: string;
    lead: string;
    homeLabel?: string;
    breadcrumbLabel?: string;
  }>(),
  { homeLabel: 'Home', breadcrumbLabel: 'Breadcrumb' },
);

const section = inject(sectionLayoutKey, null);
const route = useRoute();

const sections = reactive<Section[]>([]);
provide(pageSectionsKey, sections);
</script>
