<template>
  <CoreHeaderTitle v-bind="coreAttrs">
    <slot />
  </CoreHeaderTitle>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CoreHeaderTitle from '../atoms/header/HeaderTitle.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ HTMLAttributes;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
