<template>
  <CoreSideNavItem v-bind="{ ariaHidden }">
    <CoreSideNavItemLink
      v-bind="{ ...coreAttrs, ariaHidden }"
      :href="href"
      :selected="selected"
      :external="external"
      :target="target"
      :rel="rel"
      :download="download"
      :on-click="(event: MouseEvent) => emit('click', event)"
      :on-key-down="(event: KeyboardEvent) => emit('keydown', event)"
      :on-key-up="(event: KeyboardEvent) => emit('keyup', event)"
    >
      <slot />
    </CoreSideNavItemLink>
    <CoreSideNavItemAction>
      <slot name="actions" />
    </CoreSideNavItemAction>
  </CoreSideNavItem>
</template>

<script setup lang="ts">
import CoreSideNavItem from '../atoms/sidenav/SideNavItem.vue';
import CoreSideNavItemAction from '../atoms/sidenav/SideNavItemAction.vue';
import CoreSideNavItemLink from '../atoms/sidenav/SideNavItemLink.vue';
import type { Props as LinkProps } from '../atoms/sidenav/SideNavItemLink.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  href: string;
  selected?: boolean;
  /** Opens the link in a new tab with `rel="noreferrer noopener"`. */
  external?: boolean;
  target?: LinkProps['target'];
  rel?: string;
  /** `true` or an empty string downloads the target, a string also names the file. */
  download?: string | boolean;
  ariaHidden?: LinkProps['ariaHidden'];
};

withDefaults(defineProps<Props>(), {
  external: false,
  target: undefined,
  rel: undefined,
  download: undefined,
  ariaHidden: undefined,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
}>();

const coreAttrs = useCoreAttrs();
</script>
