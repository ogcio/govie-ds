<template>
  <CoreHeader v-bind="coreAttrs">
    <slot />
  </CoreHeader>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CoreHeader from '../atoms/header/Header.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ HTMLAttributes;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
