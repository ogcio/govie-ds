<template>
  <CoreFooterLogo v-bind="coreAttrs">
    <slot />
  </CoreFooterLogo>
</template>

<script setup lang="ts">
import CoreFooterLogo from '../atoms/footer/FooterLogo.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

const coreAttrs = useCoreAttrs();
</script>
