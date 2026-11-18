<template>
  <CoreDivider v-bind="coreAttrs" :orientation="orientation" />
</template>

<script setup lang="ts">
import CoreDivider from './atoms/Divider.vue';
import type { Orientation, ValueOf } from './atoms/constants';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  orientation?: ValueOf<typeof Orientation>;
};

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
