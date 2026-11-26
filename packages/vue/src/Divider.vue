<template>
  <CoreDivider v-bind="coreAttrs" :orientation="orientation" />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CoreDivider from './atoms/Divider.vue';
import type { Orientation, ValueOf } from './atoms/constants';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ HTMLAttributes & {
  orientation?: ValueOf<typeof Orientation>;
};

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
