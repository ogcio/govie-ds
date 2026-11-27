<template>
  <CorePaginationItem>
    <CorePaginationButton
      v-bind="coreAttrs"
      :current="current"
      :disabled="disabled"
      :on-click="(event: MouseEvent) => emit('click', event)"
      :on-focus="(event: FocusEvent) => emit('focus', event)"
      :on-blur="(event: FocusEvent) => emit('blur', event)"
      :on-key-down="(event: KeyboardEvent) => emit('keydown', event)"
      :on-key-up="(event: KeyboardEvent) => emit('keyup', event)"
    >
      <slot />
    </CorePaginationButton>
  </CorePaginationItem>
</template>

<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';
import CorePaginationButton from '../atoms/pagination/PaginationButton.vue';
import CorePaginationItem from '../atoms/pagination/PaginationItem.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = /* @vue-ignore */ ButtonHTMLAttributes & {
  /** Marks the button as the current page with `aria-current="true"`. */
  current?: boolean;
  disabled?: boolean;
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
