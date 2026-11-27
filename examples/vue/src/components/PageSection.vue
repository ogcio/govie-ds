<template>
  <section :aria-labelledby="anchor">
    <Stack direction="column" :gap="4" align="stretch">
      <H2 :id="anchor" size="md" tabindex="-1" class="scroll-mt-6 focus:outline-none">{{ heading }}</H2>
      <slot />
    </Stack>
  </section>
</template>

<script setup lang="ts">
import { H2, Stack } from '@ogcio/design-system-vue';
import { inject, onBeforeUnmount } from 'vue';
import { pageSectionsKey, type Section } from './sections';

const props = defineProps<Section>();

const sections = inject(pageSectionsKey, null);
sections?.push(props);
onBeforeUnmount(() => {
  sections?.splice(sections.indexOf(props), 1);
});
</script>
