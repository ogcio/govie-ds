<template>
  <CoreSideNavItem v-bind="{ ariaHidden }">
    <CoreSideNavItemButton
      v-bind="{ ...coreAttrs, ariaHidden }"
      :selected="selected"
      :disabled="disabled"
      :on-click="(event: MouseEvent) => emit('click', event)"
      :on-focus="(event: FocusEvent) => emit('focus', event)"
      :on-blur="(event: FocusEvent) => emit('blur', event)"
      :on-key-down="(event: KeyboardEvent) => emit('keydown', event)"
      :on-key-up="(event: KeyboardEvent) => emit('keyup', event)"
    >
      <slot />
    </CoreSideNavItemButton>
    <CoreSideNavItemAction>
      <slot name="actions" />
    </CoreSideNavItemAction>
  </CoreSideNavItem>
</template>

<script setup lang="ts">
import CoreSideNavItem from '../atoms/sidenav/SideNavItem.vue';
import CoreSideNavItemAction from '../atoms/sidenav/SideNavItemAction.vue';
import CoreSideNavItemButton from '../atoms/sidenav/SideNavItemButton.vue';
import type { Props as ButtonProps } from '../atoms/sidenav/SideNavItemButton.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  selected?: boolean;
  disabled?: boolean;
  ariaHidden?: ButtonProps['ariaHidden'];
};

withDefaults(defineProps<Props>(), {
  selected: false,
  disabled: false,
  ariaHidden: undefined,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
}>();

const coreAttrs = useCoreAttrs();
</script>
