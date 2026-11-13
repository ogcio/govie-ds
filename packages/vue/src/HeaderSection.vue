<template>
  <CoreHeaderSection v-bind="coreAttrs" :variant="variant" :appearance="appearance" :max-width="maxWidth">
    <slot />
  </CoreHeaderSection>
</template>

<script setup lang="ts">
import CoreHeaderSection from './atoms/header/HeaderSection.vue';
import type { MaxWidth, SurfaceAppearance, SurfaceVariant, ValueOf } from './atoms/constants';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  /** `utility` is the slim bar above the main row, hidden below the `lg` breakpoint. */
  variant?: ValueOf<typeof SurfaceVariant>;
  appearance?: ValueOf<typeof SurfaceAppearance>;
  maxWidth?: ValueOf<typeof MaxWidth>;
};

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
