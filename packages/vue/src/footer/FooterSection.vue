<template>
  <CoreFooterSection v-bind="coreAttrs" :variant="variant" :max-width="maxWidth">
    <slot />
  </CoreFooterSection>
</template>

<script setup lang="ts">
import CoreFooterSection from '../atoms/footer/FooterSection.vue';
import type { MaxWidth, SurfaceVariant, ValueOf } from '../atoms/constants';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  variant?: ValueOf<typeof SurfaceVariant>;
  maxWidth?: ValueOf<typeof MaxWidth>;
};

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
