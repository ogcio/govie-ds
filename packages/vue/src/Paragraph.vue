<template>
  <CoreParagraph v-bind="coreAttrs" :size="size" :align="align" :whitespace="whitespace">
    <slot />
  </CoreParagraph>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CoreParagraph from './atoms/Paragraph.vue';
import type { Align, Size, Whitespace } from './constants';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ HTMLAttributes & {
  size?: Size;
  align?: Align;
  whitespace?: Whitespace;
};

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
