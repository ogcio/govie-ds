<template>
  <CoreFooter v-bind="coreAttrs">
    <slot />
  </CoreFooter>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CoreFooter from '../atoms/footer/Footer.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ HTMLAttributes;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
