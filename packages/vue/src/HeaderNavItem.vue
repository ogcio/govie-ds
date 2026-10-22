<template>
  <CoreHeaderNavItem :visible="visible">
    <CoreHeaderNavItemButton
      v-bind="coreAttrs"
      :on-click="(event: MouseEvent) => emit('click', event)"
      :on-focus="(event: FocusEvent) => emit('focus', event)"
      :on-blur="(event: FocusEvent) => emit('blur', event)"
      :on-key-down="(event: KeyboardEvent) => emit('keydown', event)"
      :on-key-up="(event: KeyboardEvent) => emit('keyup', event)"
    >
      <slot />
    </CoreHeaderNavItemButton>
  </CoreHeaderNavItem>
</template>

<script setup lang="ts">
import CoreHeaderNavItem from './atoms/header/HeaderNavItem.vue';
import CoreHeaderNavItemButton from './atoms/header/HeaderNavItemButton.vue';
import type { VisibleValue } from './atoms/header/HeaderNavItem.styles';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  /** Visibility: `true`/`false`, a breakpoint to show from (e.g. `"lg"`), or a per-breakpoint map like `{ base: false, lg: true }`. */
  visible?: VisibleValue;
};

withDefaults(defineProps<Props>(), { visible: true });

const emit = defineEmits<{
  click: [event: MouseEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
}>();

const coreAttrs = useCoreAttrs();
</script>
