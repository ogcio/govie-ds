<template>
  <Container class="py-8 lg:py-12">
    <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="8">
      <Grid :size="{ base: 4, md: 8, lg: 8 }" class="mx-auto">
        <Stack direction="column" :gap="8" align="stretch">
          <Breadcrumbs aria-label="Breadcrumb">
            <RouterLink v-slot="{ href, navigate }" to="/" custom>
              <BreadcrumbLink :href="href" @click="navigate">Home</BreadcrumbLink>
            </RouterLink>
            <RouterLink v-slot="{ href, navigate }" to="/news" custom>
              <BreadcrumbLink :href="href" current @click="navigate">News</BreadcrumbLink>
            </RouterLink>
          </Breadcrumbs>

          <Stack direction="column" :gap="6" align="stretch">
            <Stack direction="column" :gap="2">
              <H1 size="lg">News</H1>
              <Text size="sm" class="text-color-text-system-neutral-muted">Page {{ current }} of {{ total }}</Text>
            </Stack>
            <Paragraph size="lg">Announcements and updates from the Department of Engagement.</Paragraph>

            <template v-for="(item, index) in items" :key="item.url">
              <Divider v-if="index > 0" />
              <article>
                <Stack direction="column" :gap="2">
                  <Text size="sm" class="text-color-text-system-neutral-muted">
                    <time :datetime="item.date">{{ newsDateFormat.format(new Date(item.date)) }}</time>
                  </Text>
                  <H2 size="sm">
                    <RouterLink v-slot="{ href, navigate }" :to="item.url" custom>
                      <Link :href="href" @click="navigate">{{ item.heading }}</Link>
                    </RouterLink>
                  </H2>
                  <Paragraph>{{ item.lead }}</Paragraph>
                </Stack>
              </article>
            </template>
          </Stack>

          <Divider />
          <Pagination aria-label="News pages" class="[&_li:first-child]:mr-auto [&_li:last-child]:ml-auto">
            <PaginationButton v-if="current === 1" class="flex gap-2" disabled>
              <ArrowBackwardIcon />
              <span class="sr-only md:not-sr-only">Previous</span>
            </PaginationButton>
            <RouterLink v-else v-slot="{ href, navigate }" :to="pageLocation(current - 1)" custom>
              <PaginationLink class="flex gap-2" :href="href" @click="navigate">
                <ArrowBackwardIcon />
                <span class="sr-only md:not-sr-only">Previous</span>
              </PaginationLink>
            </RouterLink>
            <template v-for="(page, index) in pages" :key="page === -1 ? `ellipsis-${index}` : page">
              <PaginationEllipsis v-if="page === -1" />
              <RouterLink v-else v-slot="{ href, navigate }" :to="pageLocation(page)" custom>
                <PaginationLink :href="href" :current="page === current" @click="navigate">{{ page }}</PaginationLink>
              </RouterLink>
            </template>
            <PaginationButton v-if="current === total" class="flex gap-2" disabled>
              <span class="sr-only md:not-sr-only">Next</span>
              <ArrowForwardIcon />
            </PaginationButton>
            <RouterLink v-else v-slot="{ href, navigate }" :to="pageLocation(current + 1)" custom>
              <PaginationLink class="flex gap-2" :href="href" @click="navigate">
                <span class="sr-only md:not-sr-only">Next</span>
                <ArrowForwardIcon />
              </PaginationLink>
            </RouterLink>
          </Pagination>
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
  getPaginationList,
  Grid,
  H1,
  H2,
  Link,
  Pagination,
  PaginationButton,
  PaginationEllipsis,
  PaginationLink,
  Paragraph,
  Stack,
  Text,
} from '@ogcio/design-system-vue';
import { ArrowBackwardIcon, ArrowForwardIcon } from '@ogcio/design-system-vue/icons';
import { computed } from 'vue';
import { useRoute, type RouteLocationRaw } from 'vue-router';
import { news, newsDateFormat } from './news';

const PAGE_SIZE = 5;

const route = useRoute();

const total = Math.ceil(news.length / PAGE_SIZE);

/** The page lives in the `page` query parameter; a missing or invalid value shows the nearest page. */
const current = computed(() => Math.min(Math.max(Math.trunc(Number(route.query.page)) || 1, 1), total));
const items = computed(() => news.slice((current.value - 1) * PAGE_SIZE, current.value * PAGE_SIZE));
const pages = computed(() => getPaginationList({ current: current.value, total }));

/** The first page keeps the plain `/news` address. */
const pageLocation = (page: number): RouteLocationRaw => ({ query: page === 1 ? {} : { page } });
</script>
