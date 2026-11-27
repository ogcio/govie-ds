<template>
  <CoreFooterLogo v-bind="coreAttrs">
    <slot />
  </CoreFooterLogo>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CoreFooterLogo from '../atoms/footer/FooterLogo.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ HTMLAttributes;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
