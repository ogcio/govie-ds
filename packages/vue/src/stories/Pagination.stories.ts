import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import * as stories from '../atoms/storybook/Pagination.meta';
import argTypes from '../atoms/storybook/argTypes';
import { Pagination, PaginationButton, PaginationEllipsis, PaginationLink, getPaginationList } from '../index';
import { ArrowBackwardIcon, ArrowForwardIcon } from '../icons';

const meta: Meta = {
  ...stories.meta,
  title: 'Navigation/Pagination/Pagination',
  component: Pagination,
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
};

export default meta;
type Story = StoryObj;

const TOTAL = 10;

export const Default: Story = {
  ...stories.Default,
  render: (args) => ({
    components: { ArrowBackwardIcon, ArrowForwardIcon, Pagination, PaginationButton, PaginationEllipsis },
    setup() {
      const current = ref(5);
      const pages = computed(() => getPaginationList({ current: current.value, total: TOTAL }));
      return { args, current, pages, total: TOTAL };
    },
    template: `
      <Pagination
        :id="args.id"
        :aria-label="args.ariaLabel"
        :aria-labelledby="args.ariaLabelledBy"
        :data-testid="args.dataTestId"
      >
        <PaginationButton class="gi-flex gi-gap-2" :disabled="current === 1" @click="current--">
          <ArrowBackwardIcon />
          Previous
        </PaginationButton>
        <template v-for="(page, index) in pages" :key="page === -1 ? 'ellipsis-' + index : page">
          <PaginationEllipsis v-if="page === -1" />
          <PaginationButton v-else :current="page === current" @click="current = page">{{ page }}</PaginationButton>
        </template>
        <PaginationButton class="gi-flex gi-gap-2" :disabled="current === total" @click="current++">
          Next
          <ArrowForwardIcon />
        </PaginationButton>
      </Pagination>
    `,
  }),
};

export const WithRouter: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`PaginationLink` works with Vue Router through `RouterLink custom`: the slot hands `href` and `navigate` to the design system link. Here the page lives in the `page` query parameter.',
      },
    },
  },
  render: () => ({
    components: {
      ArrowBackwardIcon,
      ArrowForwardIcon,
      Pagination,
      PaginationButton,
      PaginationEllipsis,
      PaginationLink,
      RouterLink,
    },
    setup() {
      const route = useRoute();
      const current = computed(() => Number(route.query.page ?? 1));
      const pages = computed(() => getPaginationList({ current: current.value, total: TOTAL }));
      return { current, pages, total: TOTAL };
    },
    template: `
      <Pagination aria-label="Search results pages">
        <PaginationButton v-if="current === 1" class="gi-flex gi-gap-2" disabled>
          <ArrowBackwardIcon />
          Previous
        </PaginationButton>
        <RouterLink v-else :to="{ query: { page: current - 1 } }" custom v-slot="{ href, navigate }">
          <PaginationLink class="gi-flex gi-gap-2" :href="href" @click="navigate">
            <ArrowBackwardIcon />
            Previous
          </PaginationLink>
        </RouterLink>
        <template v-for="(page, index) in pages" :key="page === -1 ? 'ellipsis-' + index : page">
          <PaginationEllipsis v-if="page === -1" />
          <RouterLink v-else :to="{ query: { page } }" custom v-slot="{ href, navigate }">
            <PaginationLink :href="href" :current="page === current" @click="navigate">{{ page }}</PaginationLink>
          </RouterLink>
        </template>
        <PaginationButton v-if="current === total" class="gi-flex gi-gap-2" disabled>
          Next
          <ArrowForwardIcon />
        </PaginationButton>
        <RouterLink v-else :to="{ query: { page: current + 1 } }" custom v-slot="{ href, navigate }">
          <PaginationLink class="gi-flex gi-gap-2" :href="href" @click="navigate">
            Next
            <ArrowForwardIcon />
          </PaginationLink>
        </RouterLink>
      </Pagination>
    `,
  }),
};
