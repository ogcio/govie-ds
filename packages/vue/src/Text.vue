<template>
  <CoreText v-bind="coreAttrs" :size="size" :whitespace="whitespace">
    <slot />
  </CoreText>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CoreText from './atoms/Text.vue';
import type { Size, Whitespace } from './constants';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ HTMLAttributes & {
  size?: Size;
  whitespace?: Whitespace;
};

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
