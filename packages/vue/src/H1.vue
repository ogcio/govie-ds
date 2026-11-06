<template>
  <CoreH1 v-bind="coreAttrs" :size="size">
    <slot />
  </CoreH1>
</template>

<script setup lang="ts">
import CoreH1 from './atoms/heading/H1.vue';
import { useCoreAttrs } from './attrs';
import type { Props } from './heading';

defineOptions({ inheritAttrs: false });

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
