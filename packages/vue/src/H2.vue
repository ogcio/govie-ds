<template>
  <CoreH2 v-bind="coreAttrs" :size="size">
    <slot />
  </CoreH2>
</template>

<script setup lang="ts">
import CoreH2 from './atoms/heading/H2.vue';
import { useCoreAttrs } from './attrs';
import type { Props } from './heading';

defineOptions({ inheritAttrs: false });

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
