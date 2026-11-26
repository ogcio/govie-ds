<template>
  <CoreBreadcrumbItem :aria-hidden="!label || undefined">
    <CoreBreadcrumbEllipsis v-bind="coreAttrs" :label="label" :size="size" :color="color" />
  </CoreBreadcrumbItem>
</template>

<script setup lang="ts">
import type { SVGAttributes } from 'vue';
import CoreBreadcrumbEllipsis from '../atoms/breadcrumbs/BreadcrumbEllipsis.vue';
import CoreBreadcrumbItem from '../atoms/breadcrumbs/BreadcrumbItem.vue';
import type { IconProps } from '../atoms/icons/types';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ SVGAttributes & Pick<IconProps, 'label' | 'size' | 'color'>;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
