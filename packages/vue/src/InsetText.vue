<template>
  <CoreInsetText v-bind="coreAttrs" :cite="cite">
    <slot />
  </CoreInsetText>
</template>

<script setup lang="ts">
import type { BlockquoteHTMLAttributes } from 'vue';
import CoreInsetText from './atoms/InsetText.vue';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ BlockquoteHTMLAttributes & {
  /** URL of the quoted source, rendered as the `cite` attribute of the `<blockquote>`. */
  cite?: string;
};

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
