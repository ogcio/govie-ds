<template>
  <CoreHeader v-bind="coreAttrs">
    <slot />
  </CoreHeader>
</template>

<script setup lang="ts">
import CoreHeader from './atoms/header/Header.vue';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

const coreAttrs = useCoreAttrs();
</script>
