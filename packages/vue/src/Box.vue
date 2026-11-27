<template>
  <CoreBox v-bind="coreAttrs">
    <slot />
  </CoreBox>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CoreBox from './atoms/Box.vue';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ HTMLAttributes;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
