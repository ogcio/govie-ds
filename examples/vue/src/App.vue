<template>
  <RouterLink v-slot="{ href, navigate }" :to="{ query: route.query, hash: '#main-content' }" custom>
    <Link
      :href="href"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:p-2 focus:bg-color-surface-system-neutral-default"
      @click="navigate"
    >
      Skip to main content
    </Link>
  </RouterLink>
  <div class="flex min-h-screen flex-col">
    <SiteHeader />
    <main id="main-content" ref="main" tabindex="-1" class="flex-1 focus:outline-none">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { Link } from '@ogcio/design-system-vue';
import { onBeforeUnmount, useTemplateRef } from 'vue';
import { START_LOCATION, useRoute, useRouter } from 'vue-router';
import SiteFooter from './components/SiteFooter.vue';
import SiteHeader from './components/SiteHeader.vue';

const route = useRoute();
const main = useTemplateRef('main');

// Move focus to the new page after a navigation, unless it targets an anchor or is the first page load.
onBeforeUnmount(
  useRouter().afterEach((to, from, failure) => {
    if (!failure && from !== START_LOCATION && !to.hash) {
      main.value?.focus({ preventScroll: true });
    }
  }),
);
</script>
