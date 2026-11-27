<template>
  <CoreBreadcrumbs v-bind="coreAttrs">
    <slot />
  </CoreBreadcrumbs>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CoreBreadcrumbs from '../atoms/breadcrumbs/Breadcrumbs.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ HTMLAttributes;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
