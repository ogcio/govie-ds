<template>
  <CorePagination v-bind="coreAttrs">
    <slot />
  </CorePagination>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CorePagination from '../atoms/pagination/Pagination.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ HTMLAttributes;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
