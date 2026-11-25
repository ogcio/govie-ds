<template>
  <CorePaginationItem>
    <CorePaginationLink
      v-bind="coreAttrs"
      :href="href"
      :current="current"
      :on-click="(event: MouseEvent) => emit('click', event)"
      :on-focus="(event: FocusEvent) => emit('focus', event)"
      :on-blur="(event: FocusEvent) => emit('blur', event)"
      :on-key-down="(event: KeyboardEvent) => emit('keydown', event)"
      :on-key-up="(event: KeyboardEvent) => emit('keyup', event)"
    >
      <slot />
    </CorePaginationLink>
  </CorePaginationItem>
</template>

<script setup lang="ts">
import CorePaginationItem from '../atoms/pagination/PaginationItem.vue';
import CorePaginationLink from '../atoms/pagination/PaginationLink.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  href: string;
  /** Marks the link as the current page with `aria-current="page"`. */
  current?: boolean;
};

defineProps<Props>();

const emit = defineEmits<{
  click: [event: MouseEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
}>();

const coreAttrs = useCoreAttrs();
</script>
