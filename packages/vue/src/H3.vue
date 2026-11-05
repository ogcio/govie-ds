<template>
  <CoreH3 v-bind="coreAttrs" :size="size">
    <slot />
  </CoreH3>
</template>

<script setup lang="ts">
import CoreH3 from './atoms/heading/H3.vue';
import { useCoreAttrs } from './attrs';
import type { Props } from './heading';

defineOptions({ inheritAttrs: false });

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
