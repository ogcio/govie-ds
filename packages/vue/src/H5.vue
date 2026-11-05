<template>
  <CoreH5 v-bind="coreAttrs" :size="size">
    <slot />
  </CoreH5>
</template>

<script setup lang="ts">
import CoreH5 from './atoms/heading/H5.vue';
import { useCoreAttrs } from './attrs';
import type { Props } from './heading';

defineOptions({ inheritAttrs: false });

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
