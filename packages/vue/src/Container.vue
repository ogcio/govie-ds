<template>
  <CoreContainer v-bind="coreAttrs" :inset="inset" :gutters="gutters" :max-width="maxWidth">
    <slot />
  </CoreContainer>
</template>

<script setup lang="ts">
import CoreContainer from './atoms/Container.vue';
import type { MaxWidth, ValueOf } from './atoms/constants';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  inset?: boolean;
  gutters?: boolean;
  maxWidth?: ValueOf<typeof MaxWidth>;
};

withDefaults(defineProps<Props>(), { gutters: true, maxWidth: undefined });

const coreAttrs = useCoreAttrs();
</script>
