<template>
  <CoreGrid v-bind="coreAttrs" :container="container" :columns="columns" :gap="gap" :size="size">
    <slot />
  </CoreGrid>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CoreGrid from './atoms/Grid.vue';
import type { ResponsiveValue, SpacingScale } from './atoms/constants';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ HTMLAttributes & {
  container?: boolean;
  columns?: ResponsiveValue<SpacingScale>;
  gap?: ResponsiveValue<SpacingScale>;
  size?: ResponsiveValue<SpacingScale>;
};

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
