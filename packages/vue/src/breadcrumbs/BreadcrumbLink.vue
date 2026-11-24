<template>
  <CoreBreadcrumbItem>
    <CoreBreadcrumbLink
      v-bind="coreAttrs"
      :href="href"
      :current="current"
      :on-click="(event: MouseEvent) => emit('click', event)"
      :on-key-down="(event: KeyboardEvent) => emit('keydown', event)"
      :on-key-up="(event: KeyboardEvent) => emit('keyup', event)"
    >
      <slot />
    </CoreBreadcrumbLink>
  </CoreBreadcrumbItem>
</template>

<script setup lang="ts">
import CoreBreadcrumbItem from '../atoms/breadcrumbs/BreadcrumbItem.vue';
import CoreBreadcrumbLink from '../atoms/breadcrumbs/BreadcrumbLink.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  href: string;
  /** Marks the page the user is on: sets `aria-current="page"` and mutes the text colour. */
  current?: boolean;
};

defineProps<Props>();

const emit = defineEmits<{
  click: [event: MouseEvent];
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
}>();

const coreAttrs = useCoreAttrs();
</script>
