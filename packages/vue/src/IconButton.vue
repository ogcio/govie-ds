<template>
  <CoreIconButton
    v-bind="coreAttrs"
    :variant="variant"
    :appearance="appearance"
    :size="size"
    :disabled="disabled"
    :on-click="(event: MouseEvent) => emit('click', event)"
    :on-focus="(event: FocusEvent) => emit('focus', event)"
    :on-blur="(event: FocusEvent) => emit('blur', event)"
    :on-key-down="(event: KeyboardEvent) => emit('keydown', event)"
    :on-key-up="(event: KeyboardEvent) => emit('keyup', event)"
  >
    <slot />
  </CoreIconButton>
</template>

<script setup lang="ts">
import CoreIconButton from './atoms/IconButton.vue';
import type { Appearance, Variant } from './atoms/Button.styles';
import type { Size, ValueOf } from './atoms/constants';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  variant?: ValueOf<typeof Variant>;
  appearance?: ValueOf<typeof Appearance>;
  size?: ValueOf<typeof Size>;
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
