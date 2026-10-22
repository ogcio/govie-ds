<template>
  <CoreHeaderNavItem :visible="visible">
    <CoreHeaderNavItemLink
      v-bind="coreAttrs"
      :href="href"
      :external="external"
      :on-click="(event: MouseEvent) => emit('click', event)"
      :on-key-down="(event: KeyboardEvent) => emit('keydown', event)"
      :on-key-up="(event: KeyboardEvent) => emit('keyup', event)"
    >
      <slot />
    </CoreHeaderNavItemLink>
  </CoreHeaderNavItem>
</template>

<script setup lang="ts">
import CoreHeaderNavItem from './atoms/header/HeaderNavItem.vue';
import CoreHeaderNavItemLink from './atoms/header/HeaderNavItemLink.vue';
import type { VisibleValue } from './atoms/header/HeaderNavItem.styles';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  href: string;
  /** Opens the link in a new tab with `rel="noreferrer noopener"`. */
  external?: boolean;
  /** Visibility: `true`/`false`, a breakpoint to show from (e.g. `"lg"`), or a per-breakpoint map like `{ base: false, lg: true }`. */
  visible?: VisibleValue;
};

withDefaults(defineProps<Props>(), { external: false, visible: true });

const emit = defineEmits<{
  click: [event: MouseEvent];
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
}>();

const coreAttrs = useCoreAttrs();
</script>
