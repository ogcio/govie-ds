<template>
  <CoreHeaderNavItemSeparator v-bind="coreAttrs" :visible="visible" />
</template>

<script setup lang="ts">
import CoreHeaderNavItemSeparator from './atoms/header/HeaderNavItemSeparator.vue';
import type { VisibleValue } from './atoms/header/HeaderNavItem.styles';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  /** Visibility: `true`/`false`, a breakpoint to show from (e.g. `"lg"`), or a per-breakpoint map like `{ base: false, lg: true }`. */
  visible?: VisibleValue;
};

withDefaults(defineProps<Props>(), { visible: true });

const coreAttrs = useCoreAttrs();
</script>
