<template>
  <CoreInsetText v-bind="coreAttrs" :cite="cite">
    <slot />
  </CoreInsetText>
</template>

<script setup lang="ts">
import CoreInsetText from './atoms/InsetText.vue';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  /** URL of the quoted source, rendered as the `cite` attribute of the `<blockquote>`. */
  cite?: string;
};

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
