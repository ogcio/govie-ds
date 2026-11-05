<template>
  <CoreH4 v-bind="coreAttrs" :size="size">
    <slot />
  </CoreH4>
</template>

<script setup lang="ts">
import CoreH4 from './atoms/heading/H4.vue';
import { useCoreAttrs } from './attrs';
import type { Props } from './heading';

defineOptions({ inheritAttrs: false });

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
