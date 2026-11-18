<template>
  <CoreStack v-bind="coreAttrs" :direction="direction" :gap="gap" :align="align" :justify="justify" :wrap="wrap">
    <slot />
  </CoreStack>
</template>

<script setup lang="ts">
import CoreStack from './atoms/Stack.vue';
import type { AlignItems, Direction, Justify, ResponsiveValue, SpacingScale, ValueOf } from './atoms/constants';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  direction?: ResponsiveValue<ValueOf<typeof Direction>>;
  gap?: ResponsiveValue<SpacingScale>;
  align?: ValueOf<typeof AlignItems>;
  justify?: ValueOf<typeof Justify>;
  wrap?: boolean;
};

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
