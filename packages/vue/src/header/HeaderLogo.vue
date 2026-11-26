<template>
  <CoreHeaderLogo v-bind="coreAttrs">
    <slot />
  </CoreHeaderLogo>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CoreHeaderLogo from '../atoms/header/HeaderLogo.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ HTMLAttributes;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
