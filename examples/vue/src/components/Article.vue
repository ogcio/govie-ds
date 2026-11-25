<template>
  <Container class="py-8 lg:py-12">
    <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="8">
      <Grid :size="{ base: 4, md: 8, lg: 8 }" class="mx-auto min-w-0">
        <Stack direction="column" :gap="8" align="stretch">
          <Breadcrumbs aria-label="Breadcrumb" class="[&_li:last-child]:min-w-0">
            <RouterLink v-slot="{ href, navigate }" to="/" custom>
              <BreadcrumbLink :href="href" @click="navigate">Home</BreadcrumbLink>
            </RouterLink>
            <RouterLink v-slot="{ href, navigate }" to="/news" custom>
              <BreadcrumbLink :href="href" @click="navigate">News</BreadcrumbLink>
            </RouterLink>
            <RouterLink v-slot="{ href, navigate }" :to="route.path" custom>
              <BreadcrumbLink :href="href" current @click="navigate">{{ heading }}</BreadcrumbLink>
            </RouterLink>
          </Breadcrumbs>

          <article>
            <Stack direction="column" :gap="10" align="stretch">
              <Stack direction="column" :gap="4">
                <Text size="sm" class="text-color-text-system-neutral-muted">
                  Press release ·
                  <time :datetime="date">{{ dateFormat.format(new Date(date)) }}</time>
                </Text>
                <H1 size="lg">{{ heading }}</H1>
                <Paragraph size="lg">{{ lead }}</Paragraph>
              </Stack>
              <slot />
            </Stack>
          </article>

          <Divider />
          <RouterLink v-slot="{ href, navigate }" to="/news" custom>
            <Link :href="href" class="self-start inline-flex items-center gap-1 font-bold" @click="navigate">
              <ArrowLeftIcon :size="20" />
              All news
            </Link>
          </RouterLink>
        </Stack>
      </Grid>
    </Grid>
  </Container>
</template>

<script setup lang="ts">
import {
  BreadcrumbLink,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  H1,
  Link,
  Paragraph,
  Stack,
  Text,
} from '@ogcio/design-system-vue';
import { ArrowLeftIcon } from '@ogcio/design-system-vue/icons';
import { useRoute } from 'vue-router';

defineProps<{
  heading: string;
  /** ISO date, e.g. `2026-08-28`. */
  date: string;
  lead: string;
}>();

const route = useRoute();

const dateFormat = new Intl.DateTimeFormat('en-IE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});
</script>
