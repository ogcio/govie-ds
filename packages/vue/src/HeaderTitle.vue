<template>
  <CoreHeaderTitle v-bind="coreAttrs">
    <slot />
  </CoreHeaderTitle>
</template>

<script setup lang="ts">
import CoreHeaderTitle from './atoms/header/HeaderTitle.vue';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

const coreAttrs = useCoreAttrs();
</script>
