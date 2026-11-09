<template>
  <CoreLink
    v-bind="coreAttrs"
    :href="href"
    :variant="variant"
    :underline="underline"
    :appearance="appearance"
    :visited="visited"
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
  </CoreLink>
</template>

<script setup lang="ts">
import CoreLink from './atoms/Link.vue';
import type { Appearance, Underline, Variant, Visited } from './atoms/Link.styles';
import type { ValueOf } from './atoms/constants';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  href: string;
  variant?: ValueOf<typeof Variant>;
  underline?: ValueOf<typeof Underline>;
  appearance?: ValueOf<typeof Appearance>;
  visited?: ValueOf<typeof Visited>;
  /** Opens the link in a new tab with `rel="noreferrer noopener"`. */
  external?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
  /** `true` or an empty string downloads the target, a string also names the file. */
  download?: string | boolean;
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
