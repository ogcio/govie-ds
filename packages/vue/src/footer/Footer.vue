<template>
  <CoreFooter v-bind="coreAttrs">
    <slot />
  </CoreFooter>
</template>

<script setup lang="ts">
import CoreFooter from '../atoms/footer/Footer.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

const coreAttrs = useCoreAttrs();
</script>
