<template>
  <CorePaginationItem :aria-hidden="!label || undefined">
    <CorePaginationEllipsis v-bind="coreAttrs" :label="label" :size="size" :color="color" />
  </CorePaginationItem>
</template>

<script setup lang="ts">
import type { SVGAttributes } from 'vue';
import type { IconProps } from '../atoms/icons/types';
import CorePaginationEllipsis from '../atoms/pagination/PaginationEllipsis.vue';
import CorePaginationItem from '../atoms/pagination/PaginationItem.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

/** Without `label` the ellipsis is hidden from assistive technology. */
export type Props = /* @vue-ignore */ SVGAttributes & Pick<IconProps, 'label' | 'size' | 'color'>;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
