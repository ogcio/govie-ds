<template>
  <CorePagination v-bind="coreAttrs">
    <slot />
  </CorePagination>
</template>

<script setup lang="ts">
import CorePagination from '../atoms/pagination/Pagination.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

const coreAttrs = useCoreAttrs();
</script>
