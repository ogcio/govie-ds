<template>
  <CoreH6 v-bind="coreAttrs" :size="size">
    <slot />
  </CoreH6>
</template>

<script setup lang="ts">
import CoreH6 from './atoms/heading/H6.vue';
import { useCoreAttrs } from './attrs';
import type { Props } from './heading';

defineOptions({ inheritAttrs: false });

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
