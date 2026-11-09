<template>
  <CoreLinkButton
    v-bind="coreAttrs"
    :href="href"
    :variant="variant"
    :appearance="appearance"
    :size="size"
    :external="external"
    :target="target"
    :rel="rel"
    :download="download"
    :on-click="(event: MouseEvent) => emit('click', event)"
    :on-focus="(event: FocusEvent) => emit('focus', event)"
    :on-blur="(event: FocusEvent) => emit('blur', event)"
    :on-key-down="(event: KeyboardEvent) => emit('keydown', event)"
    :on-key-up="(event: KeyboardEvent) => emit('keyup', event)"
  >
    <slot />
  </CoreLinkButton>
</template>

<script setup lang="ts">
import CoreLinkButton from './atoms/LinkButton.vue';
import type { Appearance, ButtonSize, Variant } from './atoms/Button.styles';
import type { ValueOf } from './atoms/constants';
import type { Props as LinkProps } from './Link.vue';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = Pick<LinkProps, 'href' | 'external' | 'target' | 'rel' | 'download'> & {
  variant?: ValueOf<typeof Variant>;
  appearance?: ValueOf<typeof Appearance>;
  size?: ValueOf<typeof ButtonSize>;
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
