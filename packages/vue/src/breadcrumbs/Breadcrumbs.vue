<template>
  <CoreBreadcrumbs v-bind="coreAttrs">
    <slot />
  </CoreBreadcrumbs>
</template>

<script setup lang="ts">
import CoreBreadcrumbs from '../atoms/breadcrumbs/Breadcrumbs.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

const coreAttrs = useCoreAttrs();
</script>
