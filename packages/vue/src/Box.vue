<template>
  <CoreBox v-bind="coreAttrs">
    <slot />
  </CoreBox>
</template>

<script setup lang="ts">
import CoreBox from './atoms/Box.vue';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

const coreAttrs = useCoreAttrs();
</script>
