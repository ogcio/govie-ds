<template>
  <CoreButton
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
  </CoreButton>
</template>

<script setup lang="ts">
import CoreButton from './atoms/Button.vue';
import type { Appearance, ButtonSize, Variant } from './atoms/Button.styles';
import type { ValueOf } from './atoms/constants';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  variant?: ValueOf<typeof Variant>;
  appearance?: ValueOf<typeof Appearance>;
  size?: ValueOf<typeof ButtonSize>;
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
