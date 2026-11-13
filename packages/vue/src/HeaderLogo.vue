<template>
  <CoreHeaderLogo v-bind="coreAttrs">
    <slot />
  </CoreHeaderLogo>
</template>

<script setup lang="ts">
import CoreHeaderLogo from './atoms/header/HeaderLogo.vue';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

const coreAttrs = useCoreAttrs();
</script>
